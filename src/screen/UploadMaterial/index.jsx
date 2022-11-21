import { useEffect, useState } from "react"
import { View , Text , Image} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { ButtonContainer, Container, Descricao, NomeMaterial, Texto } from "./style";
import { Input } from "../../components/input";
import { toastMessage } from "../../utils/toastMessage";
import { justUploadImage } from "../../controler/image";
import { postMaterialExtra } from "../../controler/materialExtra";
import { AddMaterial } from "../../components/addMaterial";

export function UploadMaterial({ navigation, route }) { 
    return (
            <AddMaterial  aula={route?.params} goBack={()=>navigation.goBack()}></AddMaterial>
    )
}

export function UploadMaterialComponent({ aula, goBack }) { 
    return (
            <AddMaterial  aula={aula} goBack={goBack}></AddMaterial>
    )
}