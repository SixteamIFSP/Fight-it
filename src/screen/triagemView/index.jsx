import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { convertDateToBrString } from "../../utils/dateConvert";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'
import { useTranslation } from "react-i18next";

export function TriagemView({ route, route:{params}}) {
    const { studantId } = params;
    const [dadosTriagem, setDadosTriagem] = useState(null)
    const { t } = useTranslation();

    useEffect(() => {
        //route.params?.studentId. Enquanto não temos triagem criada com o ID do aluno, colocamos id
        getTriagem(studantId).then(response => {
            if (response) {
                setDadosTriagem(response[0]);
            }
        })
    }, [])

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>{
            !dadosTriagem ? 
            <Container>
                <TextTitle>{t('triagemView.lastSorting')}</TextTitle>
                <TextQuestion>{t('triagemView.studentNoSorting')} </TextQuestion>
            </Container>
            :
            <Container>
                <TextTitle>{t('triagemView.lastSorting2')}</TextTitle>

                <TextQuestion>{t('triagemView.height')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Altura}</TextAnswer>

                <TextQuestion>{t('triagemView.weight')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Peso}</TextAnswer>

                <TextQuestion>{t('triagemView.injuries')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Lesoes !== "0" ? (t('triagemView.sortingYes')) :(t('triagemView.sortingNo'))}. {dadosTriagem.Lesoes === '0' ? '' : dadosTriagem.Lesoes}</TextAnswer>

                <TextQuestion>{t('triagemView.orthopedicProblems')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Problema_Ortopedico !== "0" ? (t('triagemView.sortingYes')) : (t('triagemView.sortingNo'))}. {dadosTriagem.Problema_Ortopedico === '0' ? '' : dadosTriagem.Problema_Ortopedico}</TextAnswer>

                <TextQuestion>{t('triagemView.chronicIllness')} </TextQuestion>
                <TextAnswer> {dadosTriagem?.Doencas_Cronicas !== "0" ? (t('triagemView.sortingYes')) : (t('triagemView.sortingNo'))}. {dadosTriagem.Doencas_Cronicas === '0' ? '' : dadosTriagem.Doencas_Cronicas}</TextAnswer>

                <TextQuestion>{t('triagemView.comments')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.comentario || (t('triagemView.noComments'))}</TextAnswer>

            </Container>
        }
        </ScrollView>
    )
}