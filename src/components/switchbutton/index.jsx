import React from "react";
import { SwitchForm, SwitchText } from "./styles";

export function SwitchButton({text, onPress, type}){

    return (
        <SwitchForm onPress={()=> onPress()}>
            <SwitchText change={type}>{text}</SwitchText>
        </SwitchForm>     
    )
}