import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Loading } from "../../components/loading";
import { FlatList, Text } from "react-native";
import { AddButton } from "../../components/addButton";
import { CardTitle, CardView, ContainerList } from "./styles";
import { getClass } from "../../controler/class";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user";

function CardTurma({ data, handleNewScreen }) {
    const { t } = useTranslation()
    const { user } = useUser();

    const condicionalNavigate = user.tipoUsuario == 1 ? {
        tela: "ClassView",
        title: t("navigationHeader.ClassDescription", {name:data?.TurmaNome}),
        data: {...data, nomeTurma:data?.TurmaNome}
    } :
    {
        tela: "StudantView",
        title: "Avaliação",
        data: {...data, nomeTurma:data?.TurmaNome}
    }

    // TODO: COLOCAR AS INFORMAÇÕES DENTRO DE CADA CARD E VALIDAR SE EXISTE OU NÃO INFORMAÇÕES.
    return (
        <CardView onPress={()=>handleNewScreen(condicionalNavigate.tela, {title: condicionalNavigate.title, data:condicionalNavigate.data})}>
            <CardTitle>{data?.TurmaNome}</CardTitle>
        </CardView>
    )
};

export function LoadingClass({handleNewScreen,  user, setCreateNew, navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(()=>{
        console.log(data);
    },[data])

    useEffect(()=>{
        console.log(isFocused, loading);
        function effect (){
            handleLoadMore();
        };
        isFocused && effect();
    }, [isFocused])

    async function handleLoadMore() {
        if (loading) return
        
        setLoading(true);
        await getClass(setData, user.userID, user.tipoUsuario === 1);
        setLoading(false);
    };

    return (
        <>
            {
                setCreateNew === undefined &&
                    <Text>Escolha uma turma para adicionar uma aula</Text>
            }
            
            {
                (user.tipoUsuario === 1 && setCreateNew!=undefined) &&
                <AddButton handle={() => setCreateNew((value) => !value)} />
            }
            <ContainerList>
                {data?.length >= 1 ? 
                    <FlatList
                        style={{width:'100%'}}
                        data={data}
                        renderItem={({ item }) => <CardTurma data={item} handleNewScreen={handleNewScreen}></CardTurma>}
                        // onEndReached={handleLoadMore}
                        onEndThreshold={0.01}
                        keyExtractor={item => item.id}
                        ListFooterComponent={
                            <Loading loading={loading} size={30}></Loading>
                        }
                    />
                    :<Text >Este professor não possui turmas</Text>
                }
            </ContainerList>
        </>
    )
};