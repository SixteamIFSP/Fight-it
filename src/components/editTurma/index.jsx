import React, { useRef, useState } from "react";
import { changeClass } from "../../controler/class";
import { DoubleButtonConfirmation } from "../doubleButtonConfirmation";
import { Input } from "../input";
import { Loading } from "../loading";
import { Container, ContainerForm, TextDescription } from "./styles";

export function EditTurma ({navigation, turmaId, setback }){
    const [title, setTitle]  = useState({value:'', error:null});
    const [description, setDescription]  = useState({value:'', error:null});
    const [loading, setLoading] = useState(false);

    function handleBack() {
        if (loading) return;
        setback();
    }

    function validadeFields(){
        title.value==='' ?
        setTitle(old=> ({...old, error:"Título precisa ser informado"}))
    :
        setTitle(old=> ({...old, error:null}));

    description.value ==='' ?
        setDescription(old=> ({...old, error:"Descrição precisa ser informada"}))
    :
        setDescription(old=> ({...old, error:null}));

        return (title.value==='' || description.value ==='');
    }

    async function handleSubmit() {
        if (loading) return;

        if (validadeFields()) return;

        setLoading(true);
        const data = {
            titulo: title.value,
            descricao: description.value,
            turmaId: turmaId
        }

        await changeClass(data);
        setLoading(false);
        navigation.goBack();
    }

    return (
        <Container>
            <TextDescription>{"Modificar informações da turma"}</TextDescription>
            <ContainerForm>
                <Input
                    style={{ marginBottom: 16 }}
                    value={title.value}
                    errorMessage={title.error}
                    placeholder={'Título da turma'}
                    onChangeText={(value)=>setTitle((old)=> ({...old, value}) )}
                />
                <Input
                    style={{ marginBottom: 16 }}
                    value={description.value}
                    errorMessage={description.error}
                    placeholder={'Descrição da turma'}
                    onChangeText={(value)=>setDescription((old)=> ({...old, value}) )}
                />
            </ContainerForm>

            {
                !loading ? 
                    <DoubleButtonConfirmation handleBack={handleBack} handleConfirm={handleSubmit} ></DoubleButtonConfirmation>
                : <Loading loading={loading} size={30}/>
            }
        </Container>
    )
} 
