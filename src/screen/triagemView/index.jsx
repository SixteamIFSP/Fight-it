import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getTriagem } from "../../controler/triagem";
import {Container, TextAnswer,TextQuestion,TextTitle} from './style'




export function TriagemView({route}) {
    const [triagem, setTriagem] = useState({
        id: '',
        Data_Nascimento: '',
        Altura: '',
        Peso: '',
        Problema_Ortopedico: '',
        Doencas_Cronicas: '',
        Lesoes: '',
       })  

    useEffect(() => {
        //route.params?.studentId. Enquanto não temos triagem criada com o ID do aluno, colocamos id
       getTriagem(5).then(response => {
       if(response)  {
         setTriagem({...response[0], Data_Nascimento:`${response[0].Data_Nascimento.slice(2,10).replace(/[-]/g, '/')}`})
       }
       })
    }, [])

    return (
        <Container>
             <TextTitle>Última triagem</TextTitle>

            <ScrollView style={{flex: 1, padding: 10}}>
            <TextQuestion>Altura: </TextQuestion>
             <TextAnswer>{triagem.Altura}</TextAnswer>
             
             <TextQuestion>Peso: </TextQuestion>
             <TextAnswer>{triagem.Altura}</TextAnswer>
             
             <TextQuestion>Data de nascimento: </TextQuestion>
             <TextAnswer>{triagem.Data_Nascimento}</TextAnswer>
             
             <TextQuestion>Alguma lesão?: </TextQuestion>
             <TextAnswer>{triagem.Lesoes}</TextAnswer>

             <TextQuestion>Algum problema ortopédico?: </TextQuestion>
             <TextAnswer>{triagem.Problema_Ortopedico}</TextAnswer>
             
             <TextQuestion>Alguma doença crónica?: </TextQuestion>
             <TextAnswer> {triagem.Doencas_Cronicas}</TextAnswer>
            </ScrollView>
        </Container>
    )
}