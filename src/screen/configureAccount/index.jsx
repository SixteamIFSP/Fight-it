import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles as globalStyles } from "../../global/styles";
import { useUser } from "../../hooks/user";
import { 
    ButtonConfigure,
    CancelButton,
    Container,
    ContainerCancelButton,
    ContainerSVG,
    ConteinerInfo,
    RowConfirmation,
    TextAlingLine,
    TextButton,
    TextDescription,
    TextHeader,
    TextInfo
} from "./styles";
import { FontAwesome } from '@expo/vector-icons'; 
import { Input } from "../../components/input";
import { CheckBox } from "../../components/checkbox";
import { ChangeInfoAccount, ChangePassowrd, GetUserAccount } from "../../controler/account";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const DataUser = () => {
    const { user, modifyUser} = useUser();
    const [dataUser, setDataUser] = useState();
    const [editable, setEditable] = useState(false);
    const [nome, setNome] = useState(`${user?.nome}`);
    const [email, setEmail] = useState(`${user?.email}`);
    const [telefone, setTelefone] = useState('');
    const [notification, setNotification] = useState()

    
    useEffect(()=>{
        GetUserAccount((data)=>setDataUser(data), user?.userID ,user?.tipoUsuario==1, )
    },[])

    useEffect(()=>{
        setNome(dataUser?.Nome);
        setEmail(dataUser?.Email);
        setTelefone(dataUser?.Telefone);
        setNotification(dataUser?.ReceberNot===1)

    },[dataUser])

    function Save(){
        if (!editable){
            setEditable((value)=> !value)
        } else {
            //logica de envio
            if(nome!=='' & telefone!=='' & email === user.email){
                console.log('atualizacao');
                let data = {
                    id:user?.userID,
                    nome:nome,
                    telefone:telefone,
                    recebernotificacoes:notification,

                }
                ChangeInfoAccount(data , user?.tipoUsuario===1);
                modifyUser({...user, nome:nome,})

            } else {
                Toast.show({
                    type: "error",
                    text2: "Erro ao Atualizar dados",
                }); 
            }
           
            setEditable((value)=> !value)
        }
    }
    function cancel(){
        setEditable(false);
    }
    
    return (
        <ConteinerInfo>
            <TextAlingLine>
                <TextDescription>Nome:</TextDescription>
                {
                    editable ?
                        <Input value={nome} onChangeText={setNome}></Input>
                        : <TextInfo>{dataUser?.Nome ? dataUser?.Nome : user.nome}</TextInfo>
                } 
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>E-mail:</TextDescription>
                {
                    editable ?
                        <Input editable={false} value={email}></Input>
                        : <TextInfo>{ dataUser?.Email ? dataUser?.Email : user.email}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>Telefone:</TextDescription>
                {
                    editable ?
                        <Input value={telefone} placeholder={"Digite seu numero:"} onChangeText={setTelefone}></Input>
                        : <TextInfo>{dataUser?.Telefone}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>Receber Notificação:</TextDescription>
                {
                    editable ?
                        <CheckBox isChecked={notification} onPress={()=>setNotification((value)=>!value)}></CheckBox>
                        : <TextInfo>{notification ? 'Ativo' : 'Desativado'}</TextInfo>
                }
            </TextAlingLine>
            
            
            <RowConfirmation>
                {
                    (editable) &&

                    <ContainerCancelButton onPress={()=>cancel()}>
                        <CancelButton>Cancelar</CancelButton>
                    </ContainerCancelButton>
                }
                <ContainerSVG onPress={()=>Save()}>
                    <FontAwesome name={editable ? 'save' : 'pencil'} size={30} color="black" />
                </ContainerSVG>

            </RowConfirmation>
        </ConteinerInfo>
    )
}

export const ChangePassword = ({editable, setEditable})=>{
    const { user } = useUser();

    const [oldPass, setOldPass] = useState('');
    const [newSenha, setNewSenha] = useState('');
    const [confirm, setConfirm] = useState('');

    function Save(){
        if (!editable){
            setEditable((value)=> !value)
        } else {

            //logica de envio
            if (newSenha!=='' & newSenha.length > 6 & confirm === newSenha & oldPass!==''){
                let data = {
                    id: user.userID,
                    senhaAntiga: oldPass,
                    senha: newSenha
                }
                ChangePassowrd(data, user.TipoUsuario===1)

            } else {

                Toast.show({
                    type: "error",
                    text2: "Preencha os campos corretamente",
                }) 
            }
            setEditable((value)=> !value)
        
        }
    }
    function cancel(){
        setEditable(false);
    }


    return (
        editable ? 
        <ConteinerInfo>

            <TextHeader>Trocar Senha</TextHeader>

            <TextDescription>Senha antiga:</TextDescription>
            <Input secureTextEntry={true} value={oldPass} onChangeText={setOldPass}></Input>
            <TextDescription>Nova Senha:</TextDescription>
            <Input secureTextEntry={true} value={newSenha} onChangeText={setNewSenha}></Input>
            <TextDescription>Confirmação de senha:</TextDescription>
            <Input secureTextEntry={true} value={confirm} onChangeText={setConfirm}></Input>

            <RowConfirmation>
                {
                    (editable) ?

                    <ContainerCancelButton onPress={()=>cancel()}>
                        <CancelButton>Cancelar</CancelButton>
                    </ContainerCancelButton>
                    :
                    <></>
                }
                <ContainerSVG onPress={()=>Save()}>
                    <FontAwesome name={editable ? 'save' : 'pencil'} size={30} color="black" />
                </ContainerSVG>

            </RowConfirmation>
           
        </ConteinerInfo>
        :
        <ButtonConfigure onPress={()=>setEditable(true)}>
            <TextButton>MUDAR SENHA</TextButton>
        </ButtonConfigure>
    )
}


export function ConfigureAccount(){
    const [editablePass, setEditablePass] = useState(false);

    return (
        <Container >
           
            {!editablePass &&
            <>
                <TextHeader>Minha conta</TextHeader>
                <DataUser></DataUser>
            </> }
                
                <ChangePassword editable={editablePass} setEditable={setEditablePass}></ChangePassword>

            <ButtonConfigure >
                <TextButton>EXCLUIR CONTA</TextButton>
            </ButtonConfigure>
            
        </Container>
    )
}