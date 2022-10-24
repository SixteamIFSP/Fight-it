import React, { useRef, useState } from "react";
import { AddContainerView } from "./styles";
import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Input } from "../input";
import { DoubleButtonConfirmation } from "../doubleButtonConfirmation";
import { Loading } from "../loading";
import { Button } from "../button";
import { adicionarAluno } from "../../controler/class";
import { useTranslation } from "react-i18next";
import Divider from "react-native-divider";
import { CardAddAluno } from "../cardAddAluno";
import { getAluno } from "../../controler/student";

export function AdicionarAluno({ turmaId, setback }){
        const { t } = useTranslation();
        const [alunos, setAlunos] = useState([]);
        const [loading, setLoading] = useState(false);
        const InputQueryRef = useRef({text:""});

        async function  handleBusca(){
            Keyboard.dismiss();
            const value = InputQueryRef?.current.text
            if (!value) return
 
            setLoading(true)

            await getAluno(value, setAlunos);

            setLoading(false)
        }
    
        function handleBack() {
            setback()
        }

        async function handleSubmit(id) {
            // if (mail === '' || mail.indexOf("@") === -1) {
            //     toastMessage(false, t("toast.error.invalid.email"));
            //     setback(false);
    
            //     return
            // };
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
                <Divider
                    borderColor="#000"
                    color="#000"
                    orientation="center"
                >{t('addStudentClass.Header')}
                </Divider>
                <View  style={{ padding: 15,  flexDirection: "row"}}>
                    <Input
                        width={"50%"}
                        ref={InputQueryRef}
                        onChangeText={text => InputQueryRef.current.text = text }
                        placeholder={t("addStudentClass.Placeholder.mail")}
                        keyboardType="email-address"

                    />
                    <Button confirm={true} text={"BUSCAR"} handle={()=>handleBusca()} ></Button>
                </View>
                  {/* <Text>Nenhum aluno encontrado</Text> */}
                 
                <View style={{width:"90%", height: "70%", borderColor:"#303030", borderWidth:1, }}>
                {
                    !loading ?
                        
                            (alunos.length < 1) ?
                                <Text>Sem Alunos</Text>
                            :

                            <FlatList
                            data={alunos}
                            renderItem={
                                ({item})=> 
                                <TouchableOpacity onPress={()=>handleSubmit(item.id)}>
                                    <CardAddAluno data={item}/>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => `${item.email}`}
                        />
                        :
                        <Loading loading={loading} size={18} />
                        
                }
                </View>
                <Button confirm={false} text={"VOLTAR"} handle={()=>handleBack()} ></Button>

             
            </AddContainerView>
        )    
}