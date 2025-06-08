import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Video } from 'expo-av';

export default function CharacterDetails({ navigation,route }) {
  const [personagem, setPersonagem] = useState(null);
  const [inputName, setInputName] = useState('');
  const [loading, setLoading] = useState(false);
  const{listaPersonagens}=route.params;

  const buscar = ()=>{
    setLoading(true);
  setPersonagem(null);

  const nomeBuscado = inputName.toLowerCase();

  // Laço de repetição para buscar o personagem
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
      {/* VÍDEO DE FUNDO */}
      <Video
        source={require('./assets/video/naruto3.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isMuted
        shouldPlay
        isLooping
      />

      {/* CAMADA ESCURA PARA CONTRASTE */}
      <View style={styles.overlay}>
        <Text style={styles.title}>🔍 Buscar Ninja</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome:"
            placeholderTextColor="#AAA"
            onChangeText={(name) => setInputName(name)}
          />
          <TouchableOpacity style={styles.button} onPress={buscar}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {!loading && personagem && (
          <View style={styles.card}>
          <Image source={{ uri: personagem.profile_image }} style={styles.avatar} />
          <Text style={styles.name}>{personagem.name}</Text>
          <Text style={styles.detail}><Text style = {{fontWeight: "900",textDecorationLine:'none', color:"#e32636" }}>Vila:</Text> {personagem.village.name}</Text>
          <Text style={styles.detail}><Text style = {{fontWeight: "900",textDecorationLine:'none', color:"#e32636" }}>Rank: </Text>{personagem.rank}</Text>
          <Text style={styles.detail}><Text style = {{fontWeight: "900",textDecorationLine:'none', color:"#e32636" }}>Poder: </Text>{personagem.power}</Text>
          <Text style={styles.detail}><Text style = {{fontWeight: "900",textDecorationLine:'none', color:"#e32636" }}>Descrição: </Text>{personagem.summary || 'Sem título'}</Text>
        </View>
        )}

        {loading && <Text style={styles.loading}>Carregando personagem...</Text>}

        <TouchableOpacity style={styles.floatingBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.floatingBackText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )};


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
    color: '#FF3D00',
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
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  card: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#B71C1C',
  },
  name: {
    fontSize: 20,
    color: '#ff0000',
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'Roboto',
  },
  detail: {
    fontSize: 14,
    color: '#CCC',
    marginBottom: 4,
    textAlign: 'left',
  
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
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 5,
  },
  floatingBackText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});



