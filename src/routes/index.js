import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screen/login';
import { CreateAccount } from '../screen/createAccount';
import { CreateAccountTeacher } from '../screen/createAccountTeacher';
import { CreateAccountStudent } from '../screen/createAccountStudent';
import { useUser } from '../hooks/user';
import { HomeScreenTeacher } from '../screen/homeScreenTeacher';

const AuthStack = createNativeStackNavigator();
const AppRoutes = createNativeStackNavigator();

function StackLoged() {
  return (
    <AuthStack.Navigator initialRouteName="HomeScreenTeacher" >
      <AuthStack.Screen navigationKey='HomeScreenTeacher' name="HomeScreenTeacher" component={HomeScreenTeacher} />
      <AuthStack.Screen navigationKey='CreateAccount' name="CreateAccount" component={CreateAccount} />
      <AppRoutes.Screen navigationKey='CreateStudent' name="CreateStudent" component={CreateAccountStudent} />
      <AppRoutes.Screen navigationKey='CreateTeacher' name="CreateTeacher" component={CreateAccountTeacher} />
    </AuthStack.Navigator>
  )
}
function StackAuth() {

  return (
    <AppRoutes.Navigator initialRouteName="Login" >
      <AppRoutes.Screen navigationKey='Login' name="Login" component={Login} />
      <AppRoutes.Screen navigationKey='CreateAccount' name="CreateAccount" component={CreateAccount} />

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