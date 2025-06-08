import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';

export default function Home({ navigation, route }) {
  const { listaPersonagens } = route.params;

  return (
    <ImageBackground
      source={require('./assets/uchiha-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🏯 Bem-vindo ao Mundo Ninja</Text>


        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('CharacterDetails', { listaPersonagens: listaPersonagens })}
        >
          <Text style={styles.buttonText}> Ver Detalhes de ninja</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Jutsus', { listaPersonagens: listaPersonagens })}
        >
          <Text style={styles.buttonText}>Jutsus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Akatsuki', { listaPersonagens: listaPersonagens })}
        >
          <Text style={styles.buttonText}> Akatsuki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PersonagensFamosos')}
        >
          <Text style={styles.buttonText}>Personagens Famosos</Text>
        </TouchableOpacity>




      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF3D00',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
