import { StyleSheet } from "react-native";
import { TextAlingLine } from "../../screen/configureAccount/styles";

export const styles = StyleSheet.create({
    modal: {
        position:'absolute',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 30,
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
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 10,
    },
    textLine: {
        marginBottom: 12,
        fontWeight: '700',
        alignSelf: 'flex-start'
    },
    textClose: {
        color: 'red',
        marginTop:20
    }
});