import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getTriagem } from "../../controler/triagem";
import {Container, TextAnswer,TextQuestion,TextTitle} from './style'




export function TriagemView({route}) {
    const [triagem, setTriagem] = useState({
        objetivo: '', 
        dataNascimento: '', 
        altura: '', 
        peso: '', 
        problemaOrtopedico: false,
        problemaOrtopedicoResposta: '', 
        doencasCronicas: false,
        doencasCronicasResposta: '',
        lesoes: false, 
        lesoesResposta: '',
        jaFezExercicios: false, 
        jaFezExerciciosResposta: '', 
        comentario: ''
       })  
    const [theresTriagem, setTheresTriagem] = useState(true)

    useEffect(() => {
        //route.params?.studentId. Enquanto não temos triagem criada com o ID do aluno, colocamos id
       getTriagem(5).then(response => {
       if(response)  {
         setTriagem(response)
       }
       }).catch(e => {
        setTheresTriagem(false)
       })
    }, [])

    return (
        <ScrollView style={{flex: 1, padding: 10}}>
        <Container>
             <TextTitle>Última triagem</TextTitle>

          
            <TextQuestion>Objetivo: </TextQuestion>
             <TextAnswer>{triagem.altura}</TextAnswer>

             <TextQuestion>Altura: </TextQuestion>
             <TextAnswer>{triagem.altura}</TextAnswer>
             
             <TextQuestion>Peso: </TextQuestion>
             <TextAnswer>{triagem.peso}</TextAnswer>
             
             <TextQuestion>Data de nascimento: </TextQuestion>
             <TextAnswer>{triagem.dataNascimento}</TextAnswer>
             
             <TextQuestion>Alguma lesão?: </TextQuestion>
             <TextAnswer>{triagem.lesoes ? 'Sim' : 'Não'}. {triagem.lesoesResposta}</TextAnswer>

             <TextQuestion>Algum problema ortopédico?: </TextQuestion>
             <TextAnswer>{triagem.problemaOrtopedico ? 'Sim' : 'Não'}. {triagem.lesoesResposta}</TextAnswer>
             
             <TextQuestion>Alguma doença crónica?: </TextQuestion>
             <TextAnswer> {triagem.doencasCronicas ? 'Sim' : 'Não'}. {triagem.doencasCronicasResposta}</TextAnswer>

              
             <TextQuestion>Já fez exercícios?: </TextQuestion>
             <TextAnswer> {triagem.jaFezExercicios ? 'Sim' : 'Não'}. {triagem.jaFezExerciciosResposta}</TextAnswer>
             
             <TextQuestion>Comentário: </TextQuestion>
             <TextAnswer>{triagem.comentario}</TextAnswer>
        
        </Container>
        </ScrollView>
    )
}