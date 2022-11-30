import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { useTranslation } from 'react-i18next';
import { convertDateToBrString } from "../../utils/dateConvert";

export function CreateTriagem({ navigation, route }) {

  const [loading, setLoading] = useState(false);
  const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false);
  const [errorMessageAltura, setErrorMessageAltura] = useState('');
  const [errorMessagePeso, setErrorMessagePeso] = useState('');

  //dados da triagem
  const [altura, setAltura] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  const [peso, setPeso] = useState('');
  //TODO:REMOVER
  const [probOrtopedico, setProbOrtopedico] = useState(false);
  const [probOrtopedicoResp, setProbOrtopedicoResp] = useState('');

  const [doencaCronica, setDoencaCronica] = useState(false);
  const [doencaCronicaResp, setDoencaCronicaResp] = useState('');
  //TODO: REMOVER
  const [lesoes, setLesoes] = useState(false);
  const [lesoesResp, setLesoesResp] = useState('');

  const [didExercise, setDidExercise] = useState(false);
  const [didExerciseResp, setDidExerciseResp] = useState('');
  const [comentario, setComentario] = useState('');

  //TODO:fazer com checkbox
  const [isCompetitionGoal, setIsCompetitionGoal] = useState('Não');
  const [isHypertrophyGoal, setIsHypertrophyGoal] = useState('Não');
  const [isSlimmingGoal, setIsSlimmingGnGoal] = useState('Não');
  const [isConditioningGoal, setIsConditioningGoal] = useState('Não');

  const [isSmoker, setIsSmoker] = useState(false);
  const [isSmokerResp, setIsSmokerResp] = useState(false);

  const [haveHighCholesterol, setHaveHighCholesterol] = useState(false);

  const [haveDiabetes, setHaveDiabetes] = useState(false);

  const [feelPain, setFeelPain] = useState(false);
  const [fellPainResp, setFeelPainResp] = useState('');

  const [haveSpinalDysfunction, setHaveSpinalDysfunction] = useState(false);
  const [haveSpinalDysfunctionResp, setHaveSpinalDysfunctionResp] = useState('');

  const [hasMovementLimitation, setHasMovementLimitation] = useState(false);
  const [hasMovementLimitationResp, setHasMovementLimitationResp] = useState('');

  const [hasCirurgy, setHasCirugy] = useState(false);
  const [hasCirurgyResp, setHasCirugyResp] = useState('');

  const [usePrescriptionDrugs, setUsePrescriptionDrugs] = useState(false);
  const [usePrescriptionDrugsResp, setUsePrescriptionDrugsResp] = useState('');

  const [useSupplements, setUseSupplements] = useState(false);
  const [useSupplementsResp, setUseSupplementsResp] = useState('');

  const { t } = useTranslation()

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
        setErrorMessageAltura(t('sorting.errorMessageHeight'))
      };
      if (peso === '') {
        setErrorMessagePeso(t('sorting.errorMessageWeight'))
      };
    } else if ((didExercise && !didExerciseResp)
      || (probOrtopedico && !probOrtopedicoResp)
      || (doencaCronica && !doencaCronicaResp)
      || (lesoes && !lesoesResp)
      || (!isCompetitionGoal && !isHypertrophyGoal && !isSlimmingGoal && !isConditioningGoal)
      || (isSmoker && !isSmokerResp)
      || (feelPain && !fellPainResp)
      || (haveSpinalDysfunction && !haveSpinalDysfunctionResp)
      || (hasMovementLimitation && !hasMovementLimitationResp)
      || (hasCirurgy && !hasCirurgyResp)
      || (usePrescriptionDrugs && !usePrescriptionDrugsResp)) {
      return false;
    }
    else { return true }
  };

  async function handleConfirm() {
    if (inputValidations()) {
      const data = {
        dataNascimento: birthDate,
        altura,
        peso,
        problemaOrtopedico: probOrtopedico ? probOrtopedicoResp : 'Não possui.',
        doencasCronicas: doencaCronica ? doencaCronicaResp : 'Não possui.',
        lesoes: lesoes ? lesoesResp : 'Não possui.',
        jaFezExercicios: didExercise ? didExerciseResp : 'Não',
        comentario: comentario,
        ObjetivoCompeticao: isCompetitionGoal ? 'Sim' : 'Não',
        ObjetivoEmagrecimento: isSlimmingGoal ? 'Sim' : 'Não',
        ObjetivoCondicionamento: isConditioningGoal ? 'Sim' : 'Não',
        ObjetivoHipertrofia: isHypertrophyGoal ? 'Sim' : 'Não',
        fumante: isSmoker ? isSmokerResp : 'Não',
        colesterol: haveHighCholesterol ? 'Sim' : 'Não',
        senteDoresArticulacoes: feelPain ? fellPainResp : 'Não',
        disfuncaoColuna: haveSpinalDysfunction ? haveSpinalDysfunctionResp : 'Não',
        limitacaoMovimento: hasMovementLimitation ? hasMovementLimitationResp : 'Não',
        possuiCirurgia: hasCirurgy ? hasCirurgyResp : 'Não',
        remedioControlado: usePrescriptionDrugs ? usePrescriptionDrugsResp : 'Não',
        suplementos: useSupplements ? useSupplementsResp : 'Não'
      };
      setLoading(true);
      
      const response = await createAccount(route.params.data, false);
      const idAluno = response.id;
      await createTriagem(data, idAluno)
      setLoading(false);
      navigation.navigate('Login');
    } else {
      const errorText = (t('sorting.loadingErrorText'));
      toastMessage(false, errorText);
    }
  };

  return (
    <ScrollView style={styles.container} >
      <View style={styles.container}>
        <Text style={styles.TitleLogin}>{t('sorting.title')}</Text>
        <View style={styles.descriptionText}>
          <Text>
            {t('sorting.sortingHeader1')}
          </Text>
          <Text>
            {t('sorting.sortingHeader2')}
          </Text>
        </View>

        <View style={styles.personalDataContainer}>
          <Text style={styles.personalDataTitle}> {t('sorting.personalData')}</Text>
          <View style={styles.inputes}>
            <Input
              style={{ borderColor: `${errorMessageAltura ? 'red' : 'black'}` }}
              onChangeText={(value) => { handleAltura(value) }}
              value={altura}
              maxLength={3}
              placeholder={t('sorting.height')}
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
              placeholder={t('sorting.weight')}
              keyboardType={'numeric'}
              errorMessage={errorMessagePeso || ''}
            />
          </View>
          <View style={styles.birthDate}>
            <Text>{t('sorting.birthDate')}</Text>
            <View style={styles.birthDateCalendar}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => { setSelectedDateIsOpen(true) }}>
                <Text>
                  {convertDateToBrString(birthDate)}
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
              value={birthDate}
              mode="date"
              format="DD-MM-YYYY"
              maximumDate={new Date(2017, 2, 1)}
              is24Hour={true}
              display="default"
              onChange={(_, date) => {
                if (date) {
                  setBirthDate(date);
                }
                setSelectedDateIsOpen(false)
              }}
              positiveButtonLabel="OK!"
            />
          }
          <View style={styles.anamneseDidExerciseContainer}>
            <View style={styles.trainningGoal}>
              <Text>Qual o seu objetivo?</Text>
              <RadioButton
                isChecked={isHypertrophyGoal}
                onPress={() => {
                  setIsHypertrophyGoal(!isHypertrophyGoal)
                }}
                size={16}
                label={'Hipertrofia'}
                horizontal
              ></RadioButton>
              <RadioButton
                isChecked={isSlimmingGoal}
                onPress={() => {
                  setIsSlimmingGnGoal(!isSlimmingGoal)
                }}
                size={16}
                label={'Emagrecimento'}
                horizontal
              ></RadioButton>
              <RadioButton
                isChecked={isCompetitionGoal}
                onPress={() => {
                  setIsCompetitionGoal(!isCompetitionGoal)
                }}
                size={16}
                label={'Competição'}
                horizontal
              ></RadioButton>
              <RadioButton
                isChecked={isConditioningGoal}

                onPress={() => {
                  setIsConditioningGoal(!isConditioningGoal)
                }}
                size={16}
                label={'Condicionamento'}
                horizontal
              ></RadioButton>
            </View>
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Fumante?'}</Text>
              <RadioButton
                isChecked={isSmoker}
                onPress={() => { setIsSmoker(!isSmoker) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              isSmoker ?
                <Input
                  style={{ borderColor: `${isSmoker && !isSmokerResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setIsSmokerResp}
                  value={isSmokerResp}
                  placeholder={"Há quanto tempo?"}
                  errorMessage={isSmoker && !isSmokerResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Possui Colesterol alto?'}</Text>
              <RadioButton
                isChecked={haveHighCholesterol}
                onPress={() => { setHaveHighCholesterol(!haveHighCholesterol) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Possui Diabetes?'}</Text>
              <RadioButton
                isChecked={haveDiabetes}
                onPress={() => { setHaveDiabetes(!haveDiabetes) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>

            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Sente dores nas costas ou articulações?'}</Text>
              <RadioButton
                isChecked={feelPain}
                onPress={() => { setFeelPain(!feelPain) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              feelPain ?
                <Input
                  style={{ borderColor: `${feelPain && !fellPainResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setFeelPainResp}
                  value={fellPainResp}
                  placeholder={"Onde?"}
                  errorMessage={feelPain && !fellPainResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Possui alguma disfunção na coluna?'}</Text>
              <RadioButton
                isChecked={haveSpinalDysfunction}
                onPress={() => { setHaveSpinalDysfunction(!haveSpinalDysfunction) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              haveSpinalDysfunction ?
                <Input
                  style={{ borderColor: `${haveSpinalDysfunction && !haveSpinalDysfunctionResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setHaveSpinalDysfunctionResp}
                  value={haveSpinalDysfunctionResp}
                  placeholder={"Qual?"}
                  errorMessage={haveSpinalDysfunction && !haveSpinalDysfunctionResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Possui alguma limitação de movimento ?'}</Text>
              <RadioButton
                isChecked={hasMovementLimitation}
                onPress={() => { setHasMovementLimitation(!hasMovementLimitation) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              hasMovementLimitation ?
                <Input
                  style={{ borderColor: `${hasMovementLimitation && !hasMovementLimitationResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setHasMovementLimitationResp}
                  value={hasMovementLimitationResp}
                  placeholder={"Qual?"}
                  errorMessage={hasMovementLimitation && !hasMovementLimitationResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Passou por alguma cirurgia ?'}</Text>
              <RadioButton
                isChecked={hasCirurgy}
                onPress={() => { setHasCirugy(!hasCirurgy) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              hasCirurgy ?
                <Input
                  style={{ borderColor: `${hasCirurgy && !hasCirurgyResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setHasCirugyResp}
                  value={hasCirurgyResp}
                  placeholder={"Onde?"}
                  errorMessage={hasCirurgy && !hasCirurgyResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Faz uso de remédio controlado?'}</Text>
              <RadioButton
                isChecked={usePrescriptionDrugs}
                onPress={() => { setUsePrescriptionDrugs(!usePrescriptionDrugs) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              usePrescriptionDrugs ?
                <Input
                  style={{ borderColor: `${usePrescriptionDrugs && !usePrescriptionDrugsResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setUsePrescriptionDrugsResp}
                  value={usePrescriptionDrugsResp}
                  placeholder={"Qual/Quais?"}
                  errorMessage={usePrescriptionDrugs && !usePrescriptionDrugsResp ? t('createAccount.requiredField') : null}
                /> : null
            }
            <View style={styles.anamneseAlignRadioButtons}>
              <Text>{'Faz uso de suplementos ou anabolizantes?'}</Text>
              <RadioButton
                isChecked={useSupplements}
                onPress={() => { setUseSupplements(!useSupplements) }}
                size={16}
                label={t('sorting.anamneseDidExerciseLabel')}
                horizontal
              ></RadioButton>
            </View>
            {
              useSupplements ?
                <Input
                  style={{ borderColor: `${useSupplements && !useSupplementsResp ? 'red' : 'black'}`, width: '100%' }}
                  onChangeText={setUseSupplementsResp}
                  value={useSupplementsResp}
                  placeholder={"Qual/Quais?"}
                  errorMessage={useSupplements && !useSupplementsResp ? t('createAccount.requiredField') : null}
                /> : null
            }
          </View>

          <View style={styles.anamneseAlignRadioButtons}>
            <Text>{t('sorting.anamneseDidExercise')}</Text>
            <RadioButton
              isChecked={didExercise}
              onPress={() => { setDidExercise(!didExercise) }}
              size={16}
              label={t('sorting.anamneseDidExerciseLabel')}
              horizontal
            ></RadioButton>
          </View>
          {
            didExercise ?
              <Input
                style={{ borderColor: `${didExercise && !didExerciseResp ? 'red' : 'black'}`, width: '100%' }}
                onChangeText={setDidExerciseResp}
                value={didExerciseResp}
                placeholder={t('sorting.anamneseDidExerciseWhich')}
                errorMessage={didExercise && !didExerciseResp ? t('createAccount.requiredField') : null}
              /> : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>{t('sorting.anamneseDidOrthProb')}</Text>
            <RadioButton
              isChecked={probOrtopedico}
              onPress={() => { setProbOrtopedico(!probOrtopedico) }}
              size={16}
              label={t('sorting.anamneseDidOrthProbLabel')}
              horizontal
            ></RadioButton>
          </View>
          {
            probOrtopedico ?
              <Input
                style={{ borderColor: `${probOrtopedico && !probOrtopedicoResp ? 'red' : 'black'}`, width: '100%' }}
                onChangeText={setProbOrtopedicoResp}
                value={probOrtopedicoResp}
                placeholder={t('sorting.anamneseDidOrthProbWhich')}
                errorMessage={probOrtopedico && !probOrtopedicoResp ? t('createAccount.requiredField') : null}
              /> : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>{t('sorting.anamneseChronicIll')}</Text>
            <RadioButton
              isChecked={doencaCronica}
              onPress={() => { setDoencaCronica(!doencaCronica) }}
              size={16}
              label={t('sorting.anamneseChronicIllLabel')}
              horizontal
            ></RadioButton>
          </View>
          {
            doencaCronica ?
              <Input
                style={{ borderColor: `${doencaCronica && !doencaCronicaResp ? 'red' : 'black'}`, width: '100%' }}
                onChangeText={setDoencaCronicaResp}
                value={doencaCronicaResp}
                placeholder={t('sorting.anamneseChronicIllWhich')}
                errorMessage={doencaCronica && !doencaCronicaResp ? t('createAccount.requiredField') : null}
              />
              : null
          }
        </View>

        <View>
          <View style={styles.anamneseAlignRadioButtons}>
            <Text>{t('sorting.anamneseInjuries')}</Text>
            <RadioButton
              isChecked={lesoes}
              onPress={() => { setLesoes(!lesoes) }}
              size={16}
              label={t('sorting.anamneseInjuriesLabel')}
              horizontal
            ></RadioButton>
          </View>
          {
            lesoes ?
              <Input
                style={{ borderColor: `${lesoes && !lesoesResp ? 'red' : 'black'}`, width: '100%' }}
                onChangeText={setLesoesResp}
                value={lesoesResp}
                placeholder={t('sorting.anamneseInjuriesWhich')}
                errorMessage={lesoes && !lesoesResp ? t('createAccount.requiredField') : null}
              /> : null
          }
        </View>

        <View>
          <Text style={styles.observations}>{'Observações: '}</Text>
          <Input
            style={styles.inputes}
            onChangeText={setComentario}
            value={comentario}
            placeholder={t('sorting.anamneseComments2')}
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
    </ScrollView >
  )
}