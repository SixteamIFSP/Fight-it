import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native'
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
    //desestruturação dos imports
    const { validationEmail, validationName } = inputValidators()
    const { t } = useTranslation()

    //loading
    const [loading, setLoading] = useState(false);

    //setter dos campos
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [typeTeacher, setTypeTeacher] = useState(true);

    const [invalidEmailMessage, setInvalidEmailMessage] = useState('');
    const [invalidNameMessage, setInvalidNameMessage] = useState('');
    const [invalidPassowrdMessage, setInvalidPassowrdMessage] = useState('');
    const [invalidPassowrdConfirmMessage, setInvalidPassowrdConfirmMessage] = useState('');

    const errors = useRef([]);

    //criando constantes para validar se os campos estão preenchidos
    const [nameEmpty, setNameEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [phoneEmpty, setPhoneEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [passwordConfirmEmpty, setPasswordConfirmEmpty] = useState(false);


    const handleEmail = (value) => {
        setEmailEmpty(false);
        setUserEmail(value);
        setInvalidEmailMessage(validationEmail(value));

    };
    const handleName = (value) => {
        setNameEmpty(false);
        setUserName(value);
        setInvalidNameMessage(validationName(value));
    };
    const handlePassword = (value) => {
        setPasswordEmpty(false);
        setPassword(value);
        setInvalidPassowrdMessage('');
    };
    const handlePasswordConfirm = (value) => {
        setPasswordConfirmEmpty(false);
        setPasswordConfirm(value);
        setInvalidPassowrdConfirmMessage('');
    };
    const handlePhone = (value) => {
        setUserPhone(value);
        setPhoneEmpty(false);
    };

    const inputValidations = () => {
        errors.current = [];
        if (
            userName === '' |
            userPhone === '' |
            userEmail === '' |
            password === '' |
            passwordConfirm === '' |
            password !== passwordConfirm
        ) {
            if (userName === '') {
                setNameEmpty(true);
                setInvalidNameMessage('Campo Obrigatório');
            };
            if (userEmail === '') {
                setEmailEmpty(true);
                setInvalidEmailMessage('Campo Obrigatório');
            };
            if (userPhone === '') setPhoneEmpty(true);
            if (password === '') {
                setPasswordEmpty(true);
                setInvalidPassowrdMessage('Campo Obrigatório');
            };
            if (passwordConfirm === '') {
                setPasswordConfirmEmpty(true);
                setInvalidPassowrdConfirmMessage('Campo Obrigatório');
            };
        } else {
            return true;
        }
    };

    async function handleConfirmButton() {
        if (loading) return;
        if (inputValidations()) {
            const data = {
                nome: userName,
                email: userEmail,
                telefone: userPhone,
                senha: password,
                receberNot: 1,
            };
            if (!typeTeacher) {
                navigation.navigate('CreateTriagem', { data });
                return
            }
            setLoading(true);
            await createAccount(data, typeTeacher);
            setLoading(false);
            navigation.navigate('Login');
        } else {
            let errorsText = "Preencha os campos corretamente!"
            toastMessage(false, errorsText);
        }
    };

    function handleBack() {
        navigation.navigate('Login');
    };

    return (
        <View style={stylesGlobal.container}>
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
                        style={{ borderColor: `${nameEmpty ? 'red' : 'black'}` }}
                        onChangeText={(value) => { handleName(value) }}
                        value={userName}
                        placeholder={t('createAccount.name')}
                        errorMessage={invalidNameMessage ? invalidNameMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        style={{ borderColor: `${emailEmpty ? 'red' : 'black'}` }}
                        onChangeText={(value) => { handleEmail(value) }}
                        value={userEmail}
                        placeholder={t('login.mail')}
                        keyboardType="email-address"
                        autoComplete="email"
                        errorMessage={invalidEmailMessage ? invalidEmailMessage : null}
                    />
                </View>
                <View style={styles.phoneInputContainer}>
                    <MaskInput
                        style={{
                            width: '70%',
                            marginBottom: 12,
                            marginTop: 5,
                            borderWidth: 1,
                            borderTopWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderColor: `${phoneEmpty ? 'red' : 'black'}`
                        }}
                        onChangeText={(_, unmasked) => { handlePhone(unmasked) }}
                        value={userPhone}
                        placeholder={t('createAccount.phone')}
                        mask={Masks.BRL_PHONE}
                    />
                    {
                        phoneEmpty ?
                            <Text style={styles.requiredField}>Campo Obrigatório</Text>
                            :
                            null
                    }
                </View>
                <View style={styles.inputes}>
                    <Input
                        style={{
                            borderColor: `${passwordEmpty || (password !== passwordConfirm)
                                ?
                                'red' : 'black'}`
                        }}
                        onChangeText={(value) => { handlePassword(value) }}
                        value={password}
                        placeholder={t('login.password')}
                        secureTextEntry={true}
                        errorMessage={invalidPassowrdMessage ? invalidPassowrdMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        style={{
                            borderColor: `${passwordConfirmEmpty || (password !== passwordConfirm)
                                ? 'red' : 'black'}`
                        }}
                        onChangeText={(value) => { handlePasswordConfirm(value) }}
                        value={passwordConfirm}
                        placeholder={t('createAccount.confirmPassword')}
                        secureTextEntry={true}
                        errorMessage={invalidPassowrdConfirmMessage ? invalidPassowrdConfirmMessage : null}

                    />
                    {
                        password !== passwordConfirm
                            ?
                            <Text style={styles.passwordsDontMatch}>Senhas não conferem</Text>
                            :
                            null
                    }
                </View>
            </View>

            <View style={styles.confirmationButton}>
                {
                    !loading ?
                        <DoubleButtonConfirmation
                            handleConfirm={handleConfirmButton}
                            handleBack={handleBack} />
                        :
                        <Loading loading={loading} size={18} />
                }
            </View>

        </View>
    )
}