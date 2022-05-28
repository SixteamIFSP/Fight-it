import React from "react";
import { Text } from "react-native";
import { Container, ContainerButtons, ContainerDesempenho, ContentButtons, DesempenhoHeader, TextButtons } from "./styles";

export function StudantView({navigation, route}){
    console.log(route?.params);


    function handleTriagem(){

    }

    function handleAvaliacao(){

    }

    return(
        <Container>
            <Text>Bomdia</Text>
            <ContainerButtons>
                <ContentButtons onPress={()=>handleTriagem()}>
                <TextButtons>Visualizar Triagem</TextButtons>
                </ContentButtons>

                <ContentButtons  onPress={()=>handleAvaliacao()}>
                <TextButtons>Avaliar Aluno</TextButtons>
                </ContentButtons>
            </ContainerButtons>
            
            <ContainerDesempenho>
                <DesempenhoHeader>DESEMPENHO</DesempenhoHeader>

                
            </ContainerDesempenho>


        </Container>
    )
}