import React, { useEffect, useState } from "react";
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
    ClassText,
    AddContainerView,
} from "./styles";


const RenderListAluno = ({ item, navigation, data }) => {



    function handleTouch() {
        navigation.navigate(
            'StudantView',
            {
                ...data,
                studantId: item.id,
                nome: item.Nome,
                title: "Aluno: " + item.Nome
            })
    };

    return (
        <TextTouchable onPress={() => handleTouch()}>
            <Text>{item?.Nome}</Text>
        </TextTouchable>
    )
}

function AdicionarAluno({ turmaId, setback }) {
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState('');

    function handleBack() {
        setback(false)
    }
    async function handleSubmit() {

        if (mail === '' || mail.indexOf("@")===-1) {
            toastMessage(false, 'Digite um email valido');
            setback(false);
            return
        }
        setLoading(true)

        const data = {
            email: mail,
            turmaId: turmaId,
        }

        await adicionarAluno(data);

        setLoading(false)
        setback(false);

    }


    return (
        <AddContainerView>
            <TextDescription>ADICIONAR ALUNO</TextDescription>
            <Input
                value={mail}
                placeholder={'Digite o e-mail do aluno'}
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
                 <Loading  loading={loading} size={18}/>
            }

               
        </AddContainerView>
    )

}

export function ClassView({ navigation, route }) {
    const { Descricao, ProfessorId, Nome, id } = route.params.data;
    const [dataAlunos, setDataAlunos] = useState([]);
    const [adicionarAluno, setAdicionarAluno] = useState(false);

    function HandleChangeAddAluno() {
        setAdicionarAluno((value) => !value)
    }

    function HandleChangeAddAula() {
        setAdicionarAluno(value => !value)
    }

    useEffect(() => {
        if (!adicionarAluno) {
            getAlunosTurma(setDataAlunos, id);
        }
    }, [adicionarAluno]);

    return (
        <Container>
            {
                adicionarAluno ? <AdicionarAluno setback={setAdicionarAluno} turmaId={id}></AdicionarAluno>
                :
                <ContainerListColumn>
                    <ContainerList>
                        <Text>Listagem De alunos:</Text>
                        <ContainerFlat>

                        <ContentListagem
                            data={dataAlunos}
                            renderItem={({item})=> <RenderListAluno item={item} navigation={navigation} data={{nomeTurma:Nome, id:id, ProfessorId:ProfessorId} }></RenderListAluno>}
                            keyExtractor={item => `${item.Nome}`+'91'}>

                        </ContentListagem> 
                        </ContainerFlat>
                        
                        <AddContainer>
                            <AddButton handle={()=>HandleChangeAddAluno()}/>
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