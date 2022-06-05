import React, { useEffect, useState } from "react";
import { Text, View, } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
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
    const [mail, setMail] = useState('');

    function handleBack() {
        setback(false)
    }
    function handleSubmit() {

        if (mail === '') {
            toastMessage(false, 'Digite um email');
            setback(false);
            return
        }

        const data = {
            email: mail,
            turmaId: turmaId,
        }

   
        adicionarAluno(data);
        setback(false);

    }


    return (
        <View>
            <TextDescription>Adicionar Aluno</TextDescription>
            <Input
                value={mail}
                placeholder={'Digite o e-mail do aluno'}
                onChangeText={setMail}
            />
            <DoubleButtonConfirmation
                handleBack={handleBack}
                handleConfirm={handleSubmit
                }></DoubleButtonConfirmation>
        </View>
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
                <ContainerListRow>
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

                    
                </ContainerListRow>
            }


            {/*grafico */}

        </Container>
    );
}