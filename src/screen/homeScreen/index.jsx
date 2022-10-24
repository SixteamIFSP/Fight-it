import { Text, View } from "react-native";
import { styles as stylesGlobal } from "../../global/styles";
import { ButtonLogout } from "../../components/buttonLogout";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user";
import React, { useEffect, useState } from "react";
import { ContainerExitButton, ContainerText } from "./styles";
import { generatePushNotificationsToken } from "../../services/generetePushNotificationToken";

export function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, modifyUser } = useUser();

  async function getNotification (){
   
    //registerForPushNotificationsAsync()
    const date = await generatePushNotificationsToken();
    
    console.log({ date });
    return date
  }

  useEffect(async () => {
    //console.log(user);
    if(user.token) return
    const newToken =  await getNotification();
    modifyUser({...user, token:newToken})
    
  }, []);
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

