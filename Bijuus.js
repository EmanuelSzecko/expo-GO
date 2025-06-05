import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Video } from 'expo-av';

export default function Bijuus({ navigation }) {
  const [bijuu, setBijuu] = useState(null);
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarBijuu = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https:naruto-br-api.site/characters/${inputId}`);
      const data = await response.json();
      setBijuu(data);
    } catch (error) {
      alert('Erro ao buscar Bijuu. Verifique o ID e tente novamente.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.overlay}>
      <Video
        source={require('./assets/video/naruto1.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />

      <Text style={styles.title}>✨ Bestas com Cauda</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o ID da Bijuu"
          placeholderTextColor="#AAA"
          keyboardType="numeric"
          value={inputId}
          onChangeText={(id) => setInputId(id)}
        />
        <TouchableOpacity style={styles.button} onPress={buscarBijuu}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && <Text style={styles.message}>Carregando Bijuu...</Text>}

      {!loading && bijuu && (
        <ScrollView style={styles.card}>
          <Text style={styles.bijuuName}>{bijuu.name}</Text>
          <Text style={styles.detail}>Descrição: {bijuu.description}</Text>
          <Text style={styles.detail}>Número de Caudas: {bijuu.tails}</Text>
        </ScrollView>
      )}

      {!bijuu && !loading && (
        <Text style={styles.message}>Digite um ID para ver uma Bijuu lendária!</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#FFB300',
    fontWeight: 'bold',
    marginBottom: 20
  },
  message: {
    color: '#EEE',
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
    backgroundColor: '#F57C00',
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
  bijuuName: {
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
    backgroundColor: '#F57C00',
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
