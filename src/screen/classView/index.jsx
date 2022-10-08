import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { adicionarAluno, adicionarAula, getAllDataClass, getAlunosTurma, removeAula } from "../../controler/class";
import { Loading } from "../../components/loading";
import { toastMessage } from "../../utils/toastMessage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

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
    AddEquipamentContainer
} from "./styles";
import Divider from 'react-native-divider';
import { useModal } from "../../hooks/modalConfirmation";
import { useIsFocused } from "@react-navigation/native";
// import { deleteTurma } from '../../controler/class';
import { LessonView } from "../LessonView";
import { useUser } from "../../hooks/user";


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
        const data = {
            topicoAula,
            descricao,
            date: date.toLocaleDateString(),
            time: time.toLocaleTimeString(),
            equipamentos
        }
        adicionarAula(data)
        setback();
    }

    useEffect(() => {
    }, [])

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
                handleConfirm={handleSubmit
                }></DoubleButtonConfirmation>
        </AdicionarAulaContainer>
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
function AdicionarAluno({ turmaId, setback }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState('');

    function handleBack() {
        setback()
    }
    async function handleSubmit() {
        if (mail === '' || mail.indexOf("@") === -1) {
            toastMessage(false, t("toast.error.invalid.email"));
            setback(false);

            return
        };
        setLoading(true)
        const data = {
            email: mail,
            turmaId: turmaId,
        };
        await adicionarAluno(data);
        setLoading(false)
        setback(false);
    };

    return (
        <AddContainerView>
            <Divider
                borderColor="#000"
                color="#000"
                orientation="center"
            >{t('addStudentClass.Header')}
            </Divider>
            <Input
                style={{ marginTop: 20 }}
                value={mail}
                placeholder={t("addStudentClass.Placeholder.mail")}
                keyboardType="email-address"
                onChangeText={setMail}
            />
            {
                !loading ?
                    <DoubleButtonConfirmation
                        handleBack={handleBack}
                        handleConfirm={handleSubmit
                        }
                    />
                    :
                    <Loading loading={loading} size={18} />
            }
        </AddContainerView>
    )
};



function RenderAula({ aula, handleViewAula, onDeleteAula, student }) {

    return (
        <RenderAulaContainer>
            <Text>{aula.nome}</Text>
            {!student && <CancelarAula
                onPress={() => onDeleteAula(aula.id)}>
                <TextWhite>Cancelar Aula</TextWhite>
            </CancelarAula>}
            {student && <CancelarAula
                onPress={() => handleViewAula(aula.id)}>
                <TextWhite>Visualizar Aula</TextWhite>
            </CancelarAula>}
        </RenderAulaContainer>
    )
}

export function ClassView({ navigation, route }) {
    const { t } = useTranslation();
    const { user } = useUser();
    const { Descricao, ProfessorId, Nome, id, data} = route.params.data;
    const student = user.tipoUsuario === 2;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [dateAula, setDateAula] = useState([]);
    const [aulaid, setAulaID] = useState()

    const [page, setPage] = useState(1);
    const { setCallback } = useModal();
    const isFocused = useIsFocused();

    function callBackDeleteTurma() {
        //deleteTurma(id);
        navigation.goBack();
    }

    function handleOpenPage(pageNumber) {
        setPage(pageNumber)
    }

    function getData() {
        getAllDataClass(setDataAlunos, setDateAula, id);
    }

    function callback() {
        getData()
        handleOpenPage(1);
    }


    function onDeleteAula(aulaID) {
        if (student) return
        removeAula(aulaID).then(() => {
            const index = dateAula.findIndex(e => e.id = aulaID)
            const data = dateAula
            data.splice(index, 1)
            setDateAula([...data])
        })
    }

    useEffect(() => {
        if (page === 1) {
            if (route?.params?.student) {
                //TODO: DEVE EXISTIR UM MÉTODO PARA BUSCAR TURMA PELO ID DO ALUNO
                getAlunosTurma(setDataAlunos, 10);
            } else {
                getAlunosTurma(setDataAlunos, data?.id);
            }
        }
        if (!isFocused) return;
        function effect() {
            setCallback("Deseja apagar a turma?", () => callBackDeleteTurma());
            //getAlunosTurma(setDataAlunos, id);
            getData();
        };

        effect();
        //
    }, []);

    const pageView = {
        1:
            <ContainerListColumn>
                <ContainerList>
                    <ClassText>{t('classView.Student.Header')}</ClassText>
                    <ClassText>{Descricao}</ClassText>
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
                                        }} aula={item} onDeleteAula={onDeleteAula} student={student} />
                                    }
                                    keyExtractor={item => item.nome + '91'}>
                                </ContentListagem>
                                :
                                <Text>{"Não há alunos nessa turma"}</Text>
                        }
                    </ContainerFlat>
                </ContainerList>
            </ContainerListColumn>,
        2: <AdicionarAluno setback={callback} turmaId={id}></AdicionarAluno>,
        3: <AdicionarAula turmaId={id} setback={callback} />,
        4: <LessonView aulaid={aulaid} onBack={() => handleOpenPage(1)} />
    }

    return (
        <Container>

            {pageView[page]}
            {/*grafico */}
        </Container>
    );
}