
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    switchButtons: {
        flexDirection: 'row',
        width: '75%',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    userTypeChoice: {
        marginBottom: 16,
        textAlign: 'center',
    },
    TitleLogin: {
        marginTop: 12,
        marginBottom: 12,
    },
    confirmationButton: {
        width: '100%',
        justifyContent: 'center',
    },
    inputesContainer: {
        display: 'flex', width: '100%'
    },
    inputes: {
        marginBottom: 24,
        alignItems: 'center'
    },
    errorMessage: {
        color: 'red'
    },
    inputMask: {
        width: '70%',
        marginBottom: 12,
        marginTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    passwordsDontMatch: {
        color: 'red',
        alignSelf: 'center'
    },
    phoneInputContainer: {
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }
});
