import Toast from 'react-native-toast-message'

export function toastMessage(bool, msg){
    Toast.show({
        type: bool ? 'success' : "error",
        text2: msg,
    }); 
}