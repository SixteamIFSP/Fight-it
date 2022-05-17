import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screen/login';
import { CreateAccount } from '../screen/createAccount';
import { CreateAccountTeacher } from '../screen/createAccountTeacher';
import { CreateAccountStudent } from '../screen/createAccountStudent';
import { useUser } from '../hooks/user';
import { HomeScreenTeacher } from '../screen/homeScreenTeacher';
import { HomeScreenStudent } from '../screen/homeScreenStudent';
import { useTranslation } from 'react-i18next';

const AuthStack = createNativeStackNavigator();
const AppRoutes = createNativeStackNavigator();

function StackLoged(){
  const {t} = useTranslation();
  const {user} = useUser();

  return (
          <AuthStack.Navigator  initialRouteName={user.tipoUsuario = 1 ? 'HomeScreenTeacher' : 'HomeScreenStudent'} >
              <AuthStack.Screen options={{ title: t('header.teacher') }} navigationKey='HomeScreenTeacher' name="HomeScreenTeacher" component={HomeScreenTeacher} />
              <AuthStack.Screen options={{ title: t('header.student') }} navigationKey='HomeScreenStudent' name="HomeScreenStudent" component={HomeScreenStudent} />
              <AuthStack.Screen navigationKey='CreateAccount' name="CreateAccount" component={CreateAccount} />
              <AppRoutes.Screen navigationKey='CreateStudent' name="CreateStudent" component={CreateAccountStudent} />
              <AppRoutes.Screen navigationKey='CreateTeacher' name="CreateTeacher" component={CreateAccountTeacher} />
          </AuthStack.Navigator> 
      )

}
function StackAuth() {

  return (

          <AppRoutes.Navigator 
             screenOptions={{headerShown: false,}}
            initialRouteName="Login" >
              <AppRoutes.Screen 
              navigationKey='Login' 
              name="Login"
              component={Login} />
                
              <AppRoutes.Screen
              navigationKey='CreateAccount' 
              name="CreateAccount" 
              component={CreateAccount} />
              
          </AppRoutes.Navigator> 
      )

}



export function Router() {
  const { user } = useUser();
  console.log("ROTER USER", user);

  return (<>
    {user == null ? <StackAuth /> : <StackLoged />}


  </>

  )







}