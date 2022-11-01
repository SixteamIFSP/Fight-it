import { useState, } from "react";
import i18n from '../../locales/i18n';
import { Input } from "../../components/input";
import { styles } from "./styles";
import { styles as stylesGlobal } from "../../global/styles";
import { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { useUser } from "../../hooks/user";
import { SwitchButton } from "../../components/switchbutton";
import inputValidators from '../../utils/inputValidators';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { Loading } from "../../components/loading";
import { toastMessage } from "../../utils/toastMessage";
import Logo from "../../../assets/adaptive-icon.png";

export function Login({ navigation }) {
  const { validationEmail } = inputValidators()
  const [load, setLoad] = useState(false);
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [typeTeacher, setTypeTeacher] = useState(true);
  const [forgotPass, setforgotPass] = useState(false);

  //validations
  const [invalidEmailMessage, setInvalidEmailMessage] = useState('');
  const { singIn, forgotPassword } = useUser();

  const { t } = useTranslation();
  async function onHandleLogin() {
    //TODO:achar uma solução que não dê erro: 
    if (mail === '' || (password === '' && !forgotPass) ) {
      toastMessage(false, "Preencha os campos!");
      return
    }
    if (forgotPass) {
      setLoad(true);
      await forgotPassword(mail, typeTeacher);
       setLoad(false);
       handleForgot();

    } else {
      setLoad(true);
      await singIn({ mail: mail, pass: password }, typeTeacher);
       setLoad(false);
    }
  }

  function onHandleCreateAccount() {
    navigation.navigate('CreateAccount');
  }

  const handleEmail = (value) => {
    setMail(value);
    setInvalidEmailMessage(validationEmail(value));
  }

  const handleForgot = () => {
    setforgotPass((old) => !old);
  }
  
  return (
    <View style={stylesGlobal.container}>
      <View style={styles.containerLocale}>
        <ButtonLinguage />
      </View>
      <View style={styles.container}>
        <Image source={Logo} style={{width:300, height:300}} />       
        <View style={styles.switchButtons}>
          <SwitchButton
            onPress={() => setTypeTeacher(true)}
            text={t('createAccount.teacher')}
            type={typeTeacher}
          ></SwitchButton>
          <SwitchButton
            onPress={() => setTypeTeacher(false)}
            text={t('createAccount.student')}
            type={!typeTeacher}
          ></SwitchButton>
        </View>
        {forgotPass ?  
          <Text>{t("login.recoverMail")}</Text>
          : 
          <></>
        }
        <Input
          onChangeText={(value) => { handleEmail(value) }}
          value={mail}
          placeholder={t('login.mail')}
          keyboardType="email-address"
          errorMessage={invalidEmailMessage ? invalidEmailMessage : null}
        />
        {
          !forgotPass ?  
            <Input
              style={styles.inputPassword}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder={t('login.password')}
            />
            :
            <></>
        }
        
        <TouchableOpacity
          style={styles.button}
          onPress={onHandleLogin}
        >
          {
            !load ?
              <Text> 
                {
                  forgotPass? t('validation.submit') : t('login.connect')  
                }
              </Text>
              :
              <Loading loading={load} size={18} />
          }
        </TouchableOpacity>
        {
          !forgotPass ? 
          <>
            <TouchableOpacity
              style={styles.textTouchebles}
              onPress={onHandleCreateAccount}
            >
            <Text>
              {
                 t('login.CreateAccount')
              }
            </Text>
            </TouchableOpacity>
          </>
          :
          <></>
        }
          <TouchableOpacity
            style={styles.textTouchebles}
            onPress={handleForgot}
          >
            <Text>{
              forgotPass  ? t('login.back') : t("login.forgotPass")
              }
            </Text>
          </TouchableOpacity>  
      </View>
    </View>

  );
}