import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
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
import { useIsFocused } from "@react-navigation/native";
import { useModal } from "../../hooks/modalConfirmation";
import { deleteAluno, getAulasByTurma } from "../../controler/class";
import { useUser } from "../../hooks/user";
import { convertDateToBrString } from "../../utils/dateConvert";

function CardParamStudant({ item, handleGraphyc }) {

    return (
        <ContainerCardParam onPress={() => handleGraphyc(item.id)}>
            <Text>{item.nome}</Text>
        </ContainerCardParam>
    )
};
export function StudantView({ navigation, route:{params} }) {
   
    const { t } = useTranslation();
    const { user } = useUser();
    const { studantId, id, nome, data } = params;
    const { setCallback } = useModal();
    const [loading, setLoading] = useState(false);
    const [paramsAluno, setParamsAluno] = useState([]);
    const [loadingGraphyc, setLoadingGraphyc] = useState(false);
    const [dataParams, setDataParams] = useState([]);
    const isFocused = useIsFocused();
    const [aulas, setAulas] = useState([])
     
   useEffect(() => {
    getAulas()
   }, [])

    useEffect(()=>{
        function effect (){
            handleLoadingParams()
            setCallback("Deseja remover aluno?", ()=>callBackDeleteStudentClass());
        };
        isFocused && effect();
    }, [isFocused])

    function callBackDeleteStudentClass(){
        deleteAluno({ aluno:studantId, turma:id })
        navigation.goBack();
    }
    
    function handleEvaluation() {
        navigation.navigate('EvaluationStudent', { ...params, title: t("navigationHeader.Evaluation", { name: nome })  })
    }

    function handleViewTriagem() {
        navigation.navigate('TriagemView', { ...params, title: `Triagem do ${nome}` })
    }

    async function handleLoadingParams() {
        if (loading) return;
        setLoading(true);

        let dataSubmit;

        if (user.tipoUsuario ===1){
            dataSubmit = {
                aluno: studantId,
                turma: id,
            }
        } else {
            dataSubmit = {
                aluno: user.userID,
                turma: data.id,
            }
        }

        await getParamsAluno(dataSubmit, setParamsAluno);
        setLoading(false);
    }

   function getAulas() {
    getAulasByTurma(setAulas, id ?? data.id)
   }

    async function handleLoadingGraphyc(idParam) {
        
        setLoadingGraphyc(false)
        let paransLoadingGraphyc
        if ( user.tipoUsuario ===1) {
            paransLoadingGraphyc = {
                aluno: studantId,
                parametro: idParam,
            } 
        } else {
            paransLoadingGraphyc = {
                aluno: user.userID,
                parametro: idParam,
            } 
        }
        await getDesempenhoPorParametro(paransLoadingGraphyc, setDataParams) 
        setLoadingGraphyc(true)
    }

   function navigateToAula(aulaid) {
    navigation.navigate('LessonView', {title:'Visualizar aula', aulaid});
    }

    return (
        <Container>
        {user.tipoUsuario === 1 ? (

            <ContainerButtons>
                <ContentButtons onPress={() => handleEvaluation()}>
                    <TextButtons>{t("studentView.ButtonAvaliation")}</TextButtons>
                </ContentButtons>
                <ContentButtons onPress={() => handleViewTriagem()}>
                    <TextButtons>{t("studentView.ButtonViewTriagem")}</TextButtons>
                </ContentButtons>
            </ContainerButtons>
        ):
        <>
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >
                    {"Datas de aulas"}
                </Divider>

               <View style={{padding: 5}}>
               {
                (!aulas || !aulas.length) && <Text>Sem aulas</Text>
                }
               {aulas.map(aula => {
                return <TouchableOpacity
                onPress={() =>{
                    navigateToAula(aula.id)
                }}
                ><Text style={{fontSize: 17, fontWeight: 'bold'}}>Aula: {aula.nome } no dia: {new Date(aula.data).toLocaleString()}</Text></TouchableOpacity>
               })}
               </View>
        </>
        }

            <ContainerDesempenho>
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >
                    {t("studentView.Header")}
                </Divider>
                {paramsAluno.length > 0   ? (
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
                ):
                (
                    <Text>Não há desempenhos</Text>
                )
                }
               
                <Loading loading={loading} size={30}></Loading>
                {loadingGraphyc &&
                    <LineChart
                        data={{
                            labels: ['', ...dataParams?.map((value) => convertDateToBrString(value?.data))],
                            datasets: [
                                {
                                    data: [0, ...dataParams?.map((value) => value.valor)]
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