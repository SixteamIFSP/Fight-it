import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { adicionarAluno, adicionarAula, getAlunosTurma, removeAula } from "../../controler/class";
import { Loading } from "../../components/loading";
import { toastMessage } from "../../util/toastMessage";
import DateTimePicker from '@react-native-community/datetimepicker';


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
} from "./styles";
import Divider from 'react-native-divider';
import { useModal } from "../../hooks/modalConfirmation";
import { useIsFocused } from "@react-navigation/native";
import { deleteTurma } from '../../controler/class';

function RenderListAluno ({ item, navigation, data }) {
    const { t } = useTranslation();
    function handleTouch() {
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



function RenderAula({aula, onDeleteAula}) {
    console.log(aula)
    return (
        <RenderAulaContainer>
             <Text>{aula.Nome}</Text>
             <CancelarAula
             onPress={() => onDeleteAula(aula.id)}>
                <TextWhite>Cancelar aula</TextWhite>
            </CancelarAula>
        </RenderAulaContainer>
    )
}

export function ClassView({ navigation, route }) {
    const { t } = useTranslation();
    const { id, Nome, ProfessorId, Descricao } = route.params.data;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [adicionarAluno, setAdicionarAluno] = useState(false);

    function HandleChangeAddAluno() {
        setAdicionarAluno((value) => !value)
    };

    useEffect(() => {
        console.log(new Date().getHours())
        if (page === pageDefault) {
            getAlunosTurma(setDataAlunos, id);
        }
    }, []);

    return (
        <Container>
            {
                page === pageAddAluno && <AdicionarAluno setback={() => handleOpenPage(pageDefault)} turmaId={id}></AdicionarAluno>
            }
            {
                page === pageDefault &&  <ContainerListColumn>
                <ContainerList>
                    <Text>{t('classView.Student.Header')}</Text>
                    <ContainerFlat>
                        <ContentListagem
                            data={dataAlunos}
                            renderItem={
                                ({ item }) => <RenderListAluno
                                    item={item}
                                    navigation={navigation}
                                    data={
                                        { nomeTurma: Nome, id: id, ProfessorId: ProfessorId }
                                    }></RenderListAluno>}
                            keyExtractor={item => `${item.Nome}` + '91'}>
                        </ContentListagem>
                    </ContainerFlat>

                    <AddContainer>
                        <AddButton handle={() => handleOpenPage(pageAddAluno)} />
                    </AddContainer>

                </ContainerList>
                <ContainerList>
                    <AddContainer>
                        <AddButton handle={() => handleOpenPage(pageAddLesson)} />
                    </AddContainer>
                    <ClassText>Aulas:</ClassText>
                    <ContainerFlat>
                        <ContentListagem
                            data={dataAlunos}
                            renderItem={
                                ({ item }) => <RenderAula aula={item} onDeleteAula={onDeleteAula}/>
                            }
                            keyExtractor={item => item.Nome + '91'}>
                        </ContentListagem>
                    </ContainerFlat>
                </ContainerList>
            </ContainerListColumn>
       }
            {
                page === pageAddLesson && <AdicionarAula turmaId={id} setback={() => handleOpenPage(pageDefault)}/>
            }
            {/*grafico */}
        </Container>
    );
}