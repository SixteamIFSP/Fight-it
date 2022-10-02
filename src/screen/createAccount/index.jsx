import { useRef, useState } from 'react';
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

    const errors = useRef([]);

    const handleEmail = (value) => {
        setUserEmail(value);
        setInvalidEmailMessage(validationEmail(value));

    };
    const handleName = (value) => {
        setUserName(value);
        setInvalidNameMessage(validationName(value));
    };
    const emptyInputsVerify = {
        emptyUserName: () => {
            errors.current.push('Nome não preenchido'); return false
        },
        emptyUserEmail: () => {
            errors.current.push('Email não preenchido'); return false
        },
        emptyUserPhone: () => {
            errors.current.push('Telefone não preenchido'); return false
        },
        emptyPassword: () => {
            errors.current.push('Senha não preenchida'); return false
        },
        emptyPasswordConfirm: () => {
            errors.current.push('Confirmação não preenchida'); return false
        },
        differentPasswords: () => {
            errors.current.push('Senha diferente da confirmação'); return false
        }
    };
    const {
        emptyUserName,
        emptyUserEmail,
        emptyUserPhone,
        emptyPassword,
        emptyPasswordConfirm,
        differentPasswords
    } = emptyInputsVerify;

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
            if (userName === '') emptyUserName();
            if (userEmail === '') emptyUserEmail();
            if (userPhone === '') emptyUserPhone();
            if (password === '') emptyPassword();
            if (passwordConfirm === '') emptyPasswordConfirm();
            if (password !== passwordConfirm) differentPasswords();
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
            let errorsText = "Digite os campos corretamente: "
            errors.current.map((value) => {
                errorsText = errorsText + `\n ${value}`
            });

            toastMessage(false, errorsText);
        }
    };

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
                        onChangeText={(value) => { handleName(value) }}
                        value={userName}
                        placeholder={t('createAccount.name')}
                        errorMessage={invalidNameMessage ? invalidNameMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={(value) => { handleEmail(value) }}
                        value={userEmail}
                        placeholder={t('login.mail')}
                        keyboardType="email-address"
                        autoComplete="email"
                        errorMessage={invalidEmailMessage ? invalidEmailMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <MaskInput style={styles.inputMask}
                        onChangeText={(_, unmasked) => { setUserPhone(unmasked); }}
                        value={userPhone}
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
                            handleConfirm={handleConfirmButton}
                            handleBack={handleBack} />
                        :
                        <Loading loading={loading} size={18} />
                }
            </View>

        </View>
    )
}