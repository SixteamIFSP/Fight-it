import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white'
    },
    outerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    modalView: {
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        width: 250,
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        flexWrap: "wrap",
        alignContent: "space-between"
    },
    modalText: {
        marginTop: 10,
        marginBottom: 10,
    },
    textLine: {
        marginBottom: 50,
        fontWeight: '700',
        alignSelf: 'flex-start'
    },
    textClose: {
        color: 'red',
        marginTop:20
    }
});