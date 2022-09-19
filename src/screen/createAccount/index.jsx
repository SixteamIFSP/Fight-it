import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native'
import { ButtonLinguage } from '../../components/buttonChangeLinguage';
import { DoubleButtonConfirmation } from '../../components/doubleButtonConfirmation';
import { Input } from '../../components/input';
import { createAccount } from '../../controler/account';
import { styles as stylesGlobal } from '../../global/styles';
import { styles } from './styles';
import { SwitchButton } from '../../components/switchbutton';
import { Loading } from '../../components/loading';
import { toastMessage } from '../../util/toastMessage';

export function CreateAccount({ navigation, routes }) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const [mail, setMail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');

    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');

    const [typeTeacher, setTypeTeacher] = useState(true);

    const handleValidEmail = value => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(value) === false) {
            setEmailValidError('Digite um email válido');
        } else if (reg.test(value) === true) {
            setEmailValidError('');
        }
    };

    function validation() {
        if (name === '' | phone === '' | mail === '' | pass === '' | pass !== confirm)
            return false;
        return true;
    };

    async function handleConfirm() {
        if (loading) return

        if (validation()) {
            const data = {
                nome: name,
                email: mail,
                telefone: phone,
                senha: pass,
                receberNot: 1,
            };
            setLoading(true);
            await createAccount(data, typeTeacher);
            setLoading(false);
            navigation.navigate('Login');

        } else {
            toastMessage(false, "Digite os campos corretamente!")
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

            <View style={styles.inputesContainer}>
                <View style={styles.inputes}>
                    <Input
                        errorMessage onChangeText={setName}
                        value={name}
                        placeholder={t('createAccount.name')}
                    /></View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={(value) => { setMail(value); handleValidEmail(value) }}
                        value={mail}
                        placeholder={t('login.mail')}
                        keyboardType="email-address"
                        autoComplete="email"
                    />
                    {
                        emailValidError ?
                            <Text styles={{ backgroundColor: 'red' }}>
                                {emailValidError}
                            </Text>
                            : null
                    }
                </View>
                <View style={styles.inputes}>
                    <Input
                        keyboardType='phone-pad'
                        onChangeText={setPhone}
                        value={phone}
                        placeholder={t('createAccount.phone')}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setPass}
                        value={pass}
                        placeholder={t('login.password')}
                        secureTextEntry={true}
                    /></View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setConfirm}
                        value={confirm}
                        placeholder={t('createAccount.confirmPassword')}
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={styles.confirmationButton}>

                {
                    !loading ?
                        <DoubleButtonConfirmation
                            handleConfirm={handleConfirm}
                            handleBack={handleBack} />
                        :
                        <Loading loading={loading} size={18} />
                }

            </View>

        </View>
    )
}