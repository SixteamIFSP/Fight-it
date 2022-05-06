
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";


export function CheckBox({isChecked, onPress}){
    const iconName = isChecked ?
    "checkbox-marked" : "checkbox-blank-outline";

    return (
        <View style={styles.container}>
            <Pressable onPress={()=>onPress()}>
                <MaterialCommunityIcons 
                    name={iconName} size={24} color="#000" />
            </Pressable>
            {/* <Text style={styles.title}>{props.title}</Text> */}
        </View>
    );
}

