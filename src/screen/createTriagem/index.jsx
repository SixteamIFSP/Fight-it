import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, CheckBox } from "react-native";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { Loading } from "../../components/loading";
import { createAccount } from "../../controler/account";
import { createTriagem } from "../../controler/triagem";
import { styles } from './style'
import DateTimePicker from '@react-native-community/datetimepicker';
import { toastMessage } from "../../utils/toastMessage";
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from "../../components/radioButton";

export function CreateTriagem({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [objetivo, setObjetivo] = useState('')
  const [altura, setAltura] = useState('')
  const [date, setDate] = useState(new Date())
  const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false)
  const [peso, setPeso] = useState('')
  const [probOrtopedico, setProbOrtopedico] = useState(false)
  const [probOrtopedicoResp, setProbOrtopedicoResp] = useState('')
  const [doencaCronica, setDoencaCronica] = useState(false)
  const [doencaCronicaResp, setDoencaCronicaResp] = useState('')
  const [lesoes, setLesoes] = useState(false)
  const [lesoesResp, setLesoesResp] = useState('')
  const [didExercise, setDidExercise] = useState(false);
  const [didExerciseResp, setDidExerciseResp] = useState('')
  const [comentario, setComentario] = useState('')


  function handleBack() {
    navigation.navigate('CreateAccount')
  };

  async function handleConfirm() {
    const data = {
      objetivo,
      dataNascimento: date.toLocaleDateString(),
      altura,
      peso,
      problemaOrtopedico: probOrtopedico,
      problemaOrtopedicoResposta: probOrtopedicoResp,
      doencasCronicas: doencaCronica,
      doencasCronicasResposta: doencaCronicaResp,
      lesoes,
      lesoesResposta: lesoesResp,
      jaFezExercicios: didExercise,
      jaFezExerciciosResposta: didExerciseResp,
      comentario
    };
    const formIncomplet = Object.keys(data).find(e => {
      if (e === 'dataNascimento') return
      if (e === 'objetivo' && !data[e]) return true
      if (e === 'altura' && !data[e]) return true
      if (e === 'peso' && !data[e]) return true
      return data[e] === 'selecione'
    });
    if (formIncomplet) {
      toastMessage(false, 'Por favor, preencha todos os campos')
      return
    };

    setLoading(true);
    //TODO: CREATE ACCOUNT DEVE RETORNAR ID PARA QUE SEJA POSSÍVEL CRIAR A TRIAGEM DO ALUNO  SENDO CADASTRADO
    const id = await createAccount(route.params.data, false);
    const idChumbadoEnquantoServicoCreateAccountNaoRetornaID = 5
    await createTriagem(data, idChumbadoEnquantoServicoCreateAccountNaoRetornaID)
    setLoading(false);
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container} >
      <View style={styles.container}>
        <Text style={styles.TitleLogin}>Triagem</Text>
        <View style={styles.descriptionText}>
          <Text>
            Estamos quase finalizando seu cadastro.
          </Text>
          <Text>
            Precisamos apenas de mais algumas informações!
          </Text>
        </View>

        <View style={styles.personalDataContainer}>
          <Text style={styles.personalDataTitle}>Dados Pessoais:</Text>
          <View style={styles.inputes}>
            <Input
              onChangeText={(e) => {
                if (isNaN(Number(e))) return
                setAltura(e)
              }}
              value={altura}
              maxLength={3}
              placeholder={'Altura em centímetros (cm)'}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.inputes}>
            <Input
              style={styles.inputes}
              onChangeText={(e) => {
                if (isNaN(Number(e))) return
                setPeso(e)
              }}
              maxLength={3}
              value={peso}
              placeholder={'Peso(kg)'}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.birthDate}>
            <Text>Data de nascimento:</Text>
            <View style={styles.birthDateCalendar}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => { setSelectedDateIsOpen(true) }}>
                <Text>
                  {date.toLocaleDateString()}
                </Text>
                <MaterialIcons
                  style={{ fontSize: 16, marginLeft: 12 }}
                  name="edit"
                  size={40}
                  color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          {
            selectectDateIsOpen && <DateTimePicker
              themeVariant="dark"
              testID="dateTimePicker"
              value={date}
              mode="date"
              format="DD-MM-YYYY"
              maximumDate={new Date()}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                if (date) {
                  setDate(date)
                }
                setSelectedDateIsOpen(false)
              }}
              positiveButtonLabel="OK!"
            />
          }
        </View>

        <View style={styles.anamneseDidExerciseContainer}>
          <Text style={styles.anamneseTitle}>Anamnese:</Text>

          <View style={styles.anamneseAlignRadioButtons}>
            <Text>Você já praticou exercício físico antes?</Text>
            <RadioButton
              isChecked={didExercise}
              onPress={() => { setDidExercise(!didExercise) }}
              size={16}
              label={'Sim'}
              horizontal
            ></RadioButton>
          </View>
          {
            didExercise ?
              <Input
                style={styles.inputes}
                onChangeText={setDidExerciseResp}
                value={didExerciseResp}
                placeholder={'Qual(ais) e há quanto tempo?'}
              /> : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>Possui algum problema ortopédico?</Text>
            <RadioButton
              isChecked={probOrtopedico}
              onPress={() => { setProbOrtopedico(!probOrtopedico) }}
              size={16}
              label={'Sim'}
              horizontal
            ></RadioButton>
          </View>
          {
            probOrtopedico ?
              <Input
                style={styles.inputes}
                onChangeText={setProbOrtopedicoResp}
                value={probOrtopedicoResp}
                placeholder={'Qual(ais)?'}
              /> : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>Possui alguma doença crônica?</Text>
            <RadioButton
              isChecked={doencaCronica}
              onPress={() => { setDoencaCronica(!doencaCronica) }}
              size={16}
              label={'Sim'}
              horizontal
            ></RadioButton>
          </View>
          {
            doencaCronica ? <Input
              style={styles.inputes}
              onChangeText={setDoencaCronicaResp}
              value={doencaCronicaResp}
              placeholder={'Qual(ais)?'}
            />
              : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>Possui alguma lesão?</Text>
            <RadioButton
              isChecked={lesoes}
              onPress={() => { setLesoes(!lesoes) }}
              size={16}
              label={'Sim'}
              horizontal
            ></RadioButton>
          </View>
          {
            lesoes ?
              <Input
                style={styles.inputes}
                onChangeText={setLesoesResp}
                value={lesoesResp}
                placeholder={'Qual(ais)?'}
              /> : null
          }
        </View>

        <View>
          <Text>Gostaria de fazer algum outro comentário que possa ajudar na montagem do seu programa de treinamento?</Text>
          <Input
            style={styles.inputes}
            onChangeText={setComentario}
            value={comentario}
            placeholder={'Digite aqui'}
          />
        </View>

        {
          !loading ?
            <DoubleButtonConfirmation
              handleConfirm={handleConfirm}
              handleBack={handleBack} />
            :
            <Loading loading={loading} size={18} />
        }
      </View>
    </ScrollView>
  )
}