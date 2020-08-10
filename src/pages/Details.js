import React, { useEffect } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";

import { version } from "../version";

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const data = route.params;

  useEffect(() => {}, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  const formatDate = (date) => {
    date = date.split(" ");
    let dt = `${date[0].split("-")[2]}/${date[0].split("-")[1]}/${
      date[0].split("-")[0]
    }`;
    let hr = date[1];

    return `${dt} às ${hr}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.pointName}>{data.event_name}</Text>
        <Text style={styles.pointItems}>
          Checkin:&nbsp;
          {data.checkin === 1 && <Text style={styles.checked}>Feito</Text>}
        </Text>
        <Text style={styles.pointItems}>
          Data do Checkin:&nbsp;
          {data.checkin === 1 && (
            <Text style={styles.checked}>{formatDate(data.checkin_date)}</Text>
          )}
        </Text>

        <View style={styles.data}>
          <Text style={styles.pointName}>Nome completo</Text>
          <Text style={styles.dataContent}>
            {data.first_name} {data.last_name}
          </Text>
        </View>

        <View style={styles.data}>
          <Text style={styles.pointName}>Dados pessoais</Text>
          <Text style={styles.dataContent}>CPF: {data.cpf}</Text>
          <Text style={styles.dataContent}>Email: {data.email}</Text>
          <Text style={styles.dataContent}>Telefone: {data.tel}</Text>
          <Text style={styles.dataContent}>Igreja: {data.church}</Text>
          <Text style={styles.dataContent}>Cidade: {data.city}</Text>
          <Text style={styles.dataContent}>País: {data.country}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>
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
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    marginTop: 24,
  },

  pointItems: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  data: {
    marginTop: 32,
  },

  dataTitle: {
    color: "#322153",
    fontSize: 16,
  },

  dataContent: {
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
  },

  checked: {
    fontWeight: "bold",
    color: "#34a367",
    fontSize: 20,
  },
});
