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
import { MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from "../../components/radioButton";

export function CreateTriagem({ navigation, route }) {

  const [loading, setLoading] = useState(false);
  const [altura, setAltura] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false);
  const [peso, setPeso] = useState('');
  const [probOrtopedico, setProbOrtopedico] = useState(false);
  const [probOrtopedicoResp, setProbOrtopedicoResp] = useState('');
  const [doencaCronica, setDoencaCronica] = useState(false);
  const [doencaCronicaResp, setDoencaCronicaResp] = useState('');
  const [lesoes, setLesoes] = useState(false);
  const [lesoesResp, setLesoesResp] = useState('');
  const [didExercise, setDidExercise] = useState(false);
  const [didExerciseResp, setDidExerciseResp] = useState('');
  const [comentario, setComentario] = useState('');

  const [errorMessageAltura, setErrorMessageAltura] = useState('');
  const [errorMessagePeso, setErrorMessagePeso] = useState('');

  const handleAltura = (value) => {
    setAltura(value);
    setErrorMessageAltura('');
  };
  function handleBack() {
    navigation.navigate('CreateAccount')
  };

  const inputValidations = () => {
    if (altura === '' | peso === '') {
      if (altura === '') {
        setErrorMessageAltura('Campo Obrigatório');
      };
      if (peso === '') {
        setErrorMessagePeso('Campo Obrigatório');
      };
    } else {
      return true;
    };
  };

  async function handleConfirm() {
    if (inputValidations()) {
      const data = {
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

      setLoading(true);
      const response = await createAccount(route.params.data, false);
      const idAluno = response.id;
      await createTriagem(data, idAluno)
      setLoading(false);
      navigation.navigate('Login');
    } else {
      const errorText = "Preencha os campos corretamente!"
      toastMessage(false, errorText);
    }

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
              style={{ borderColor: `${errorMessageAltura ? 'red' : 'black'}` }}
              onChangeText={(value) => { handleAltura(value) }}
              value={altura}
              maxLength={3}
              placeholder={'Altura em centímetros (cm)'}
              keyboardType={'numeric'}
              errorMessage={errorMessageAltura || ''}
            />
          </View>
          <View style={styles.inputes}>
            <Input
              style={{ borderColor: `${errorMessagePeso ? 'red' : 'black'}` }}
              onChangeText={(e) => {
                setPeso(e);
                setErrorMessagePeso('');
              }}
              maxLength={3}
              value={peso}
              placeholder={'Peso(kg)'}
              keyboardType={'numeric'}
              errorMessage={errorMessagePeso || ''}
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