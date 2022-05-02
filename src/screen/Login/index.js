import { useState,  } from "react";
import i18n from '../../locales/i18n';
import { Button, Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import { Input } from "../../components/input";
import { styles } from "./styles";
import { styles as stylesGlobal } from "../../global/styles";
import  { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChageLinguage";

export function Login({ navigation }) {
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const {t} = useTranslation();

    function onHandleLogin(){
      console.log('Logado')
    }
    function onHandleForgotPass(){

    }
    function onHandleCreateAccount(){
      navigation.navigate('CreateAccount');

    }


    return (
     
        <View style={stylesGlobal.container}>
          <ButtonLinguage />
          
          <SafeAreaView style={styles.container}>
            <Text>Fight if</Text>
              <Input
        
                onChangeText={setMail}
                value={mail}
                placeholder={t('login.mail')}  /// TROCAR PARA ARQUIVO DE Nacionalização
                keyboardType="email-address"
              />
              <Input
        
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder={t('login.password')}  /// TROCAR PARA ARQUIVO DE Nacionalização
                
              />

              <TouchableOpacity
                style={styles.button}
                onPress={onHandleLogin}
              >
                <Text>{t('login.connect')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.textTouchebles}
                onPress={onHandleForgotPass}
              >
                <Text>{t('login.forgotPass')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.textTouchebles}
                onPress={onHandleCreateAccount}
              >
                <Text>{t('login.CreateAccount')}</Text>
              </TouchableOpacity>
          </SafeAreaView>
        </View>
    
    );
  }