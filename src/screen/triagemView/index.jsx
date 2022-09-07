import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getTriagem } from "../../controler/triagem";
import {Container, TextAnswer,TextQuestion,TextTitle} from './style'




export function TriagemView({route}) {
    const [triagem, setTriagem] = useState({
        dataNascimento: '20/10/2001',
        altura: '31',
        peso: '33',
        problemaOrtopedico: 'NenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhumaNenhuma',
        doencasCronicas: 'Nenhuma',
        lesoes: 'Nenhuma',
        alunoId: ''
       })  

    useEffect(() => {
       getTriagem(1).then(e => {
        console.log(e) 
       })
    }, [])

    return (
        <Container>
             <TextTitle>Última triagem do FULANO</TextTitle>

            <ScrollView style={{flex: 1, padding: 10}}>
            <TextQuestion>Altura: </TextQuestion>
             <TextAnswer>{triagem.altura}</TextAnswer>
             
             <TextQuestion>Peso: </TextQuestion>
             <TextAnswer>{triagem.peso}</TextAnswer>
             
             <TextQuestion>Data de nascimento: </TextQuestion>
             <TextAnswer>{triagem.dataNascimento}</TextAnswer>
             
             <TextQuestion>Alguma lesão?: </TextQuestion>
             <TextAnswer>{triagem.lesoes}</TextAnswer>

             <TextQuestion>Algum problema ortopédico?: </TextQuestion>
             <TextAnswer>{triagem.problemaOrtopedico}</TextAnswer>
             
             <TextQuestion>Alguma doença crónica?: </TextQuestion>
             <TextAnswer> {triagem.doencasCronicas}</TextAnswer>
            </ScrollView>
        </Container>
    )
}