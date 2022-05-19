import {  Text, View } from "react-native";
import { styles as stylesGlobal } from "../../global/styles";
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { ButtonLogout } from "../../components/buttonLogout";
// import { styles } from "./styles";

export function HomeScreenStudent({ navigation }) {
  const {t} = useTranslation();
  const {user} = useUser();

  console.log("USUARIO", user);

    return (
        <View style={stylesGlobal.container}>
          <ButtonLogout />
            <Text>{t('homePage.student.message')} {user?.nome}</Text>
        </View>
    );
  }

