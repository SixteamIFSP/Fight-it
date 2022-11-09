import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route, route:{params}}) {
    const { t } = useTranslation();
    const { studantId } = params;
    const [dadosTriagem, setDadosTriagem] = useState(null)

    useEffect(() => {
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
                <TextQuestion>{t('sortingView.question')}</TextQuestion>
            </Container>
            :
            <Container>

                <TextQuestion>{t('sortingView.height')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Altura}</TextAnswer>

                <TextQuestion>{t("sortingView.weight")}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Peso}</TextAnswer>

                <TextQuestion>{t('sortingView.anamneseInjuries')} </TextQuestion>
                <TextAnswer>{dadosTriagem?.Lesoes}</TextAnswer>

                <TextQuestion>{t('sortingView.anamneseDidOrthProb')} </TextQuestion>
                <TextAnswer>{dadosTriagem?.Problema_Ortopedico}</TextAnswer>

                <TextQuestion>{t('sortingView.anamneseInjuries')} </TextQuestion>
                <TextAnswer> {dadosTriagem?.Doencas_Cronicas}</TextAnswer>

                <TextQuestion>{t('sortingView.anamneseComments1')}</TextQuestion>
                <TextAnswer>{dadosTriagem?.Comentario || t('sortingView.noComments')}</TextAnswer>

            </Container>
        }
        </ScrollView>
    )
}