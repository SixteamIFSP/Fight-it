

import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 50,
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
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 12,
        alignSelf: 'center',
    },
    descriptionText: {
        fontSize: 15,
        marginBottom: 20,
    },
    confirmationButton: {
        width: '100%',
        justifyContent: 'center',
    },
    inputes: {
        width: '100%',
    },
    personalDataContainer: {
        width: '100%',
    },
    personalDataTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    target: {
        marginBottom: 6,
        width: '100%'
    },
    birthDate: {
        width: '100%',
        flexDirection: 'row'
    },
    birthDateTitle: {
        marginRight: 20
    }

});
