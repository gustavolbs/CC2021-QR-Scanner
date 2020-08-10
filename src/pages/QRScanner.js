import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import { RectButton } from "react-native-gesture-handler";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function handleNavigateToDetails(details) {
    navigation.navigate("Details", details);
  }

  function handleNavigateToLogin() {
    navigation.navigate("Login");
  }

  const handleBarCodeScanned = async (qrCode) => {
    setScanned(true);

    const token = await SecureStore.getItemAsync("token");
    try {
      const response = await axios.put(
        `https://conscienciacrista.ga/api/checkin/${qrCode.data}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        return alert(response.data.message);
      }

      setData(response.data.ticket);
      setScanned(false);
      handleNavigateToDetails(response.data.ticket);
    } catch (err) {
      alert(err.data.message);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    return handleNavigateToLogin();
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão de câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a câmera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <RectButton
        style={{
          backgroundColor: "crimson",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          fontWeight: 900,
          top: 0,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          LOGOUT
        </Text>
      </RectButton>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <RectButton
          style={{
            backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            fontWeight: 900,
            color: "white",
          }}
          onPress={() => setScanned(false)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Toque para escanear novamente
          </Text>
        </RectButton>
      )}
    </View>
  );
}
