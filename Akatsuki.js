import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Video } from 'expo-av';

export default function Akatsuki({ navigation }) {
  const [membro, setMembro] = useState(null);
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarMembro = async () => {
    setLoading(true);
    try {
    
      const response = await fetch(`https:naruto-br-api.site/characters/${inputId}`);
      const data = await response.json();
      setMembro(data);
    } catch (error) {
      alert('Erro ao buscar membro. Verifique o ID e tente novamente.');
    }
    setLoading(false);
  };

  return (
    
      <View style={styles.overlay}>
        <Video
          source={require('./assets/video/naruto2.mp4')}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          isMuted
          shouldPlay
          isLooping
        />

        <Text style={styles.title}>🌑 Akatsuki</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o ID do membro"
            placeholderTextColor="#AAA"
            keyboardType="numeric"
            value={inputId}
            onChangeText={(id) => setInputId(id)}
          />
          <TouchableOpacity style={styles.button} onPress={buscarMembro}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading && <Text style={styles.message}>Carregando membro...</Text>}

        {!loading && membro && (
          <ScrollView style={styles.card}>
            <Text style={styles.name}>{membro.name}</Text>
            <Text style={styles.detail}>Aldeia: {membro.village}</Text>
            <Text style={styles.detail}>Rank: {membro.rank}</Text>
            <Text style={styles.detail}>Descrição: {membro.description}</Text>
          </ScrollView>
        )}

        {!membro && !loading && (
          <Text style={styles.message}>Digite um ID para ver um membro da Akatsuki!</Text>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
    width: '100%'
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
