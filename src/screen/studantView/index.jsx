import React from "react";
import {
    Container,
    ContainerButtons,
    ContainerDesempenho,
    ContentButtons,
    TextButtons
} from "./styles";
import Divider from 'react-native-divider';

export function StudantView({ navigation, route }) {

    function handleTriagem() {

    }

    function handleEvaluation() {

        navigation.navigate('EvaluationStudent', { ...route?.params, title: 'Avaliação: ' + route?.params.nome })
    }

    return (
        <Container>
            <ContainerButtons>
                <ContentButtons onPress={() => handleTriagem()}>
                    <TextButtons>Visualizar Triagem</TextButtons>
                </ContentButtons>

                <ContentButtons onPress={() => handleEvaluation()}>
                    <TextButtons>Avaliar Aluno</TextButtons>
                </ContentButtons>
            </ContainerButtons>

            <ContainerDesempenho>
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >
                    DESEMPENHO
                </Divider>

                {/* Tabela de aluno */}
            </ContainerDesempenho>


        </Container>
    )
}