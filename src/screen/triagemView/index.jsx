import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { convertDateToBrString } from "../../utils/dateConvert";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route, route:{params}}) {
    const { studantId } = params;
    const [dadosTriagem, setDadosTriagem] = useState(null)

    useEffect(() => {
        //route.params?.studentId. Enquanto não temos triagem criada com o ID do aluno, colocamos id
        getTriagem(studantId).then(response => {
            if (response) {
                console.log(response);


                setDadosTriagem(response[0]);
            }
        })
    }, [])

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>{
            !dadosTriagem ? 
            <Container>
                <TextTitle>Última triagem: 00-00-0000</TextTitle>
                <TextQuestion>Aluno não possui triagem. </TextQuestion>
            </Container>
            :
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
                <TextAnswer>{dadosTriagem?.comentario || 'Não há comentário'}</TextAnswer>

            </Container>
        }
        </ScrollView>
    )
}