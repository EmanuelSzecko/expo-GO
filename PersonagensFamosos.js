// PersonagensFamosos.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const personagensFamosos = [
  {
    name: 'Naruto Uzumaki',
    title: 'Hokage',
    image: 'https://static.wikia.nocookie.net/naruto/images/5/5f/Naruto_Uzumaki_Part_II.png',
  },
  {
    name: 'Sasuke Uchiha',
    title: 'Nukenin',
    image: 'https://static.wikia.nocookie.net/naruto/images/3/3c/Sasuke_Part_II.png',
  },
  {
    name: 'Kakashi Hatake',
    title: 'Ex-Hokage',
    image: 'https://static.wikia.nocookie.net/naruto/images/7/76/Kakashi_Hatake.png',
  },
  {
    name: 'Itachi Uchiha',
    title: 'Akatsuki',
    image: 'https://static.wikia.nocookie.net/naruto/images/6/6f/Itachi_Uchiha.png',
  },
];

export default function PersonagensFamosos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Personagens Famosos</Text>
      <FlatList
        data={personagensFamosos}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FF3D00',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF3D00',
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: '#AAA',
    fontSize: 14,
  },
});
