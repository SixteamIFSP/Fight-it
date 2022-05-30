import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonLinguage } from '../../components/buttonChangeLinguage';
import { DoubleButtonConfirmation } from '../../components/doubleButtonConfirmation';
import { Input } from '../../components/input';
import { createAccount } from '../../controler/account';
import { styles as stylesGlobal } from '../../global/styles';
import { styles } from './styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { SwitchButton } from '../../components/switchbutton';


export function CreateAccount({ navigation, routes }) {
    const { t } = useTranslation()

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [typeTeacher, setTypeTeacher] = useState(false);

    function validation() {
        if (name === '' | phone === '' | mail === '' | pass === '' | pass !== confirm)
            return false;
        return true;
    };

    function handleConfirm() {
        if (validation()) {
            const data = {
                nome: name,
                email: mail,
                telefone: phone,
                senha: pass,
                receberNot: 1,
            };
            createAccount(data, typeTeacher);
            navigation.navigate('Login');
        } else {
            Toast.show({
                type: "error",
                text2: "Digite os campos corretamente!",
            });
        }
    }
    function handleBack() {
        navigation.navigate('Login');
    };

    return (
        <View style={stylesGlobal.container}>
            <ButtonLinguage></ButtonLinguage>

            <Text style={styles.TitleLogin}>Fight It</Text>

            <View style={styles.userTypeChoice}>
                <Text>{t('createAccount.descriptionSwitch')}</Text>
            </View>

            <View style={styles.switchButtons}>
                <SwitchButton
                    onPress={() => setTypeTeacher(false)}
                    text={t('createAccount.student')}
                    type={!typeTeacher}
                ></SwitchButton>
                <SwitchButton
                    onPress={() => setTypeTeacher(true)}
                    text={t('createAccount.teacher')}
                    type={typeTeacher}
                ></SwitchButton>
            </View>

            <Input
                onChangeText={setName}
                value={name}
                placeholder={t('createAccount.name')}
            />
            <Input
                onChangeText={setMail}
                value={mail}
                placeholder={t('login.mail')}
                keyboardType="email-address"
            />
            <Input
                keyboardType='phone-pad'
                onChangeText={setPhone}
                value={phone}
                placeholder={t('createAccount.phone')}
            />
            <Input
                onChangeText={setPass}
                value={pass}
                placeholder={t('login.password')}
                secureTextEntry={true}

            />
            <Input
                onChangeText={setConfirm}
                value={confirm}
                placeholder={t('createAccount.confirmPassword')}
                secureTextEntry={true}
            />
            <View style={styles.confirmationButton}>
                <DoubleButtonConfirmation
                    handleConfirm={handleConfirm}
                    handleBack={handleBack} />
            </View>
        </View>
    )
}