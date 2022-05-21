import { useState,  } from "react";
import i18n from '../../locales/i18n';
import { Button, Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { Input } from "../../components/input";
import { styles } from "./styles";
import { styles as stylesGlobal } from "../../global/styles";
import  { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { useUser } from "../../hooks/user";
import { SwitchButton } from "../../components/switchbutton";

export function Login({ navigation }) {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [typeTeacher ,setTypeTeacher] = useState();
    const {t} = useTranslation();
    const {singIn} = useUser();

    function onHandleLogin(){
      singIn({mail:mail, pass:password}, typeTeacher);
    }

    function onHandleForgotPass(){

    }

    function onHandleCreateAccount(){
      navigation.navigate('CreateAccount');
    }


    return (
     
        <View style={stylesGlobal.container}>
          <ButtonLinguage />
          
          <View style={styles.container}>
            <Text>Fight It</Text>
            <SwitchButton onPress={()=> setTypeTeacher(false)} text={t('createAccount.student')} type={!typeTeacher}></SwitchButton>
            <SwitchButton onPress={()=> setTypeTeacher(true)} text={t('createAccount.teacher')} type={typeTeacher}></SwitchButton>

              <Input
        
                onChangeText={setMail}
                value={mail}
                placeholder={t('login.mail')}
                keyboardType="email-address"
              />
              <Input
        
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder={t('login.password')}                
              />

              <TouchableOpacity
                style={styles.button}
                onPress={onHandleLogin}
              >
                <Text>{t('login.connect')}</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.textTouchebles}
                onPress={onHandleForgotPass}
              >
                <Text>{t('login.forgotPass')}</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.textTouchebles}
                onPress={onHandleCreateAccount}
              >
                <Text>{t('login.CreateAccount')}</Text>
              </TouchableOpacity>
          </View>
        </View>
    
    );
  }