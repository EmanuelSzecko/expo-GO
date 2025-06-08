import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buscarTodosPersonagens = async () => {
      try {
        const response = await fetch('https://naruto-br-api.site/characters');
        const data = await response.json();

        // Aguarda o tempo do vídeo e envia os dados
        setTimeout(() => {
          setIsLoading(false);
          navigation.replace('Home', { listaPersonagens: data }); // envia todos os dados para a Home
        }, 17000);
      } catch (error) {
        alert('Não foi possível carregar os personagens.');
        setIsLoading(false);
      }
    };

    buscarTodosPersonagens();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Video
          source={require('./assets/video/naruto5.mp4')}
          style={{
            width: 404,
            height: 750,
           }}
          resizeMode="cover"
          isLooping={false}
          shouldPlay
          isMuted
        
        />
      </View>
    );
  }

  
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default SplashScreen;
