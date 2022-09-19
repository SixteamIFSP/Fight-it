
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
    errorMessage: { color: 'red', backgroundColor:'red' }
});
