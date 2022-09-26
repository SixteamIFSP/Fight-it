import { Text } from "react-native";
import { styles } from "./styles";

export function ErrorMessage({ text }) {
    return (
        <Text style={styles.errorMessage}>
            {text}
        </Text>
    );
};