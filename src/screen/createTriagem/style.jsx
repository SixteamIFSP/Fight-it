

import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container:  {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
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
        fontSize: 23, 
        fontWeight: 'bold', 
        marginTop: 12,
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 15, 
        marginTop: 12,
        marginBottom: 20,
    },
    confirmationButton: {
        width: '100%',
        justifyContent: 'center',
    }, 
    inputes: {
        marginBottom:24,
    },
});
