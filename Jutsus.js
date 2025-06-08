import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Video } from 'expo-av';

export default function Jutsus({ navigation, route }) {
  const [jutsu, setJutsu] = useState(null);
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const { listaPersonagens } = route.params;

  const buscar = () => {
    setLoading(true);
    setJutsu(null);

    const nomeBuscado = inputName.toLowerCase();

    const personagem = listaPersonagens.find(p =>
      p.name.toLowerCase().includes(nomeBuscado)
    );

    if (personagem && personagem.jutsus && personagem.jutsus.length > 0) {
      setJutsu({
        name: personagem.name,
        jutsus: personagem.jutsus,
      });
    } else {
      alert('Jutsus não encontrados para este personagem.');
    }

    setLoading(false);
  };

  // Usando for para montar a lista
  let listaFormatada = [];
  if (jutsu && jutsu.jutsus && jutsu.jutsus.length > 0) {
    for (let i = 0; i < jutsu.jutsus.length; i++) {
      listaFormatada.push(jutsu.jutsus[i]);
    }
  }

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/video/naruto4.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>🌀 Buscar Jutsu</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do personagem"
            placeholderTextColor="#AAA"
            onChangeText={(text) => setInputName(text)}
            value={inputName}
          />
          <TouchableOpacity style={styles.button} onPress={buscar}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {!loading && jutsu && (
          <View style={styles.card}>
            <Text style={styles.name}>{jutsu.name}</Text>
            <FlatList
              data={listaFormatada}

              renderItem={({ item }) => (
                <View style={{ marginBottom: 15 }}>
                  <Text style={styles.detail}>
                    <Text style={styles.label}>Nome: </Text>{item.name}
                  </Text>
                  <Text style={styles.detail}>
                    <Text style={styles.label}>Tipo: </Text>{item.type || 'Desconhecido'}
                  </Text>
                  <Text style={styles.detail}>
                    <Text style={styles.label}>Descrição: </Text>{item.description || 'Sem descrição'}
                  </Text>
                </View>
              )}
            />
          </View>
        )}

        {loading && <Text style={styles.loading}>Carregando jutsu...</Text>}

        {!jutsu && !loading && (
          <Text style={styles.message}>Digite o nome de um personagem ninja!</Text>
        )}

        <TouchableOpacity style={styles.floatingBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.floatingBackText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#00E5FF',
    fontWeight: '600',
    fontFamily: 'Roboto',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 10,
    width: 140,
    marginRight: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#00ACC1',
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    maxWidth: 340,
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    color: '#00E5FF',
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    color: '#CCC',
    marginBottom: 4,
    textAlign: 'center',
  },
  label: {
    fontWeight: '900',
    color: '#00BCD4',
  },
  message: {
    color: '#EEE',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loading: {
    color: '#CCC',
    marginTop: 20,
    fontStyle: 'italic',
    fontSize: 14,
  },
  floatingBackButton: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#00ACC1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
  },
  floatingBackText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
