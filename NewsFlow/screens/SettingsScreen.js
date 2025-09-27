import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const [intervalo, setIntervalo] = useState("5000");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Intervalo de actualización (ms):</Text>
      <TextInput
        style={styles.input}
        value={intervalo}
        onChangeText={setIntervalo}
        keyboardType="numeric"
      />
      <Text>Usando: {intervalo} ms</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
