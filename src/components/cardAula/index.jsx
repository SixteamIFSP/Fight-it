import React from "react";
import { Text, View } from "react-native";
import { convertDateToBrString, convertDateToTimeString } from "../../utils/dateConvert";
import { Button } from "../button";
import { ButtonsContainer, Container, InfoContainer } from "./styles";

export function CardAula({item}){

    return (
        <Container>
            <InfoContainer>
                <Text>{item.nome}</Text>
                <Text>{convertDateToBrString(new Date(item.data))}</Text>
                <Text>{convertDateToTimeString(new Date(item.data))}</Text>

            </InfoContainer>
            <ButtonsContainer>
                <Button></Button>
                <Button></Button>
            </ButtonsContainer>

        </Container>


    )
}