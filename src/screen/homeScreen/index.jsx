import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles as stylesGlobal } from "../../global/styles";
import { ButtonLogout } from "../../components/buttonLogout";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user";
import { ContainerExitButton, ContainerContent, TextApresentation, GridDashboard } from "./styles";
import { registerForPushNotificationsAsync } from "../../services/generetePushNotificationToken";
import { CardDashboard } from "../../components/cardDashboard";
import { useIsFocused } from "@react-navigation/native";
import { getDashboard } from "../../controler/dashboard";
 
export function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { user, modifyUser, updateExpoToken } = useUser();
  const [dashboardData, setDashboardData] = useState(null);
  const isFocused = useIsFocused();

  async function getNotification (){
    const token = await registerForPushNotificationsAsync();
    return token
  }

  useEffect(()=>{
    if (!isFocused) return

    getDashboard(user.userID, user.tipoUsuario === 1, setDashboardData);

  },[isFocused]);

  useEffect(async () => {
    const newToken =  await getNotification();

    if (user.expoToken === newToken) return

    const dataUpdate = {
      id:user.userID,
      expotoken:newToken
    }
    
    updateExpoToken(dataUpdate,  user.tipoUsuario === 1);

    modifyUser({...user, expoToken:newToken});
    
  }, []);

  return (
    <View style={stylesGlobal.container}>
      <ContainerExitButton>
        <TextApresentation>{
            user.tipoUsuario === 1 ? t('homePage.teacher.message') : t('homePage.student.message')
            } {user?.nome}
          </TextApresentation>
        <ButtonLogout />
      </ContainerExitButton>
      <ContainerContent>
        {
          user.tipoUsuario === 1 ? 
          <GridDashboard>
            <CardDashboard text={t("homePage.dashboard.student")} value={dashboardData?.Alunos} />
          </GridDashboard>
          : <></>
        }
        <GridDashboard>
          <CardDashboard text={t("homePage.dashboard.lessons")} value={dashboardData?.Aula} />
          <CardDashboard text={t("homePage.dashboard.classes")} value={dashboardData?.Turmas} />
        </GridDashboard>
      </ContainerContent>
    </View>
  );
}

