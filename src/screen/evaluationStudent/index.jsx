import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AddButton } from "../../components/addButton";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { createEvaluetion, getEvaluetion } from "../../controler/evaluetion";
import { toastMessage } from "../../util/toastMessage";
import {
    Container,
    ContainerEvaluation,
    EvaluationList,
    TextHeader
} from "./styles";
import Divider from 'react-native-divider';


const RenderEvaluation = ({ item, navigation, data }) => {
    console.log(item);


    function handleTouch() {
        //navigation.navigate('StudantView', {...data, studantId:item.id, nome:item.Nome, title:"Aluno: "+item.Nome})
    }

    return (
        <TouchableOpacity onPress={() => handleTouch()}>
            <Text>{'Nome: ' + item?.nome}</Text>
            <Text>{'data: ' + item?.criação.slice(0, 10)}</Text>
        </TouchableOpacity>
    )
}

function CreatePerformace({ idAluno, setCreatePerformace }) {
    const [nomeDesempenho, setNomeDesempenho] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

    useEffect(() => {
        const date = new Date();
        setDataCriacao(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);

    }, []);

    function handleSubmit() {
        if (nomeDesempenho !== '' & dataCriacao !== null) {
            const date = new Date();
            const data = {
                nome: nomeDesempenho,
                date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
                alunoId: idAluno,
            }
            createEvaluetion(data)
            setCreatePerformace(false);
        } else {
            toastMessage(false, 'Preencha corretamente os campos')
        }
    }
    function handleBack() {
        setCreatePerformace(false);
    }

    return (
        <View>
            <TextHeader>{"Criação de desempenho: "}</TextHeader>

            <Input
                onChangeText={setNomeDesempenho}
                value={nomeDesempenho}
                placeholder={"Nome do desempenho"}
            />
            <Input
                value={dataCriacao}
                editable={false}

            />


            <DoubleButtonConfirmation handleBack={handleBack} handleConfirm={handleSubmit} ></DoubleButtonConfirmation>
        </View>
    )
}

export function EvaluationStudent({ navigation, route }) {
    const [createPerformance, setCreatePerformace] = useState(false);
    const [dataEvaluation, setDataEvaluation] = useState([]);


    console.log("AVALIAÇÂO: ", route?.params);
    const { id, studantId } = route?.params;

    useEffect(() => {
        if (!createPerformance)
            getEvaluetion(studantId, setDataEvaluation);

    }, [createPerformance])
    useEffect(() => {
        console.log("dataEvaluation: ", dataEvaluation);

    }, [dataEvaluation])


    return (
        <Container>

            {!createPerformance ? <View>
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >
                    AVALIAÇÃO
                </Divider>
                <ContainerEvaluation>
                    <TextHeader>Datas de Desempenho</TextHeader>

                    <EvaluationList
                        data={dataEvaluation}
                        renderItem={
                            ({ item }) => <RenderEvaluation item={item} navigation={navigation} ></RenderEvaluation>
                        }
                        keyExtractor={item => `${item?.id}` + '91'}
                    />
                </ContainerEvaluation>
                <AddButton handle={() => { setCreatePerformace(value => !value) }}></AddButton>
            </View> :
                <CreatePerformace idAluno={studantId} setCreatePerformace={setCreatePerformace}></CreatePerformace>
            }
        </Container>
    )
}