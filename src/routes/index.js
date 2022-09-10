import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login } from '../screen/login';
import { CreateAccount } from '../screen/createAccount';
import { CreateAccountTeacher } from '../screen/createAccountTeacher';
import { CreateAccountStudent } from '../screen/addCertificado';
import { useUser } from '../hooks/user';
import { HomeScreenTeacher } from '../screen/homeScreenTeacher';
import { HomeScreenStudent } from '../screen/homeScreenStudent';
import { useTranslation } from 'react-i18next';
import { FontAwesome } from '@expo/vector-icons';
import { ConfigureAccount } from '../screen/configureAccount';
import { ClassStack } from './classStack';
import { CreateTriagem } from '../screen/createTriagem';
import { ClassView } from '../screen/classView';

const TabNavegation = createBottomTabNavigator();
const AppRoutes = createNativeStackNavigator();
const StackStudant = createNativeStackNavigator();

function StackLoged() {
  const { t } = useTranslation();
  const { user } = useUser();

  const Teacher = () => {
    return (
    <TabNavegation.Navigator initialRouteName="HomeScreenTeacher"  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color }) => {
        let iconName;

        if (route.name === 'HomeScreenTeacher') {
          iconName = 'home';
        } else if (route.name === 'Class') {
          iconName = 'group';
        } 
         else if (route.name === 'Config') {
          iconName = 'cogs';
        }
         else if (route.name === 'Calendar') {
          iconName = 'calendar';
        }
        // else if (route.name === 'Dashboard') {
        //   iconName = 'bar-chart-o';
        // }

        // You can return any component that you like here!
        return <FontAwesome name={iconName} size={28} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel:false,
    })}>

      <TabNavegation.Screen options={{ title: "Home", headerShown: false }} navigationKey='HomeScreenTeacher' name="HomeScreenTeacher" component={HomeScreenTeacher} />
      <TabNavegation.Screen navigationKey='Calendar' name="Calendar" component={HomeScreenTeacher} />
      <TabNavegation.Screen options={{ headerShown: false }} navigationKey='Class' name="Class" component={ClassStack} />
      {/* <TabNavegation.Screen navigationKey='Dashboard' name="Dashboard" component={HomeScreenTeacher} /> */}
      <TabNavegation.Screen options={{ title: t(`nav.config`) }}  navigationKey='Config' name="Config" component={ConfigureAccount} />

    </TabNavegation.Navigator>
    )
  }

  const Studant = () => {
    return (
        <TabNavegation.Navigator initialRouteName="HomeScreenStudent"  screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
    
            if (route.name === 'HomeScreenStudent') {
              iconName = 'home';
            // } else if (route.name === 'Calendar') {
            //   iconName = 'calendar';
            } else if (route.name === 'Class') {
              iconName = 'group';
            // } else if (route.name === 'Dashboard') {
            //   iconName = 'bar-chart-o';
            } else if (route.name === 'Config') {
              iconName = 'cogs';
            }
  
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
          <TabNavegation.Screen options={{ title: "Home" }} navigationKey='HomeScreenStudent' name="HomeScreenStudent" component={HomeScreenStudent} />
          {/* <TabNavegation.Screen navigationKey='Calendar' name="Calendar" component={HomeScreenStudent} />   */}
          <TabNavegation.Screen navigationKey='Class' name="Class" component={ClassView} initialParams={{student: true}}  />  
          {/* <TabNavegation.Screen navigationKey='Dashboard' name="Dashboard" component={HomeScreenStudent} />   */}
          <TabNavegation.Screen navigationKey='Config' name="Config" component={ConfigureAccount} />  
        </TabNavegation.Navigator>
        )
  }

  const User = {
    1: <Teacher />,
    2: <Studant />,
  }

  return (
    User[user?.tipoUsuario]
  )
}

function StackAuth() {
  return (
    <AppRoutes.Navigator
      screenOptions={{ headerShown: false, }}
      initialRouteName="Login" >
      <AppRoutes.Screen
        navigationKey='Login'
        name="Login"
        component={Login} />

      <AppRoutes.Screen
        navigationKey='CreateAccount'
        name="CreateAccount"
        component={CreateAccount} />
        <AppRoutes.Screen
        navigationKey='CreateTriagem'
        name="CreateTriagem"
        component={CreateTriagem} />

    </AppRoutes.Navigator>
  )
}

export function Router() {
  const { user } = useUser();
 
  return (
  <>
    {user == null ? <StackAuth /> : <StackLoged />}
  </>
  )
}