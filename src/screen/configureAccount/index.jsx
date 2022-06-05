import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/user";
import { FontAwesome } from '@expo/vector-icons';
import { Input } from "../../components/input";
import { CheckBox } from "../../components/checkbox";
import { MaterialIcons } from '@expo/vector-icons'; 
import { ChangeInfoAccount, ChangePassowrd, DeleteAccount, GetUserAccount } from "../../controler/account";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { toastMessage } from "../../util/toastMessage";
import * as ImagePicker from 'expo-image-picker';

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
    TextInfo,
    ConteinerInfoDelete,
    ButtonImage,
    ContainerImage,
    AreaImage,
} from "./styles";
import { Image } from "react-native";
import { upload } from "../../controler/image";
import { variables } from "../../configuration/constants";

// Compomente de SHOW e EDIT de dados do usuário
const DataUser = () => {
    const { user, modifyUser } = useUser();
    const [dataUser, setDataUser] = useState();
    const [editable, setEditable] = useState(false);
    const [nome, setNome] = useState(`${user?.nome}`);
    const [email, setEmail] = useState(`${user?.email}`);
    const [telefone, setTelefone] = useState('');
    const [notification, setNotification] = useState()

    useEffect(() => {
        GetUserAccount((data) => setDataUser(data), user?.userID, user?.tipoUsuario === 1,)
    }, [])

    useEffect(() => {
        setNome(dataUser?.Nome);
        setEmail(dataUser?.Email);
        setTelefone(dataUser?.Telefone);
        setNotification(dataUser?.ReceberNot === 1)

    }, [dataUser])

    function save() {
        if (!editable) {
            setEditable((value) => !value)
        } else {
            //logica de envio
            if (nome !== '' & telefone !== '' & email === user.email) {
                let data = {
                    id: user?.userID,
                    nome: nome,
                    telefone: telefone,
                    recebernotificacoes: notification,

                }
                ChangeInfoAccount(data, user?.tipoUsuario === 1);
                modifyUser({ ...user, nome: nome, })

            } else {
                toastMessage(false, 'Erro ao Atualizar dados');
            }

            setEditable((value) => !value)
        }
    }
    function cancel() {
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
                        : <TextInfo>{dataUser?.Email ? dataUser?.Email : user.email}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>Telefone:</TextDescription>
                {
                    editable ?
                        <Input
                            autoComplete={'tel'}
                            keyboardType={'phone-pad'}
                            value={telefone}
                            placeholder={"Digite seu numero:"}
                            onChangeText={setTelefone}
                        ></Input>
                        : <TextInfo>{dataUser?.Telefone}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>Receber Notificação:</TextDescription>
                {
                    editable ?
                        <CheckBox isChecked={notification} onPress={() => setNotification((value) => !value)}></CheckBox>
                        : <TextInfo>{notification ? 'Ativo' : 'Desativado'}</TextInfo>
                }
            </TextAlingLine>
            <RowConfirmation>
                {
                    (editable) &&

                    <ContainerCancelButton onPress={() => cancel()}>
                        <CancelButton>Cancelar</CancelButton>
                    </ContainerCancelButton>
                }
                <ContainerSVG onPress={() => save()}>
                    <FontAwesome name={editable ? 'save' : 'pencil'} size={30} color="black" />
                </ContainerSVG>
            </RowConfirmation>
        </ConteinerInfo>
    )
};
// Compomente de troca de senha
export const ChangePassword = ({ editable, setEditable}) => {
    const { user } = useUser();

    const [oldPass, setOldPass] = useState('');
    const [newSenha, setNewSenha] = useState('');
    const [confirm, setConfirm] = useState('');

    function save() {
        if (!editable) {
            setEditable((value) => !value)
        } else {
            //logica de envio
            if (newSenha !== '' & newSenha.length > 6 & confirm === newSenha & oldPass !== '') {
                let data = {
                    id: user.userID,
                    senhaAntiga: oldPass,
                    senha: newSenha
                }
                ChangePassowrd(data, user.TipoUsuario === 1)

            } else {

                Toast.show({
                    type: "error",
                    text2: "Preencha os campos corretamente",
                })
            }
            setEditable((value) => !value)

        }
    };
    function cancel() {
        setEditable(false);
    };
    return (
        editable ?
            <ConteinerInfo style={{marginTop: 20}}>
                <TextHeader>Trocar Senha</TextHeader>
                <TextDescription>Senha antiga:</TextDescription>
                <Input
                    style={{ marginBottom: 10, width: '100%' }}
                    secureTextEntry={true}
                    value={oldPass}
                    onChangeText={setOldPass}></Input>
                <TextDescription>Nova Senha:</TextDescription>
                <Input

                    style={{ marginBottom: 10, width: '100%' }}
                    secureTextEntry={true}
                    value={newSenha}
                    onChangeText={setNewSenha}></Input>

                <TextDescription>Confirmação de senha:</TextDescription>
                <Input
                    style={{ marginBottom: 10, width: '100%' }}
                    secureTextEntry={true}
                    value={confirm}
                    onChangeText={setConfirm}>
                </Input>

                <RowConfirmation>
                    {
                        (editable) &&

                        <ContainerCancelButton onPress={() => cancel()}>
                            <CancelButton>Cancelar</CancelButton>
                        </ContainerCancelButton>
                    }
                    <ContainerSVG onPress={() => save()}>
                        <FontAwesome name={editable ? 'save' : 'pencil'} size={30} color="black" />
                    </ContainerSVG>

                </RowConfirmation>

            </ConteinerInfo>
            :
            <ButtonConfigure onPress={() => setEditable(true)}>
                <TextButton>MUDAR SENHA</TextButton>
            </ButtonConfigure>
    )
};

const ConfirmDelete = ({ deletable, setDeletable }) => {
    const { user, logOut } = useUser();
    const [password, setPassword] = useState('');

    function handleDelete() {
        try {
            if (password !== '' & password.length > 6) {
                let data = {
                    id: user.userID,
                    senha: password,
                };
                DeleteAccount(data, user.tipoUsuario === 1, () => logOut())
            } else {

                toastMessage(false, "Preencha os campos corretamente") 
            }
            
        } catch (error) {

            toastMessage(false, "Erro de conexão") 
        }
      

        setDeletable(false)
    };
    return (
        deletable ?
            (
                <ConteinerInfoDelete style={{ marginTop: 20, marginBottom: 20 }}>
                    <TextHeader>Excluir usuário</TextHeader>
                    <TextDescription>
                        Validação de usuário:
                    </TextDescription>
                    <Input
                        style={{ width: '90%' }}
                        placeholder={"Para excluir conta digite sua senha!"}
                        secureTextEntry={true} value={password}
                        onChangeText={setPassword}
                    ></Input>
                    <RowConfirmation>
                        <ContainerCancelButton onPress={() => setDeletable(false)}>
                            <CancelButton>Cancelar</CancelButton>
                        </ContainerCancelButton>
                        <ContainerSVG onPress={() => handleDelete()}>
                            <FontAwesome name={'trash'} size={30} color="#cc0000" />
                        </ContainerSVG>
                    </RowConfirmation>
                </ConteinerInfoDelete>
            )
            :
            (
                <ButtonConfigure onPress={() => setDeletable(true)}>
                    <TextButton>DESATIVAR CONTA</TextButton>
                </ButtonConfigure>
            )
    )
};

export function ConfigureAccount() {
    const  { user, modifyUser}  = useUser();
    const [editablePass, setEditablePass] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const [imageSelect, setImageSelect] = useState(null);

    useEffect(()=>{
        setImageSelect(variables.IMAGES_URL?.pfp)
    },[]);


    useEffect(() => {
        (async () => {
         
            const cameraRollStatus =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
          
            if (
              cameraRollStatus.status !== "granted" 
            ) {
              alert("Usuario sem permição para utilizar mídias");
            }
          
        })();
      }, []);

      const pickImage = async () => {

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "Images",
                aspect: [4, 3],
                quality: 1,
              })
      
              console.log(result);
              
              upload(result, user)
      
              
              //setImageSelect(result.uri)
            
        } catch (error) {

            console.log(error.message);
        }
        


    }

    return (
        <Container >
            {!editablePass &&
                <>
                    <TextHeader>Minha conta</TextHeader>

                    <ContainerImage>
                        <AreaImage>

                            {
                                imageSelect !== null? 
                                    <Image
                                        source={
                                            {uri:imageSelect}
                                        }
                                        style={{
                                            width:"100%",
                                            height:"100%"
                                        }}
                                    />   
                                :
                                <ButtonImage onPress = {()=> pickImage()}>
                                    <MaterialIcons name="add-a-photo" size={40} color="#dddddd" />
                                </ButtonImage>
                            }
                        
                        </AreaImage>
                    </ContainerImage>
                    <DataUser></DataUser>
                </>}
            <ChangePassword editable={editablePass} setEditable={setEditablePass}></ChangePassword>
            <ConfirmDelete deletable={deletable} setDeletable={setDeletable}></ConfirmDelete>
        </Container>
    )
}