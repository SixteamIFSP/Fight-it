
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { convertDateToBrString } from "../../utils/dateConvert";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route, route:{params}}) {
    const { t } = useTranslation();
    const { studantId } = params;
    const [dadosTriagem, setDadosTriagem] = useState(null)

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
                <TextTitle>{t('sortingView.title')}</TextTitle>
                <TextQuestion>{t("sortingView.question")}</TextQuestion>
            </Container>
            :
            <Container>

                <TextQuestion>{t("sortingView.height")}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Altura}</TextAnswer>

                <TextQuestion>{t("sortingView.weight")}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Peso}</TextAnswer>

                <TextQuestion>{t("sortingView.anamneseInjuries")} </TextQuestion>
                <TextAnswer>{dadosTriagem.Lesoes === '0' ? '' : dadosTriagem.Lesoes}</TextAnswer>

                <TextQuestion>{t("sortingView.anamneseDidOrthProbLabel")} </TextQuestion>
                <TextAnswer>{dadosTriagem.Problema_Ortopedico === '0' ? '' : dadosTriagem.Problema_Ortopedico}</TextAnswer>

                <TextQuestion>{t("sortingView.anamneseInjuries")} </TextQuestion>
                <TextAnswer> {dadosTriagem.Doencas_Cronicas === '0' ? '' : dadosTriagem.Doencas_Cronicas}</TextAnswer>

                <TextQuestion>{t("sortingView.anamneseComments1")}</TextQuestion>
                <TextAnswer>{dadosTriagem?.comentario || t("sortingView.noComments")}</TextAnswer>

            </Container>
        }
        </ScrollView>
    )
}