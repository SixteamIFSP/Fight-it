import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonLinguage } from '../../components/buttonChangeLinguage';
import { DoubleButtonConfirmation } from '../../components/doubleButtonConfirmation';
import { Input } from '../../components/input';
import { createAccount } from '../../controler/account';
import { styles as stylesGlobal } from '../../global/styles';
import { SwitchForm, SwitchText } from './styles';

export function CreateAccount({ navigation, routes }) {
    const { t } = useTranslation()

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const [typeTeacher, setTypeTeacher] = useState(false);

    useEffect(() => {
        console.log('valkor:', typeTeacher);
    }, [typeTeacher])

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
                tipoUserID: typeTeacher ? 1 : 2,
            };
            console.log("DATA", data);
            //navigation.navigate(`${typeTeacher ? 'CreateTeacher':'CreateStudent'}`, {dataAuth:data})
            createAccount(data);
            navigation.navigate('Login');
        } else {
            console.log("sem validacao");
        };
    };
    function handleBack() {
        navigation.navigate('Login');
    };
    return (
        <View style={stylesGlobal.container}>
            <ButtonLinguage></ButtonLinguage>
            <Text>{t('createAccount.title')}</Text>
            <Text>{t('createAccount.descriptionSwitch')}</Text>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
            }}>
                <SwitchForm onPress={() => setTypeTeacher(false)}>
                    <SwitchText change={!typeTeacher}>{t('createAccount.student')}</SwitchText>

                </SwitchForm>
                <SwitchForm onPress={() => setTypeTeacher(true)}>

                    <SwitchText change={typeTeacher}>{t('createAccount.teacher')}</SwitchText>

                </SwitchForm>

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

                onChangeText={setPhone}
                value={phone}
                placeholder={t('createAccount.phone')}
                keyboardType="numeric"

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
            <View style={{ width: '100%', justifyContent: 'center' }}>

                <DoubleButtonConfirmation handleConfirm={handleConfirm} handleBack={handleBack} />
            </View>
        </View>
    );
};