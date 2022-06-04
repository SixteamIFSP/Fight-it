import React from "react";
import { Container, ContainerButtons, ContainerDesempenho, ContentButtons, DesempenhoHeader, TextButtons } from "./styles";
import { useTranslation } from 'react-i18next';

export function StudantView({navigation, route}){
    
    const { t } = useTranslation();
    function handleTriagem(){

    }

    function handleEvaluation(){

        navigation.navigate('EvaluationStudent', {...route?.params, title:'Avaliação: '+route?.params.nome})
    }

    return(
        <Container>
            <ContainerButtons>
                <ContentButtons onPress={()=>handleTriagem()}>
                <TextButtons>{t('Visualizar Triagem')}</TextButtons>
                </ContentButtons>

                <ContentButtons  onPress={()=>handleEvaluation()}>
                <TextButtons>{t('Avaliar Aluno')}</TextButtons>
                </ContentButtons>
            </ContainerButtons>
            
            <ContainerDesempenho>
                <DesempenhoHeader>{t('DESEMPENHO')}</DesempenhoHeader>

                {/* Tabela de aluno */}
            </ContainerDesempenho>


        </Container>
    )
}