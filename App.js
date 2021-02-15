import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// expo install react-native-gesture-handler react-native-reanimated

import MealsNavigator from './navigation/MealsNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <MealsNavigator />;
}
