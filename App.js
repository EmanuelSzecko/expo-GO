import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import CharacterDetails from './CharacterDetails';
import Jutsus from './Jutsus';
import Clans from './Clans';
import Akatsuki from './Akatsuki';
import Bijuus from './Bijuus';
import SplashScreen from './SplashScreen'; // Importe a SplashScreen

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} // Sem cabeçalho para a Splash Screen
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Jutsus"
          component={Jutsus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Clans"
          component={Clans}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Akatsuki"
          component={Akatsuki}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bijuus"
          component={Bijuus}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
