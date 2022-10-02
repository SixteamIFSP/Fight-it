import Toast from 'react-native-toast-message'

export function toastMessage(bool, msg, visibilityTime){
    Toast.show({
        type: bool ? 'success' : "error",
        text2: msg,
        visibilityTime: visibilityTime || 3000,
    }); 
}