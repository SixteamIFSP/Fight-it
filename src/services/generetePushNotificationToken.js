import { isDevice } from 'expo-device';
import { openSettings } from 'expo-linking';
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
} from 'expo-notifications';
import { Alert } from 'react-native';

export const generatePushNotificationsToken = async () => {
  if (!isDevice) {
    throw new Error(
      'Sorry, Push Notifications are only supported on physical devices.'
    );
  }

  const { status: existingStatus } = await getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert(
      'Error',
      'Sorry, we need your permission to enable Push Notifications. Please enable it in your privacy settings.',
      [
        {
          text: 'OK',
        },
        {
          text: 'Open Settings',
          onPress: async () => openSettings(),
        },
      ]
    );
    return undefined;
  }

  const { data } = await getExpoPushTokenAsync();

  return data;
};

export const registerForPushNotificationsAsync = async () => {
  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};