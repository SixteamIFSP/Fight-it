import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from "../../hooks/user";
import { useTranslation } from "react-i18next";

export function ButtonLogout() {
    const { logOut } = useUser();
    const { t } = useTranslation()
    return (
        <TouchableOpacity onPress={logOut}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={{fontSize:12}}>{t('homePage.login.logout')}</Text>
        </TouchableOpacity>
    )


}