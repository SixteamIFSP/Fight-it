import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getTriagem } from "../../controler/triagem";
import { Container, TextAnswer, TextQuestion, TextTitle } from './style'

export function TriagemView({ route, route: { params } }) {
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
        <ScrollView >{
            !dadosTriagem ?
                <Container>
                    <TextTitle>{t('sortingView.titlestyle={{ flex: 1, padding: 10 }}')}</TextTitle>
                    <TextQuestion>{t('sortingView.question')}</TextQuestion>
                </Container>
                :
                <Container>

                    <TextQuestion>{t('sortingView.height')}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Altura}</TextAnswer>

                    <TextQuestion>{t("sortingView.weight")}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Peso}</TextAnswer>

                    <TextQuestion>{'Data de nascimento:'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Data_Nascimento}</TextAnswer>

                    <TextQuestion>{'Possui doença crônica?'} </TextQuestion>
                    <TextAnswer> {dadosTriagem?.Doencas_Cronicas}</TextAnswer>

                    <TextQuestion>{'Possui colesterol alto?'} </TextQuestion>
                    <TextAnswer> {dadosTriagem?.Colesterol}</TextAnswer>

                    <TextQuestion>{'Fumante?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Fumante}</TextAnswer>

                    <TextQuestion>{'Faz uso de remédio controlado?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.RemedioControlado}</TextAnswer>

                    <TextQuestion>{'Toma suplementos ou anabolizantes? Quais?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Suplementos}</TextAnswer>

                    {/* Objetivo */}
                    <View style={{ padding: 10 }} >
                        <TextQuestion>{'Objetivo:'}</TextQuestion>

                        <TextQuestion>{'Competição:'}</TextQuestion>
                        <TextAnswer>{dadosTriagem?.ObjetivoCompeticao ? 'Sim' : 'Não'}</TextAnswer>

                        <TextQuestion>{'Condicionamento:'}</TextQuestion>
                        <TextAnswer>{dadosTriagem?.ObjetivoCondicionamento ? 'Sim' : 'Não'}</TextAnswer>

                        <TextQuestion>{'Emagrecimento:'}</TextQuestion>
                        <TextAnswer>{dadosTriagem?.ObjetivoEmagrecimento ? 'Sim' : 'Não'}</TextAnswer>

                        <TextQuestion>{'Hipertrofia:'}</TextQuestion>
                        <TextAnswer>{dadosTriagem?.ObjetivoHipertrofia ? 'Sim' : 'Não'}</TextAnswer>
                    </View>


                    {/* Ortopédicos */}
                    <TextQuestion>{t('sortingView.anamneseInjuries')} </TextQuestion>
                    <TextAnswer>{dadosTriagem?.Lesoes}</TextAnswer>

                    <TextQuestion>{t('sortingView.anamneseDidOrthProb')} </TextQuestion>
                    <TextAnswer>{dadosTriagem?.Problema_Ortopedico}</TextAnswer>

                    <TextQuestion>{'Possui disfunção na coluna?'} </TextQuestion>
                    <TextAnswer> {dadosTriagem?.DisfuncaoColuna}</TextAnswer>


                    <TextQuestion>{'Praticou esportes anteriormente?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Exercicios}</TextAnswer>


                    <TextQuestion>{'Possui limitação de movimento? Onde?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.LimitacaoMovimento}</TextAnswer>

                    <TextQuestion>{'Possui cirurgia? Onde?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.PossuiCirurgia}</TextAnswer>

                    <TextQuestion>{'Sente dores nas articulações? Onde?'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.SenteDoresArticulacoes}</TextAnswer>

                    {/* Observações */}
                    <TextQuestion>{'Observações:'}</TextQuestion>
                    <TextAnswer>{dadosTriagem?.Comentario ? dadosTriagem : t('sortingView.noComments')}</TextAnswer>

                </Container>
        }
        </ScrollView>
    )
}
