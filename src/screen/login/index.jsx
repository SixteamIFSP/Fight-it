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
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [typeTeacher, setTypeTeacher] = useState(true);
  //validations
  const [invalidEmailMessage, setInvalidEmailMessage] = useState('');
  const { singIn } = useUser();

  const { t } = useTranslation();
  async function onHandleLogin() {
    //TODO:achar uma solução que não dê erro: 
    if (mail === '' || password === '') {
      toastMessage(false, "Preencha os campos!");
      return
    }
    // setLoading(true);
    await singIn({ mail: mail, pass: password }, typeTeacher);
    // setLoading(false);
  }

  function onHandleCreateAccount() {
    navigation.navigate('CreateAccount');
  }

  const handleEmail = (value) => {
    setMail(value);
    setInvalidEmailMessage(validationEmail(value));

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
        <Input
          onChangeText={(value) => { handleEmail(value) }}
          value={mail}
          placeholder={t('login.mail')}
          keyboardType="email-address"
          errorMessage={invalidEmailMessage ? invalidEmailMessage : null}
        />
        <Input
          style={styles.inputPassword}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder={t('login.password')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onHandleLogin}
        >
          {
            !loading ?
              <Text> {t('login.connect')}</Text>
              :
              <Loading loading={loading} size={18} />
          }
        </TouchableOpacity>
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