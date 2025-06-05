import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export default function Clans({ navigation }) {
  const [personagem, setPersonagem] = useState(null);
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarPersonagem = async () => {
    if (!inputId.trim()) return;
    setLoading(true);
    setPersonagem(null);
    try {
      const response = await fetch(`https://www.naruto-br-api.site/characters/${inputId}`);
      const data = await response.json();
      setPersonagem(data);
    } catch (error) {
      console.warn('Erro ao buscar personagem:', error);
      setPersonagem(null);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏯 Clãs Ninja</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID ex: 10"
          placeholderTextColor="#555"
          keyboardType="numeric"
          value={inputId}
          onChangeText={setInputId}
        />
        <TouchableOpacity style={styles.button} onPress={buscarPersonagem}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#00BCD4" style={{ marginVertical: 20 }} />}

      {!loading && personagem && (
        <View style={styles.card}>
          <Image source={{ uri: personagem.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{personagem.name}</Text>
          <Text style={styles.detail}>Clã: {personagem.clan || 'Desconhecido'}</Text>
          <Text style={styles.detail}>Vila: {personagem.village || 'Desconhecida'}</Text>
          <Text style={styles.detail}>Rank: {personagem.ninjaRank || 'Desconhecido'}</Text>
          <Text style={styles.detail}>Título: {personagem.title || 'Sem título'}</Text>
        </View>
      )}

      {!loading && !personagem && (
        <Text style={styles.message}>Os clãs aparecerão aqui mais tarde!</Text>
      )}

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    color: '#00BCD4',
    fontWeight: '900',
    marginBottom: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    width: 140,
    marginRight: 15,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#00BCD4',
  },
  name: {
    fontSize: 22,
    color: '#00BCD4',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#EEE',
    marginBottom: 5,
  },
  message: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  backText: {
    color: '#121212',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
