import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { adicionarAula } from "../../controler/class";
import { toastMessage } from "../../utils/toastMessage";
import { Input } from "../input";
import { AddEquipamentContainer, AdicionarAulaButton, AdicionarAulaContainer, ClassDateContainer, DeleteButton, Equipamento, TextDescription, TextWhite } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { DoubleButtonConfirmation } from "../doubleButtonConfirmation";
import { useTranslation } from "react-i18next";
import { convertDateToBrString } from "../../utils/dateConvert";

export function AdicionarAula({ turmaId, setback }) {
    const { t } = useTranslation();
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
            toastMessage(false, t("addLession.messages.addTopic"));
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
            <TextDescription>{t("addLession.header")}</TextDescription>
            <Input
                style={{ marginBottom: 16 }}
                value={topicoAula}
                placeholder={t("addLession.placeholder.topic")}
                onChangeText={setTopicoAula}
            />
            <ClassDateContainer>
                <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>{t("addLession.placeholder.date")}</Text>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { setSelectedDateIsOpen(true) }}>
                    <Text>{convertDateToBrString(date)}</Text>
                    <MaterialIcons style={{ fontSize: 16, marginLeft: 12 }} name="edit" size={40} color="#000" />
                </TouchableOpacity>
            </ClassDateContainer>

            <ClassDateContainer>
                <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>{t("addLession.placeholder.time")}</Text>
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
                placeholder={t("addLession.placeholder.description")}
                onChangeText={setDescricao}
            />

            <TextDescription>{t("addLession.equipment.header")}</TextDescription>

            <AddEquipamentContainer style={{ width: '100%' }}>
                <Input style={{ width: '70%', alignSelf: 'flex-start' }}
                    value={equipamento}
                    placeholder={t("addLession.equipment.description")}
                    onChangeText={setEquipamento}
                />
                <AdicionarAulaButton
                    disabled={!equipamento}
                    onPress={() => {
                        setEquipamentos(e => [...e, equipamento])
                    }}>
                    <TextWhite style={{ textAlign: 'center' }}>{t("addLession.equipment.add")}</TextWhite>
                </AdicionarAulaButton>
            </AddEquipamentContainer>
            {/* {
                equipamentos && equipamentos.length ?
                    <View>
                        <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: '700' }}>{t("addLession.equipment.selected")}</Text>
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
            } */}

            <DoubleButtonConfirmation style={{ alignSelf: 'flex-end' }}
                handleBack={handleBack}
                handleConfirm={handleSubmit}
            />
        </AdicionarAulaContainer>
    )
}