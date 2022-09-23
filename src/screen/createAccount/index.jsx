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
import { toastMessage } from '../../utils/toastMessage';
import inputValidators from '../../utils/inputValidators';
import MaskInput, { Masks } from 'react-native-mask-input';

export function CreateAccount({ navigation }) {
    const { validationEmail } = inputValidators()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false);

    //setter dos campos
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    //validations
    const [emailValidError, setEmailValidError] = useState('');



    const [typeTeacher, setTypeTeacher] = useState(true);

    const handleValidEmail = value => {
        setMail(value);
        setEmailValidError(validationEmail(value));
    };

    function validation() {
        if (name === '' | phone === '' | mail === '' | password === '' | password !== passwordConfirm)
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
                senha: password,
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
                        onChangeText={setName}
                        value={name}
                        placeholder={t('createAccount.name')}
                    /></View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={(value) => { handleValidEmail(value) }}
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
                    <MaskInput style={{ width: '70%', marginBottom: 12, marginTop: 5, borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}
                        onChangeText={(masked, unmasked) => { setPhone(unmasked); console.log(unmasked) }}
                        value={phone}
                        placeholder={t('createAccount.phone')}
                        mask={Masks.BRL_PHONE}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setPassword}
                        value={password}
                        placeholder={t('login.password')}
                        secureTextEntry={true}
                    /></View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
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