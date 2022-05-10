import {  Text, View } from "react-native";
import { styles as stylesGlobal } from "../../global/styles";
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { ButtonLogout } from "../../components/buttonLogout";
// import { styles } from "./styles";

export function HomeScreenStudent({ navigation }) {

  return (
    <View style={stylesGlobal.container}>
      <ButtonLinguage />
      <ButtonLogout />
      <Text>Bom dia professor</Text>
    </View>
  );
};