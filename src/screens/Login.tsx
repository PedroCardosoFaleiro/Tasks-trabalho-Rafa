import { StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholder="Insira seu usuário"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Insira sua senha"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => login(username, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    height: 50,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#606060",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
  },
  title: {
    color: "#252525",
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Login;