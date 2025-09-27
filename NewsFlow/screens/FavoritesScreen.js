import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const cargarFavoritos = async () => {
      const data = await AsyncStorage.getItem("favoritos");
      setFavoritos(data ? JSON.parse(data) : []);
    };
    cargarFavoritos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 5,
  },
  title: { fontSize: 16 },
});
