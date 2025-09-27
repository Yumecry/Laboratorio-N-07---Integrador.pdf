import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { noticia } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{noticia.title}</Text>
      <Text style={styles.body}>{noticia.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  body: { fontSize: 16, lineHeight: 22 },
});
