import React from "react";
import { Text, View } from "react-native";
import { removeAula } from "../../controler/class";
import { useModal } from "../../hooks/modalConfirmation";
import { useUser } from "../../hooks/user";
import { convertDateToBrString, convertDateToTimeString } from "../../utils/dateConvert";
import { Button } from "../button";
import { ButtonsContainer, Container, InfoContainer } from "./styles";

export function CardAula({item}){
    const user = useUser();
    const { changeModal, setCallback } = useModal();
    

    function handle(){
        callModal();
        changeModal();
    }

    function callModal(){
        setCallback("Apagar aula?", ()=>removeAula(item.id))
    }

    return (
        <Container>
            <InfoContainer>
                <Text>{item.nome}</Text>
                <Text>{convertDateToBrString(new Date(item.data))}</Text>
                <Text>{convertDateToTimeString(new Date(item.data))}</Text>

            </InfoContainer>
            <ButtonsContainer>
                {
                    user.tipoUsuario ===1 ?
                        <Button handle={handle} text="Apagar"></Button>
                    :
                        <></>
                }
            </ButtonsContainer>
        </Container>
    )
}