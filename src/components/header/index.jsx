import React from "react";
import { Image, View, Text} from "react-native";
import logo from "../../../assets/logo_black.png"
import { Container } from "./styles";

export function Header({props}){
    return (
        <Container>
            <Image source={logo} width={1} height = {1} style={{width:85, height:85}}/>
                         
            <Text style={{height:"100%", zIndex: 2, fontSize:24, textAlignVertical:'center',}}>{props.options.title}</Text>
        </Container>
    )
}