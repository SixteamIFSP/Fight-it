import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { adicionarAluno, adicionarAula, getAllDataClass , removeAula } from "../../controler/class";
import { Loading } from "../../components/loading";
import { toastMessage } from "../../utils/toastMessage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import {
    Container,
    ContainerListColumn,
    ContainerList,
    ContentListagem,
    AddContainer,
    ContainerFlat,
    TextDescription,
    TextTouchable,
    ClassText,
    AdicionarAulaContainer,
    AdicionarAulaButton,
    DeleteButton,
    RenderAulaContainer,
    Equipamento,
    TextWhite,
    CancelarAula,
    AddContainerView,
    styles,
    Divisor,
    ClassDateContainer,
    AddEquipamentContainer,
    ContainerHeader
} from "./styles";
import Divider from 'react-native-divider';
import { useModal } from "../../hooks/modalConfirmation";
import { useIsFocused } from "@react-navigation/native";
 import { deleteTurma } from '../../controler/class';
import { LessonView } from "../LessonView";
import { useUser } from "../../hooks/user";
import { AdicionarAluno } from "../../components/addAuno";
import { EditTurma } from "../../components/editTurma";


function AdicionarAula({ turmaId, setback }) {
    const [topicoAula, setTopicoAula] = useState('')
    const [descricao, setDescricao] = useState('')
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [equipamentos, setEquipamentos] = useState([])
    const [selectectDateIsOpen, setSelectedDateIsOpen] = useState(false)
    const [selectTimeIsOpen, setSelectTimeIsOpen] = useState(false)
    const [equipamento, setEquipamento] = useState('')

    function handleBack() {
        setback()
    }
    function handleSubmit() {
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

        console.log(data);

        adicionarAula(data)
        setback();
    }

    return (
        <ScrollView>
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
        </ScrollView>
    )
}

const RenderListAluno = ({ item, navigation, data, student }) => {
    const { t } = useTranslation()
    function handleTouch() {
        if (student) return
        navigation.navigate(
            'StudantView',
            {
                ...data,
                studantId: item.id,
                nome: item.Nome,
                title: t("navigationHeader.StudentDescription", { name: item.Nome })
            });
    };

    return (
        <TextTouchable onPress={() => handleTouch()}>
            <Text>{item?.Nome}</Text>
        </TextTouchable>
    );
};


function RenderAula({ aula, onDeleteAula, onSelectAula, student, handleViewAula }) {

    return (
        <RenderAulaContainer onPress={() => {
            if(student) {
                handleViewAula()
                return 
            } 
            onSelectAula(aula.nome, aula.id)
            }}>
            <Text>{aula.nome}</Text>
            <CancelarAula
                onPress={() => onDeleteAula(aula)}>
                <TextWhite>Cancelar Aula</TextWhite>
            </CancelarAula>
        </RenderAulaContainer>
    )
}

export function ClassView({ navigation, route }) {
    const { t } = useTranslation();
    const { user } = useUser();
    const { Descricao, ProfessorId, Nome, id } = route.params.data;
    const student = user.tipoUsuario === 2;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [dateAula, setDateAula] = useState([]);
    const [aulaid, setAulaID] = useState()

    const [page, setPage] = useState(1);
    const { setCallback } = useModal();
    const isFocused = useIsFocused();

    function callBackDeleteTurma() {
        deleteTurma(id);
        navigation.goBack();
    }

    function handleOpenPage(pageNumber) {
        setPage(pageNumber)
    }

    function getData() {
        getAllDataClass(setDataAlunos, setDateAula, id);
    }

    function callback() {
        getData();
        handleOpenPage(1);
    }

    function onDeleteAula(aula) {
        const date = new Date();

        if (date > aula.data){
            toastMessage(false, "não é possivel cancelar esta aula")
            return
        }
        const novaLista = dateAula.filter(({id}) => id !==  aula.id);
        setDateAula(novaLista);
        removeAula(aula.id)
    }

    function onSelectAula(nometurma, aulaid) { 
        navigation.navigate('MaterialExtra', {title:'Upload do material extra', nometurma, aulaid});
    }
    
    function updateClass(){
        navigation.goBack();
    }

    useEffect(() => {
        if (!isFocused) return;
        function effect() {
            setCallback("Deseja apagar a turma?", () => callBackDeleteTurma());
            getData();
        };

        effect();
    }, [isFocused]);

    const pageView = {
        1:
            (<ContainerListColumn>
                <ContainerHeader>
                    <ClassText>{Descricao}</ClassText>

                    <TouchableOpacity onPress={() => handleOpenPage(5)}>
                        <FontAwesome name={'pencil'} size={30} color="black" />
                    </TouchableOpacity>

                </ContainerHeader>
                <ContainerList>
                    <ClassText>{t('classView.Student.Header')}</ClassText>
                    
                    <ContainerFlat>
                        {
                            dataAlunos.length >= 1 ?

                                <ContentListagem
                                    data={dataAlunos}
                                    renderItem={
                                        ({ item }) => <RenderListAluno
                                            item={item}
                                            navigation={navigation}
                                            data={
                                                { nomeTurma: Nome, id: id, ProfessorId: ProfessorId }
                                            }
                                            student={student}
                                        ></RenderListAluno>}
                                    keyExtractor={item => `${item.Nome}` + '91'}>
                                </ContentListagem>
                                :
                                <Text>{"Não há alunos nessa turma"}</Text>
                        }
                    </ContainerFlat>

                    {!student && <AddContainer>
                        <AddButton handle={() => handleOpenPage(2)} />
                    </AddContainer>}

                </ContainerList>
                <ContainerList>
                    {!student && <AddContainer>
                        <AddButton handle={() => handleOpenPage(3)} />
                    </AddContainer>}
                    <ClassText>Aulas:</ClassText>
                    <ContainerFlat>
                        {
                            dateAula.length >= 1 ?
                                <ContentListagem
                                    data={dateAula}
                                    renderItem={
                                        ({ item }) => <RenderAula handleViewAula={(aulaid) => {
                                            setAulaID(aulaid)
                                            handleOpenPage(4)
                                        }} aula={item} onDeleteAula={onDeleteAula} onSelectAula={onSelectAula} student={student} />
                                    }
                                    keyExtractor={item => `${item.id}-${item.nome}-dataAula`}>
                                </ContentListagem>
                                :
                                <Text>{"Não há alunos nessa turma"}</Text>
                        }
                    </ContainerFlat>
                </ContainerList>
            </ContainerListColumn>),
        2: <AdicionarAluno setback={callback} turmaId={id}></AdicionarAluno>,
        3: <AdicionarAula turmaId={id} setback={callback} />,
        4: <LessonView navigation={navigation} aulaid={aulaid} onBack={() => handleOpenPage(1)} />,
        5: <EditTurma navigation={navigation} turmaId={id} setback={()=>callback()}></EditTurma>
        
    }

    return (
        <Container>

            {pageView[page]}
            {/*grafico */}
        </Container>
    );
}