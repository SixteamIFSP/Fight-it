import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '70%',
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        width:'40%',
        padding: 10,
        marginBottom: 12,
        marginTop: 16,
    },
    textTouchebles: {
        margin: 12,
    },
    TitleLogin: {
        fontSize:42,
        marginTop: 12,
        marginBottom: 12,
    },
    switchButtons: {
        flexDirection: 'row',
        width: '75%',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    inputPassword: {
        marginTop: 10,
    },
});
