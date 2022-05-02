import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screen/Login';
import { CreateAccount } from '../screen/CreateAccount';

const AuthStack = createNativeStackNavigator();

function StackAuth(){
  return (
          <AuthStack.Navigator  initialRouteName="Login" >
              <AuthStack.Screen navigationKey='Login' name="Login" component={Login} />
              <AuthStack.Screen navigationKey='CreateAccount' name="CreateAccount" component={CreateAccount} />
          </AuthStack.Navigator> 
      )
}



export function Router() {

    return (
      <StackAuth/>
      )
    
}