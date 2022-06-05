import React, { useEffect, useState } from "react";
import {
    CardTitle,
    CardView,
    Container,
    ContainerForm,
    ContainerList,
    ContainerTitle,
    TextTitle,
    CardCreateClasss,
} from "./styles";
import { ActivityIndicator, FlatList } from "react-native";
import { createClass, getClass } from "../../controler/class";
import { useUser } from "../../hooks/user";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { toastMessage } from "../../util/toastMessage";
import { AddButton } from "../../components/addButton";
import { Loading } from "../../components/loading";

function CardTurma({ data, handleNewScreen }) {
    // TODO: COLOCAR AS INFORMAÇÕES DENTRO DE CADA CARD E VALIDAR SE EXISTE OU NÃO INFORMAÇÕES.
    return (
        <CardView onPress={()=>handleNewScreen('ClassView', {title: `Turma: ${data?.TurmaNome}`, data:{...data, nomeTurma:data?.TurmaNome}})}>
            <CardTitle>{data?.TurmaNome}</CardTitle>
        </CardView>
    )
};

function LoadingClass({ user, setCreateNew, navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleLoadMore();
    }, []);

    async function handleLoadMore() {
        if (loading) return;
        setLoading(true);
        
        await getClass(setData, user.userID, user.tipoUsuario === 1);
        setLoading(false);
    };

    function handleNewScreen(screen, params) {
        navigation.navigate(screen, params)
    };

    return (
        <>
            <AddButton handle={() => setCreateNew((value) => !value)} />
            <ContainerList>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <CardTurma data={item} handleNewScreen={handleNewScreen}></CardTurma>}
                    onEndReached={handleLoadMore}
                    onEndThreshold={0.1}
                    keyExtractor={item => item.id}
                    ListFooterComponent={
                        <Loading loading={loading} size={30}></Loading>
                    }
                />
            </ContainerList>
        </>
    )
};

function CreateClass({ user, setCreateNew }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function confirm() {
        if (name !== '', description != '') {
            const data = {
                nome: name,
                descricao: description,
                professorId: user.userID,
            };
            createClass(data);
        } else {
            toastMessage(false, 'Preencha os campos!')
        };

        cancel();
    };
    function cancel() {
        setCreateNew(false);
    };

    return (
        <CardCreateClasss>
            <ContainerTitle>
                <TextTitle> Criar nova turma</TextTitle>
            </ContainerTitle>
            <ContainerForm>
                <Input
                    value={name}
                    placeholder={'Nome da turma'}
                    onChangeText={setName}
                />
                <Input
                    value={description}
                    placeholder={'Descrição da turma'}
                    onChangeText={setDescription}
                />
            </ContainerForm>
            <DoubleButtonConfirmation handleConfirm={confirm} handleBack={cancel}></DoubleButtonConfirmation>
        </CardCreateClasss>
    )
};

export function TeacherClass({ navigation }) {
    const { user } = useUser();
    const [createNew, setCreateNew] = useState(false);

    return (
        <Container>
            {!createNew ?
                (
                    <LoadingClass user={user} setCreateNew={setCreateNew} navigation={navigation}></LoadingClass>

                ) :
                (
                    <CreateClass user={user} setCreateNew={setCreateNew}></CreateClass>
                )
            }
        </Container>
    );
};