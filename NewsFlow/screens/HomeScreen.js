import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [intervalo, setIntervalo] = useState(5000); // 5 seg default

  useEffect(() => {
    const cargarNoticias = () => {
      const fakeNews = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now().toString() + i,
        title: `Noticia #${i + 1}`,
        body: `Contenido completo de la noticia número ${i + 1}`,
      }));
      setNews(fakeNews);
    };

    cargarNoticias();
    const timer = setInterval(cargarNoticias, intervalo);
    return () => clearInterval(timer);
  }, [intervalo]);

  // Guardar favorito
  const guardarFavorito = async (item) => {
    try {
      const favoritos = await AsyncStorage.getItem("favoritos");
      const lista = favoritos ? JSON.parse(favoritos) : [];
      lista.push(item);
      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
      alert("Agregado a Favoritos ⭐");
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Detail", { noticia: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity style={styles.star} onPress={() => guardarFavorito(item)}>
        <Text>⭐</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  star: { padding: 5 },
});
