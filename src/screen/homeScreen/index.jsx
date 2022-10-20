import { Text, View } from "react-native";
import { styles as stylesGlobal } from "../../global/styles";
import { ButtonLogout } from "../../components/buttonLogout";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user";
import React, { useState } from "react";
import { ContainerExitButton, ContainerText } from "./styles";

export function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user } = useUser();

  console.log(user);

  return (
    <View style={stylesGlobal.container}>
      <ContainerExitButton>
        <ButtonLogout />
      </ContainerExitButton>
      <ContainerText>
        <Text>{
          user.tipoUsuario === 1 ? t('homePage.teacher.message') : t('homePage.student.message')
          } {user?.nome}</Text>
       
      </ContainerText>
     
      </View>
  );
}

