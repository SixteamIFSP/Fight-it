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
    const [loading, setLoading] =useState(false);

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
            if(!typeTeacher) {
                navigation.navigate('CreateTriagem', {data});
                return 
            }
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
                style={styles.inputes}
                onChangeText={setName}
                value={name}
                placeholder={t('createAccount.name')}
            />
            <Input
                style={styles.inputes}
                onChangeText={setMail}
                value={mail}
                placeholder={t('login.mail')}
                keyboardType="email-address"
            />
            <Input
                style={styles.inputes}
                keyboardType='phone-pad'
                onChangeText={setPhone}
                value={phone}
                placeholder={t('createAccount.phone')}
            />
            <Input
                style={styles.inputes}
                onChangeText={setPass}
                value={pass}
                placeholder={t('login.password')}
                secureTextEntry={true}
            />
            <Input
                style={styles.inputes}
                onChangeText={setConfirm}
                value={confirm}
                placeholder={t('createAccount.confirmPassword')}
                secureTextEntry={true}
            />
            <View style={styles.confirmationButton}>

                {
                !loading ? 
                    <DoubleButtonConfirmation
                        handleConfirm={handleConfirm}
                        handleBack={handleBack} />
                :
                    <Loading loading={loading} size={18}/>
                }
                    
            </View>

        </View>
    )
}