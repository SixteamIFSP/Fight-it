
import { Pressable, View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from "./styles";

export function RadioButton({ isChecked, onPress, size, label, horizontal }) {
    const iconName = isChecked ?
        "radio-button-checked" : "radio-button-unchecked";

    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    flexDirection: `${horizontal ? 'row' : 'column'}`,
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                }}
                onPress={() => onPress()}
            >
                <MaterialIcons
                    name={iconName}
                    size={size || 14}
                    color="#000" />
                <Text style={{ marginLeft: 20 }}>{label}</Text>
            </Pressable>
        </View>
    );
}

