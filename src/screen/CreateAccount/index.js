import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native'
import { ButtonLinguage } from '../../components/buttonChageLinguage';
import { DoubleButtonConfirmation } from '../../components/doubleButtonConfirmation';
import { Input } from '../../components/input'
import { styles as stylesGlobal } from '../../global/styles';
import { SwitchForm, SwitchText } from './styles';

export function CreateAccount({ navigation  ,routes}){
    const {t} = useTranslation()
    const [step, setStep] = useState(1);
    const [name, setName]  = useState('a');
    const [mail, setMail] = useState('a');
    const [phone, setPhone] = useState('a');
    const [pass, setPass] = useState('a');
    const [confirm, setConfirm] = useState('a');
    const [typeTeacher, setTypeTeacher] = useState(false);

    useEffect(()=>{
        console.log('valkor:', typeTeacher );
    },[typeTeacher])

    function validation(){
        if (name==='')      
            return false;
        if (mail==='')      
            return false;
        if (phone==='')      
            return false;
        if (pass==='' && pass!=confirm)      
            return false;
        
        return true;

    }

    function handleConfirm(){  
        if(validation()){
            const data = { 
                name:name,
                mail:mail,
                phone:phone,
                pass:pass,
            }
   
            navigation.navigate(`${typeTeacher ? 'CreateTeacher':'CreateStudent'}`, {dataAuth:data})
        } else{
            console.log("sem validacao");
        } 
    }
    function handleBack(){
        navigation.navigate('Login');
        
    }



    return (
        <View style={stylesGlobal.container}>
            <ButtonLinguage></ButtonLinguage>
            <Text>{t('createAccount.title')}</Text>
            <Text>{t('createAccount.descriptionSwitch')}</Text>
            <View style={{
                flexDirection:'row',
            }}>

                <SwitchForm onPress={()=> setTypeTeacher(false)}>
                    <SwitchText change={!typeTeacher}>{t('createAccount.student')}</SwitchText>

                </SwitchForm>
                <SwitchForm onPress={()=> setTypeTeacher(true)}>
  
                   <SwitchText change={typeTeacher}>{t('createAccount.teacher')}</SwitchText>

                </SwitchForm>
                
            </View>

            <Input 
   
                onChangeText={setName}
                value={name}
                placeholder={t('createAccount.name')}  /// TROCAR PARA ARQUIVO DE Nacionalização
                
            />
            <Input 
 
                onChangeText={setMail}
                value={mail}
                placeholder={t('login.mail')}  /// TROCAR PARA ARQUIVO DE Nacionalização
                keyboardType="email-address"
            />
            <Input 
      
                onChangeText={setPhone}
                value={phone}
                placeholder={t('createAccount.phone')}  /// TROCAR PARA ARQUIVO DE Nacionalização
       
            />
            <Input 
        
                onChangeText={setPass}
                value={pass}
                placeholder={t('login.password')}  /// TROCAR PARA ARQUIVO DE Nacionalização
             
            />
            <Input 
   
                onChangeText={setConfirm}
                value={confirm}
                placeholder={t('createAccount.confirmPassword')}  /// TROCAR PARA ARQUIVO DE Nacionalização
            />
            <DoubleButtonConfirmation handleConfirm={handleConfirm} handleBack={handleBack}/>
        </View>
    )
}