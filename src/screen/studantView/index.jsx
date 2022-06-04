import React from "react";
import { Container, ContainerButtons, ContainerDesempenho, ContentButtons, DesempenhoHeader, TextButtons } from "./styles";

export function StudantView({navigation, route}){


    function handleTriagem(){

    }

    function handleEvaluation(){

        navigation.navigate('EvaluationStudent', {...route?.params, title:'Avaliação: '+route?.params.nome})
    }

    return(
        <Container>
            <ContainerButtons>
                <ContentButtons onPress={()=>handleTriagem()}>
                <TextButtons>Visualizar Triagem</TextButtons>
                </ContentButtons>

                <ContentButtons  onPress={()=>handleEvaluation()}>
                <TextButtons>Avaliar Aluno</TextButtons>
                </ContentButtons>
            </ContainerButtons>
            
            <ContainerDesempenho>
                <DesempenhoHeader>DESEMPENHO</DesempenhoHeader>

                {/* Tabela de aluno */}
            </ContainerDesempenho>


        </Container>
    )
}