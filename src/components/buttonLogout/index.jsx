import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from "../../hooks/user";

export function ButtonLogout() {
    const { logOut } = useUser();

    return (
        <TouchableOpacity onPress={logOut}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
    )


}