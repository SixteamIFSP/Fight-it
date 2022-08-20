import { useState, } from "react";
import { Input } from "../../components/input";
import { styles } from "./styles";
import { styles as stylesGlobal } from "../../global/styles";
import { useTranslation } from 'react-i18next';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { useUser } from "../../hooks/user";
import { SwitchButton } from "../../components/switchbutton";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { Loading } from "../../components/loading";

export function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [typeTeacher, setTypeTeacher] = useState(true);
  const { singIn } = useUser();

  const { t: translation } = useTranslation(); /// IMPORT DA TRADUÇÂO 

  async function onHandleLogin() {
    setLoading(true);
    await singIn({ mail, password }, typeTeacher);
    setLoading(false);
  }

  function onHandleCreateAccount() {
    navigation.navigate('CreateAccount');
  }

  return (
    <View style={stylesGlobal.container}>
      <ButtonLinguage />
      <View style={styles.container}>
        <Text style={styles.TitleLogin}>Fight It</Text>
        <View style={styles.switchButtons}>
          <SwitchButton
            onPress={() => setTypeTeacher(true)}
            text={translation('createAccount.teacher')}
            type={typeTeacher}
          ></SwitchButton>
          <SwitchButton
            onPress={() => setTypeTeacher(false)}
            text={translation('createAccount.student')}
            type={!typeTeacher}
          ></SwitchButton>
        </View>
        <Input
          onChangeText={setMail}
          value={mail}
          placeholder={translation('login.mail')}
          keyboardType="email-address"
        />
        <Input
          style={styles.inputPassword}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder={translation('login.password')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onHandleLogin}
        >
          {
            !loading ?
              <Text> {translation('login.connect')}</Text>
              :
              <Loading loading={loading} size={18} />
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textTouchebles}
          onPress={onHandleCreateAccount}
        >
          <Text>{translation('login.CreateAccount')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}