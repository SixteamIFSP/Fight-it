import { useState,  } from "react";
import i18n from '../../locales/i18n';
import { Button, Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { Input } from "../../components/input";
import { styles as stylesGlobal } from "../../global/styles";
import  { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { useUser } from "../../hooks/user";
import { ButtonLogout } from "../../components/buttonLogout";
// import { styles } from "./styles";

export function HomeScreenTeacher({ navigation }) {
    const {t} = useTranslation()
    const { user } = useUser()
  
    return (
     
        <View style={stylesGlobal.container}>
          <ButtonLinguage />
          <ButtonLogout />
          <Text>{t('homePage.teacher.message')} {user.nome}</Text>
        </View>
    
    );
  }