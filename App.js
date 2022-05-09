import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Router } from './src/routes';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import i18n from './src/locales/i18n';
import { UserProvider } from './src/hooks/user';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: `#7FFF00` }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
      }}
      text2NumberOfLines={2}
      text2Style={{
        fontSize: 13
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#ff0000' }}
      text1Style={{
        fontSize: 18
      }}
      text2NumberOfLines={2}
      text2Style={{
        fontSize: 13
      }}
    />
  ),
};

export default function App() {
  return (
      <UserProvider>
        <NavigationContainer >
          <Router />
          <Toast
            config={toastConfig}
          />
        </NavigationContainer>
      </UserProvider>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
    backgroundColor: '#ffffff'
  },
});
