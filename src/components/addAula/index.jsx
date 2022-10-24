import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { adicionarAula } from "../../controler/class";
import { toastMessage } from "../../utils/toastMessage";
import { Input } from "../input";
import { AddEquipamentContainer, AdicionarAulaButton, AdicionarAulaContainer, ClassDateContainer, TextDescription, TextWhite } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { DoubleButtonConfirmation } from "../doubleButtonConfirmation";

export function AdicionarAula({ turmaId, setback }) {
    const [topicoAula, setTopicoAula] = useState('')
    const [descricao, setDescricao] = useState('')
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [equipamentos, setEquipamentos] = useState([]);
    const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false);
    const [selectTimeIsOpen, setSelectTimeIsOpen] = useState(false);
    const [equipamento, setEquipamento] = useState('');

    function handleBack() {
        setback();
    }
    
    function handleSubmit() {
        if(turmaId===0){
            console.log("erro", turmaId);
            setback();
        }
        if (!topicoAula) {
            toastMessage(false, 'Digite um tópico de aula');
            return
        }

        let newDate = new Date(date);
        
        newDate.setHours(time.getHours());
        newDate.setMinutes(time.getMinutes());
        const data = {
            topico: topicoAula,
            descricao,
            data: newDate,
            turma: turmaId
        }

        adicionarAula(data)
        setback();
    }

    return (
        <AdicionarAulaContainer>
            <TextDescription>Adicionar aula</TextDescription>
            <Input
                style={{ marginBottom: 16 }}
                value={topicoAula}
                placeholder={'Tópico da aula'}
                onChangeText={setTopicoAula}
            />
            <ClassDateContainer>
                <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>Data da aula</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setSelectedDateIsOpen(true) }}>
                    <Text>{date.toLocaleDateString()}</Text>
                    <MaterialIcons style={{ fontSize: 16, marginLeft: 12 }} name="edit" size={40} color="#000" />
                </TouchableOpacity>
            </ClassDateContainer>

            <ClassDateContainer>
                <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>Horário da aula</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setSelectTimeIsOpen(true) }}>
                    <Text>{time.toLocaleTimeString()}</Text>
                    <MaterialIcons style={{ fontSize: 16, marginLeft: 12 }} name="edit" size={40} color="#000" />
                </TouchableOpacity>
            </ClassDateContainer>

            {
                selectectDateIsOpen && <DateTimePicker
                    themeVariant="dark"
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    format="DD-MM-YYYY"
                    minimumDate={new Date() - 1}
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
            {
                selectTimeIsOpen && < DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        if (date) {
                            setTime(date)
                        }
                        setSelectTimeIsOpen(false)
                    }}
                />
            }
            <Input
                style={{ marginBottom: 16 }}
                value={descricao}
                placeholder={'Descrição da aula'}
                onChangeText={setDescricao}
            />

            <TextDescription>Equipamentos</TextDescription>
            {/* SportsKabaddi */}
            {/* SportsMma */}
            <AddEquipamentContainer style={{ width: '100%' }}>
                <Input style={{ width: '70%', alignSelf: 'flex-start' }}
                    value={equipamento}
                    placeholder={'Nome do equipamento'}
                    onChangeText={setEquipamento}
                />
                <AdicionarAulaButton
                    disabled={!equipamento}
                    onPress={() => {
                        setEquipamentos(e => [...e, equipamento])
                    }}>
                    <TextWhite style={{ textAlign: 'center' }}>Adicionar</TextWhite>
                </AdicionarAulaButton>
            </AddEquipamentContainer>
            {
                equipamentos && equipamentos.length ?
                    <View>
                        <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>Equipamentos da aula:</Text>
                        <ScrollView style={{ marginTop: 10 }}>
                            {equipamentos.map((equipamento, index) => <Equipamento key={index}>
                                <Text>{equipamento}</Text>
                                <DeleteButton onPress={() => {
                                    const eqpm = equipamentos
                                    eqpm.splice(index, 1)
                                    setEquipamentos([...eqpm])
                                }}>
                                    <Text style={{ color: 'black' }}>X</Text>
                                </DeleteButton>
                            </Equipamento>)}
                        </ScrollView>
                    </View> : null
            }

            <DoubleButtonConfirmation style={{ alignSelf: 'flex-end' }}
                handleBack={handleBack}
                handleConfirm={handleSubmit}
            />
        </AdicionarAulaContainer>
    )
}