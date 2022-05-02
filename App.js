import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Router } from './src/routes';
import i18n from './src/locales/i18n';

export default function App() {
  return (

        <NavigationContainer >
          <Router />
        </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: '#ffffff'
  },
});
