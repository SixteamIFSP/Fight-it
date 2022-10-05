import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route }) {
    const [dadosTriagem, setDadosTriagem] = useState({
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
            if (response) {
                setDadosTriagem(response)
            }
        }).catch(e => {
            setTheresTriagem(false)
        })
    }, [])

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <Container>
                <TextTitle>Última triagem</TextTitle>

                <TextQuestion>Objetivo: </TextQuestion>
                <TextAnswer>{dadosTriagem.altura}</TextAnswer>

                <TextQuestion>Altura: </TextQuestion>
                <TextAnswer>{dadosTriagem.altura}</TextAnswer>

                <TextQuestion>Peso: </TextQuestion>
                <TextAnswer>{dadosTriagem.peso}</TextAnswer>

                <TextQuestion>Data de nascimento: </TextQuestion>
                <TextAnswer>{dadosTriagem.dataNascimento}</TextAnswer>

                <TextQuestion>Alguma lesão?: </TextQuestion>
                <TextAnswer>{dadosTriagem.lesoes ? 'Sim' : 'Não'}. {dadosTriagem.lesoesResposta}</TextAnswer>

                <TextQuestion>Algum problema ortopédico?: </TextQuestion>
                <TextAnswer>{dadosTriagem.problemaOrtopedico ? 'Sim' : 'Não'}. {dadosTriagem.lesoesResposta}</TextAnswer>

                <TextQuestion>Alguma doença crónica?: </TextQuestion>
                <TextAnswer> {dadosTriagem.doencasCronicas ? 'Sim' : 'Não'}. {dadosTriagem.doencasCronicasResposta}</TextAnswer>


                <TextQuestion>Já fez exercícios?: </TextQuestion>
                <TextAnswer> {dadosTriagem.jaFezExercicios ? 'Sim' : 'Não'}. {dadosTriagem.jaFezExerciciosResposta}</TextAnswer>

                <TextQuestion>Comentário: </TextQuestion>
                <TextAnswer>{dadosTriagem.comentario}</TextAnswer>

            </Container>
        </ScrollView>
    )
}