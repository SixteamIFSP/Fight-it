import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { Loading } from "../../components/loading";
import { createAccount } from "../../controler/account";
import { createTriagem } from "../../controler/triagem";
import {styles} from './style'
import DateTimePicker from '@react-native-community/datetimepicker';
import { toastMessage } from "../../util/toastMessage";

export function CreateTriagem({navigation, route}) {
    const [loading, setLoading] =useState(false);
    const [altura, setAltura ] = useState('')
    const [date, setDate] = useState(new Date())
    const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false)
    const [peso, setPeso] = useState('')
    const [probOrtopedico, setProbOrtopedico] = useState('')
    const [doencaCronica, setDoencaCronica] = useState('')
    const [lesoes, setLesoes] = useState('')

     function handleBack() {
        navigation.navigate('CreateAccount')
     }

    async function handleConfirm() {
        const data = { 
            dataNascimento: date.toLocaleDateString(), 
            altura, 
            peso, 
            problemaOrtopedico: probOrtopedico,
            doencasCronicas: doencaCronica,
            lesoes, 
        } 

       const formIncomplet = Object.keys(data).find( e => {
        if(e === 'dataNascimento') return 
        return !data[e]
       } )
       if(formIncomplet) {
          toastMessage(false, 'Por favor, preencha todos os campos')
          return 
       }

        setLoading(true);
         //TODO: CREATE ACCOUNT DEVE RETORNAR ID PARA QUE SEJA POSSÍVEL CRIAR A TRIAGEM DO ALUNO  SENDO CADASTRADO
         const id = await createAccount(route.params.data, false);
         const idChumbadoEnquantoServicoCreateAccountNaoRetornaID = 1
         await  createTriagem(data, idChumbadoEnquantoServicoCreateAccountNaoRetornaID)
         setLoading(false);
         navigation.navigate('Login');
     }

    return (
        <View style={styles.container} >
            <Text style={styles.TitleLogin}>Realizar triagem</Text>
            <Text style={styles.descriptionText}>Quase finalizando seu cadastro! Apenas precisamos de mais algumas informações de triagem.</Text>

              <Input
                style={styles.inputes}
                onChangeText={(e) => {
                    if(isNaN(Number(e))) return 
                    setAltura(e)
                }}
                value={altura}
                maxLength={3}
                placeholder={'Altura'}
                keyboardType='numeric'
            />
            <Input
                style={styles.inputes}
                onChangeText={(e) => {
                    if(isNaN(Number(e))) return 
                    setPeso(e)
                }}
                maxLength={3}
                value={peso}
                placeholder={'Peso(kg)'}
                keyboardType='numeric'
            />
            <Input
                style={styles.inputes}
                onChangeText={setProbOrtopedico}
                value={probOrtopedico}
                placeholder={'Algum problema ortopédico?'}
            />
            <Input
                style={styles.inputes}
                onChangeText={setDoencaCronica}
                value={doencaCronica}
                placeholder={'Alguma doença crónica?'}
            />
            <Input
                style={styles.inputes}
                onChangeText={setLesoes}
                value={lesoes}
                placeholder={'Alguma lesão?'}
            />
            <TouchableOpacity onPress={() => {setSelectedDateIsOpen(true)}}>
                <Text>Data de nascimento</Text>
                <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
             {selectectDateIsOpen && <DateTimePicker
              themeVariant="dark"
              testID="dateTimePicker"
              value={date}
              mode="date"
              format="DD-MM-YYYY"
              maximumDate={new Date()}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
               if(date) { 
                 setDate(date)
               } 
               setSelectedDateIsOpen(false)
              }}
              positiveButtonLabel="OK!" 
           />}
             
             {
                !loading ? 
                    <DoubleButtonConfirmation
                        handleConfirm={handleConfirm}
                        handleBack={handleBack} />
                :
                    <Loading loading={loading} size={18}/>
                }
        </View>
    )
}