import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { Loading } from "../../components/loading";
import { adicionarAluno, getAlunosTurma } from "../../controler/class";
import { toastMessage } from "../../util/toastMessage";
import {
    Container,
    ContainerListColumn,
    ContainerList,
    ContentListagem,
    AddContainer,
    ContainerFlat,
    TextDescription,
    TextTouchable,
    AddContainerView,
} from "./styles";
import Divider from 'react-native-divider';

const RenderListAluno = ({ item, navigation, data }) => {
    const { t } = useTranslation()
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
        setback(false)
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
                style={{ marginTop: 20}}
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
}

export function ClassView({ navigation, route }) {
    const { t } = useTranslation();
    const { Descricao, ProfessorId, Nome, id } = route.params.data;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [adicionarAluno, setAdicionarAluno] = useState(false);

    function HandleChangeAddAluno() {
        setAdicionarAluno((value) => !value)
    };

    useEffect(() => {
        if (!adicionarAluno) {
            getAlunosTurma(setDataAlunos, id);
        };
    }, [adicionarAluno]);

    return (
        <Container>
            {
                adicionarAluno ?
                    <AdicionarAluno
                        setback={setAdicionarAluno}
                        turmaId={id}
                    ></AdicionarAluno>
                    :
                    <ContainerListColumn>
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
                                <AddButton handle={() => HandleChangeAddAluno()} />
                            </AddContainer>

                        </ContainerList>
                        {/* <ContainerList>
                    <Text>Listagem De aulas:</Text>
                        <ContainerFlat>

                        <ContentListagem
                            data={dataAlunos}
                            renderItem={({item})=> <RenderListAluno item={item}></RenderListAluno>}
                            keyExtractor={item => item.Nome+'91'}>

                        </ContentListagem> 
                        </ContainerFlat>
                        
                        <AddContainer>

                            <AddButton handle={()=>null}/>
                        </AddContainer>
                        
                    </ContainerList> */}
                    </ContainerListColumn>
            }
            {/*grafico */}
        </Container>
    );
}