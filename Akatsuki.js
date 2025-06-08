import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Video } from 'expo-av';

export default function Akatsuki({ navigation, route }) {
  const [personagem, setPersonagem] = useState(null);
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const { listaPersonagens } = route.params;

  const buscar = () => {
    setLoading(true);
    setPersonagem(null);

    const nomeBuscado = inputName.toLowerCase();

    for (let i = 0; i < listaPersonagens.length; i++) {
      const p = listaPersonagens[i];

      if (p.name.toLowerCase().includes(nomeBuscado)) {
        const personagemFiltrado = {
          name: p.name,
          rank: p.rank,
          power: p.power,
          profile_image: p.profile_image,
          summary: p.summary,
          village: {
            name: p.village?.name || 'Desconhecida'
          }
        };

        setPersonagem(personagemFiltrado);
        setLoading(false);
        return;
      }
    }

    alert('Ninja não encontrado!');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('./assets/video/naruto2.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>🌑 Akatsuki</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do membro"
            placeholderTextColor="#AAA"
            value={inputName}
            onChangeText={setInputName}
          />
          <TouchableOpacity style={styles.button} onPress={buscar}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading && <Text style={styles.message}>Carregando personagem...</Text>}

        {!loading && personagem && (
          <ScrollView style={styles.card}>
            <Image source={{ uri: personagem.profile_image }} style={styles.avatar} />
            <Text style={styles.name}>{personagem.name}</Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Vila: </Text>{personagem.village.name}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Rank: </Text>{personagem.rank}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Poder: </Text>{personagem.power}
            </Text>
            <Text style={styles.detail}>
              <Text style={styles.label}>Descrição: </Text>{personagem.summary || 'Sem descrição'}
            </Text>
          </ScrollView>
        )}

        {!personagem && !loading && (
          <Text style={styles.message}>Digite o nome de um personagem!</Text>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#E53935',
    fontWeight: 'bold',
    marginBottom: 20
  },
  message: {
    color: '#DDD',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
    width: 140,
    marginRight: 10,
    color: '#FFF'
  },
  button: {
    backgroundColor: '#B71C1C',
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    width: '100%',
    maxWidth: 340
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#B71C1C'
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  detail: {
    fontSize: 16,
    color: '#DDD',
    marginBottom: 8
  },
  label: {
    fontWeight: 'bold',
    color: '#E53935'
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#B71C1C',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
