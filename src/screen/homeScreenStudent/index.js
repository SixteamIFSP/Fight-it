import { useState,  } from "react";
import i18n from '../../locales/i18n';
import { Button, Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { Input } from "../../components/input";
import { styles as stylesGlobal } from "../../global/styles";
import  { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { ButtonLogout } from "../../components/buttonLogout";
import { useUser } from "../../hooks/user";
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