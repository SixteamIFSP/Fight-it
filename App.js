import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Router } from './src/routes';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { UserProvider } from './src/hooks/user';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModalProvider } from './src/hooks/modalConfirmation';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

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
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
 
  return (
    <UserProvider>
        <ModalProvider>
        <NavigationContainer >
          <SafeAreaView style={styles.container}>
            <Router />
            <Toast
              config={toastConfig}
            />
          </SafeAreaView>
        </NavigationContainer>
      </ModalProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#ffffff'
  },
});
