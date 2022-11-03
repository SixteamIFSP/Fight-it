import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { AddButton } from "../../components/addButton";
import { getAllDataClass, removeAula } from "../../controler/class";
import { toastMessage } from "../../utils/toastMessage";
import { FontAwesome } from '@expo/vector-icons';

import {
    Container,
    ContainerListColumn,
    ContainerList,
    ContentListagem,
    AddContainer,
    ContainerFlat,
    TextTouchable,
    ClassText,
    RenderAulaContainer,
    TextWhite,
    CancelarAula,
    ContainerHeader
} from "./styles";
import { useModal } from "../../hooks/modalConfirmation";
import { useIsFocused } from "@react-navigation/native";
import { deleteTurma } from '../../controler/class';
import { LessonView } from "../LessonView";
import { useUser } from "../../hooks/user";
import { AdicionarAluno } from "../../components/addAluno";
import { EditTurma } from "../../components/editTurma";
import { AdicionarAula } from "../../components/addAula";
import { t } from "i18next";

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

function RenderAula({navigation, aula }) {
    //console.log(item);

    const { user } = useUser(); 

    function handleTouch() {
        if (user.tipoUsuario === 2) return
        navigation.navigate(
            'LessonView',
            {
                aula,
                title: aula.nome
            });
    };

    return (
        <RenderAulaContainer >
            <Text>{aula.nome}</Text>
            <View style={{flexDirection: 'row'}}>
            {/* <CancelarAula
                onPress={handleTouch}>
                <TextWhite>Visualizar Aula</TextWhite>
            </CancelarAula> */}
            {/* <CancelarAula
                onPress={() => onDeleteAula(aula)}>
                <TextWhite>{t("classView.classCancel")}</TextWhite>
            </CancelarAula> */}
            </View>
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
        setPage(pageNumber);
    }

    function getData() {
        getAllDataClass(setDataAlunos, setDateAula, id);
    }

    function callback() {
        getData();
        handleOpenPage(1);
    }

    function changeFluxo(id) {
        handleOpenPage(id);
    }

    function onDeleteAula(aula) {
        const date = new Date();

        if (date > aula.data){
            toastMessage(false, t('classView.toastItisNotPossibleCancelClass'))
            return
        }
        const novaLista = dateAula.filter(({ id }) => id !== aula.id);
        setDateAula(novaLista);
        removeAula(aula.id)
    }

    function onSelectAula(nometurma, aulaid) { 
        navigation.navigate('MaterialExtra', {title:(t('classView.uploadExtraMaterial')), nometurma, aulaid});
    }
    
    async function ViewLession(idAula){
        setAulaID(idAula);
        handleOpenPage(4);
    }

    useEffect(() => {
        if (!isFocused) return;
        function effect() {
            setCallback(t('classView.deleteClass'), () => callBackDeleteTurma());
            getData();
        };

        effect();
    }, [isFocused]);

    const pageView = {
        1:
            (<ContainerListColumn>
                <ContainerHeader>
                    <ClassText>{t('classView.description')}</ClassText>

                    <TouchableOpacity style={{alignItems:"center"}} onPress={() => handleOpenPage(5)}>
                        <FontAwesome name={'pencil'} size={26} color="black" />
                        <Text>{t('classView.edit')}</Text>
                    </TouchableOpacity>

                </ContainerHeader>
                <ContainerList style={{
                    shadowColor: "#4e575a",
                    shadowOffset: {
                        width: 2,
                        height: 6,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,
                    elevation: 18,
                }}>
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
                                <Text>{t('classView.thereAreNoStudents2')}</Text>
                        }
                    </ContainerFlat>

                    {
                        !student && <AddContainer>
                            <AddButton handle={() => handleOpenPage(2)} />
                        </AddContainer>
                    }

                </ContainerList>
                <ContainerList
                    style={{
                        shadowColor: "#4e575a",
                        shadowOffset: {
                            width: 2,
                            height: 2,
                        },
                        shadowOpacity: 0.28,
                        shadowRadius: 11.95,
                        elevation: 5,
                    }}>
                    {!student && <AddContainer>
                        <AddButton handle={() => handleOpenPage(3)} />
                    </AddContainer>}
                    <ClassText>{t('classView.classes')}</ClassText>
                    <ContainerFlat>
                        {
                            dateAula.length >= 1 ?
                                <ContentListagem
                                    data={dateAula}
                                    renderItem={
                                        ({ item }) => <RenderAula 
                                        navigation={navigation}
                                        handle={() => ViewLession()}
                                        aula={item}
                                        //onDeleteAula={onDeleteAula}
                                        //onSelectAula={onSelectAula}
                                        student={student} />
                                    }
                                    keyExtractor={item => `${item.id}-${item.nome}-dataAula`}>
                                </ContentListagem>
                                :
                                <Text>{t('classView.thereAreNoStudents2')}</Text>
                        }
                    </ContainerFlat>
                </ContainerList>
            </ContainerListColumn>),
        2: <AdicionarAluno setback={callback} turmaId={id}></AdicionarAluno>,
        3: <AdicionarAula turmaId={id} setback={callback} />,
        //4: <LessonView navigation={navigation} aulaid={aulaid} onBack={() => callback()} />,
        5: <EditTurma navigation={navigation} turmaId={id} setback={()=>callback()}></EditTurma>
        
    }

    return (
        <Container>
            {pageView[page]}
        </Container>
    );
}