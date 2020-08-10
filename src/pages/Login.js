import React, { useState, useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Linking,
  ActivityIndicator,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { version } from "../version";

const Home = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleNavigateToQRScanner() {
    navigation.navigate("QRScanner");
  }

  useEffect(async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      return handleNavigateToQRScanner();
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://conscienciacrista.ga/api/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        await SecureStore.setItemAsync("token", response.data.token);

        handleNavigateToQRScanner();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <Text style={styles.title}>Consciência Cristã 2021</Text>
            <Text style={styles.description}>
              QR Code Reader. Feito por{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL("https://github.com/gustavolbs")}
              >
                Gustavo Bispo
              </Text>
              &nbsp;{version}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            defaultValue={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            defaultValue={password}
          />
          <RectButton
            style={[styles.button, loading ? styles.disabled : ""]}
            onPress={handleSubmit}
            enabled={!loading}
          >
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            ) : (
              <>
                <View style={styles.buttonIcon}>
                  <Text>
                    <Icon name="arrow-right" color="#FFF" size={24} />
                  </Text>
                </View>
                <Text style={styles.buttonText}>Entrar</Text>
              </>
            )}
          </RectButton>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  disabled: {
    backgroundColor: "#34a367",
  },
});

export default Home;
