import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { convertDateToBrString } from "../../utils/dateConvert";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route, route:{params}}) {
    const { studantId } = params;
    
    const [dadosTriagem, setDadosTriagem] = useState({
        objetivo: '',
        Data_Nascimento: '',
        Altura: '',
        Peso: '',
        Problema_Ortopedico: "0",
        Doencas_Cronicas: "0",
        Lesoes: "0",
        comentario: ''
    })
    const [theresTriagem, setTheresTriagem] = useState(true)

    useEffect(() => {
        //route.params?.studentId. Enquanto não temos triagem criada com o ID do aluno, colocamos id
        getTriagem(studantId).then(response => {
            if (response) {
                console.log(response);
                setDadosTriagem(response[0]);
            }
        }).catch(e => {
            setTheresTriagem(false)
        })
    }, [])

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <Container>
                <TextTitle>Última triagem</TextTitle>

                <TextQuestion>Altura: </TextQuestion>
                <TextAnswer>{dadosTriagem?.Altura}</TextAnswer>

                <TextQuestion>Peso: </TextQuestion>
                <TextAnswer>{dadosTriagem?.Peso}</TextAnswer>

                <TextQuestion>Alguma lesão?: </TextQuestion>
                <TextAnswer>{dadosTriagem?.Lesoes !== "0" ? 'Sim' : 'Não'}. {dadosTriagem.Lesoes === '0' ? '' : dadosTriagem.Lesoes}</TextAnswer>

                <TextQuestion>Algum problema ortopédico?: </TextQuestion>
                <TextAnswer>{dadosTriagem?.Problema_Ortopedico !== "0" ? 'Sim' : 'Não'}. {dadosTriagem.Problema_Ortopedico === '0' ? '' : dadosTriagem.Problema_Ortopedico}</TextAnswer>

                <TextQuestion>Alguma doença crónica?: </TextQuestion>
                <TextAnswer> {dadosTriagem?.Doencas_Cronicas !== "0" ? 'Sim' : 'Não'}. {dadosTriagem.Doencas_Cronicas === '0' ? '' : dadosTriagem.Doencas_Cronicas}</TextAnswer>

                <TextQuestion>Comentário: </TextQuestion>
                <TextAnswer>{dadosTriagem?.comentario}</TextAnswer>

            </Container>
        </ScrollView>
    )
}