import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { Loading } from "../../components/loading";
import { getDesempenhoPorParametro, getParamsAluno } from "../../controler/student";
import { LineChart } from "react-native-chart-kit";
import Divider from "react-native-divider"
import {
    Container,
    ContainerButtons,
    ContainerCardParam,
    ContainerDesempenho,
    ContentButtons,
    DesempenhoHeader,
    TextButtons
} from "./styles";
import { useTranslation } from "react-i18next";

function CardParamStudant({ item, handleGraphyc }) {

    return (
        <ContainerCardParam onPress={() => handleGraphyc(item.id)}>
            <Text>{item.nome}</Text>
        </ContainerCardParam>
    )
};
export function StudantView({ navigation, route }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [paramsAluno, setParamsAluno] = useState([]);
    const [loadingGraphyc, setLoadingGraphyc] = useState(false);
    const [dataParams, setDataParams] = useState([]);

    useEffect(() => {
        handleLoadingParams()
    }, [])

    // function handleTriagem(){

    // }
    function handleEvaluation() {
        navigation.navigate('EvaluationStudent', { ...route?.params, title: t("navigationHeader.Evaluation", { name: route?.params.nome }) })
    }

    async function handleLoadingParams() {
        if (loading) return;
        setLoading(true);
        const data = {
            aluno: route?.params.studantId,
            turma: route?.params.id,
        }

        await getParamsAluno(data, setParamsAluno);
        setLoading(false);
    }

    async function handleLoadingGraphyc(idParam) {

        setLoadingGraphyc(false)
        const data = {
            aluno: route?.params.studantId,
            parametro: idParam,
        }
        await getDesempenhoPorParametro(data, setDataParams)

        setLoadingGraphyc(true)

    }

    return (
        <Container>
            <ContainerButtons>
                <ContentButtons onPress={() => handleEvaluation()}>
                    <TextButtons>{t("studentView.ButtonAvaliation")}</TextButtons>
                </ContentButtons>
            </ContainerButtons>

            <ContainerDesempenho>
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >
                    {t("studentView.Header")}
                </Divider>

                <FlatList
                    horizontal={true}
                    data={paramsAluno}
                    renderItem={
                        ({ item }) => <CardParamStudant
                            item={item}
                            handleGraphyc={handleLoadingGraphyc}
                        ></CardParamStudant>
                    }
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    height: "100%",
                                    width: 20,
                                }}
                            />
                        );
                    }}
                />
                <Loading loading={loading} size={30}></Loading>
                {loadingGraphyc &&
                    <LineChart
                        data={{
                            labels: dataParams?.map((value) => value?.data.slice(0, 10)),
                            datasets: [
                                {
                                    data: dataParams?.map((value) => value.valor)
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix=""
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#000000",
                            backgroundGradientFrom: "#505050",
                            backgroundGradientTo: "#595959",
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(205, 205, 205, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffffff"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />

                }

            </ContainerDesempenho>
        </Container>
    )
}