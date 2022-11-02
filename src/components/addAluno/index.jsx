import React, { useRef, useState } from "react";
import { AddContainerView } from "./styles";
import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Input } from "../input";
import { Loading } from "../loading";
import { Button } from "../button";
import { adicionarAluno } from "../../controler/class";
import { useTranslation } from "react-i18next";
import { CardAddAluno } from "../cardAddAluno";
import { getAluno } from "../../controler/student";

export function AdicionarAluno({ turmaId, setback }) {
    const { t } = useTranslation();
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const InputQueryRef = useRef({ text: "" });

    async function handleBusca() {
        Keyboard.dismiss();
        const value = InputQueryRef?.current.text;
        if (!value) return
        //setLoading(true);
        await getAluno(value, setAlunos);
        //setLoading(false)
    }

    function handleBack() {
        setback();
    }

    async function handleSubmit(id) {
        setLoading(true)
        const data = {
            alunoId: id,
            turmaId: turmaId,
        };
        await adicionarAluno(data);
        setLoading(false)
        setback(false);
    };

    return (
        <AddContainerView>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{t('addStudentClass.Header')}</Text>
            <View style={{ padding: 15, flexDirection: "row" }}>
                <Input
                    width={"50%"}
                    ref={InputQueryRef}
                    onChangeText={text => InputQueryRef.current.text = text}
                    placeholder={t("addStudentClass.Placeholder.mail")}
                    keyboardType="email-address"
                />
                <Button
                    style={{ width: '25%' }}
                    confirm={true}
                    text={t('addStudentClass.searchButton')}
                    handle={() => handleBusca()}
                ></Button>
            </View>
            {/* <Text>Nenhum aluno encontrado</Text> */}

            <View style={{ width: "90%", height: "70%" }}>
                {
                    !loading ?

                        (alunos.length < 1) ?
                            <Text style={{fontWeight:'bold', fontSize:16}}>{t("addStudents.empty")}</Text>
                            :
                            <View>
                                <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 'bold' }}>
                                    {'Legal! Encontramos este(s) aluno(s). Selecione o aluno que deseja adicionar à turma: '}
                                </Text>
                                <FlatList
                                    data={alunos}
                                    renderItem={
                                        ({ item }) =>
                                            <TouchableOpacity onPress={() => handleSubmit(item.id)}>
                                                <CardAddAluno data={item} />
                                            </TouchableOpacity>
                                    }
                                    keyExtractor={item => `${item.email}`}
                                />
                            </View>

                        :
                        <Loading loading={loading} size={18} />

                }
            </View>
            <Button confirm={false} text={t('addStudentClass.backButton')} handle={() => handleBack()} ></Button>

        </AddContainerView >
    )
}