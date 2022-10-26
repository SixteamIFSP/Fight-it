import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/user";
import { FontAwesome } from '@expo/vector-icons';
import { Input } from "../../components/input";
import { CheckBox } from "../../components/checkbox";
import { MaterialIcons } from '@expo/vector-icons';
import { toastMessage } from "../../utils/toastMessage";
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from "react-native";
import { upload } from "../../controler/image";
import { variables } from "../../configuration/constants";
import { Loading } from "../../components/loading";
import { t } from "i18next";
import inputValidators from '../../utils/inputValidators';
import MaskInput, { Masks } from 'react-native-mask-input';
import {
    ChangeInfoAccount,
    ChangePassowrd,
    DeleteAccount,
    GetUserAccount
} from "../../controler/account";
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
    HorizontalButtonsContainer,
    ConfirmButton,
    DeleteAccountButton,
    SaveButton,
    SaveButtonText
} from "./styles";

// Compomente de SHOW e EDIT de dados do usuário
const DataUser = () => {
    const { validationEmail, validationName } = inputValidators();
    const { user, modifyUser } = useUser();
    const [dataUser, setDataUser] = useState();
    const [editable, setEditable] = useState(false);
    const [nome, setNome] = useState(`${user?.nome}`);
    const [email, setEmail] = useState(`${user?.email}`);
    const [telefone, setTelefone] = useState('');
    const [notification, setNotification] = useState();

    const [invalidNameMessage, setInvalidNameMessage] = useState('');
    const [invalidPhoneLengthMessage, setInvalidPhoneLengthMessage] = useState('');

    const handleNameInput = (value) => {
        setInvalidNameMessage(validationName(value));
        if (!invalidNameMessage) setNome(value);
    };
    const handlePhoneInput = (value) => {
        if (value.length < 11) {
            setInvalidPhoneLengthMessage(t('createAccount.invalidPhoneNumber'));
            setTelefone(value);
        } else {
            setInvalidPhoneLengthMessage('');
            setTelefone(value);
        }

    };

    useEffect(() => {
        GetUserAccount(
            (data) => setDataUser(data), user?.userID, user?.tipoUsuario === 1
        )
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
            if (nome !== '' && !invalidNameMessage && !invalidPhoneLengthMessage && telefone !== '' && email === user.email) {
                let data = {
                    id: user?.userID,
                    nome: nome,
                    telefone: telefone,
                    recebernotificacoes: notification,

                }
                ChangeInfoAccount(data, user?.tipoUsuario === 1);
                modifyUser({ ...user, nome: nome, })
                setEditable((value) => !value)
            } else {
                toastMessage(false, 'Digite os campos corretamente');
            }
        }
    }

    function cancel() {
        setEditable(false);
    }

    return (
        <ConteinerInfo>
            <TextAlingLine style={{ alignItems: 'center' }}>
                <TextDescription>{t('form.name')}:</TextDescription>
                {
                    editable ?
                        <Input
                            value={nome}
                            onChangeText={(value) => handleNameInput(value)}
                            errorMessage={invalidNameMessage || ''}
                        ></Input>
                        : <TextInfo>{dataUser?.Nome ? dataUser?.Nome : user.nome}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>{t('form.mail')}:</TextDescription>
                {
                    editable ?
                        <Input
                            editable={false}
                            value={email}
                        ></Input>
                        : <TextInfo>{dataUser?.Email ? dataUser?.Email : user.email}</TextInfo>
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>{t('form.phone')}</TextDescription>
                {
                    editable ?
                        <View style={{ width: '75%', alignSelf: 'flex-end' }}>
                            <MaskInput
                                style={{
                                    width: '90%',
                                    marginBottom: 12,
                                    marginTop: 5,
                                    borderWidth: 1,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderColor: 'black'
                                }}
                                onChangeText={(_, unmasked) => { handlePhoneInput(unmasked) }}
                                value={telefone}
                                placeholder={t('createAccount.phone')}
                                mask={Masks.BRL_PHONE}
                            />
                            {
                                invalidPhoneLengthMessage ?
                                    <Text
                                        style={{
                                            width: '70%',
                                            color: 'red'
                                        }}
                                    >{t('createAccount.invalidPhoneNumber')}
                                    </Text>
                                    :
                                    null
                            }
                        </View>
                        :
                        <MaskInput
                            style={{
                                width: '100%',
                                marginBottom: 12,
                                marginTop: 5,
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                borderColor: 'white',
                                fontSize: 18
                            }}
                            value={dataUser?.Telefone}
                            placeholder={t('createAccount.phone')}
                            mask={Masks.BRL_PHONE}
                        />
                }
            </TextAlingLine>
            <TextAlingLine>
                <TextDescription>{t('form.notification')}:</TextDescription>
                {
                    editable ?
                        <CheckBox
                            isChecked={notification}
                            onPress={() => setNotification((value) => !value)}
                        ></CheckBox>
                        : <TextInfo>{notification ? 'Sim' : 'Não'}</TextInfo>
                }
            </TextAlingLine>
            <RowConfirmation>
                {
                    (editable) &&

                    <ContainerCancelButton onPress={() => cancel()}>
                        <CancelButton>{t('validation.cancel')}</CancelButton>
                    </ContainerCancelButton>
                }

                {!editable && (<ContainerSVG onPress={() => save()}>
                    <FontAwesome name={'pencil'} size={30} color="black" />
                </ContainerSVG>)}
                {
                    editable
                    &&
                    <SaveButton
                        onPress={() => save()}
                    >
                        <SaveButtonText>Salvar</SaveButtonText>
                    </SaveButton>}
            </RowConfirmation>
        </ConteinerInfo>
    )
};
// Compomente de troca de senha
export const ChangePassword = ({ editable, setEditable }) => {
    const { user } = useUser();

    const [oldPass, setOldPass] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [newPasswordEmpty, setNewPasswordEmpty] = useState(false);
    const [confirmPasswordEmpty, setConfirmNewPasswordEmpty] = useState(false);
    const [oldPasswordEmpty, setOldPassEmpty] = useState(false);

    function save() {
        if (!editable) {
            setEditable((value) => !value)
        } else {
            //logica de envio
            console.log(newPassword, 'newPassword');

            if (newPassword !== '' && (newPassword.length >= 6) && (confirmNewPassword === newPassword) && oldPass !== '') {
                setNewPasswordEmpty(false);
                setConfirmNewPasswordEmpty(false);
                setOldPassEmpty(false);
                let data = {
                    id: user.userID,
                    senhaAntiga: oldPass,
                    senha: newPassword
                }
                ChangePassowrd(data, user.TipoUsuario === 1);
                setEditable((value) => !value)
            } else {
                if (!newPassword) {
                    setNewPasswordEmpty(true);
                }
                if (!confirmNewPassword) {
                    setConfirmNewPassword(true);
                }
                if (!oldPass) {
                    setOldPassEmpty(true);
                }
                toastMessage(false, "Digite os campos corretamente !"); // sem t
                //toastMessage(false,  t("msg.completeFields")); // com t 
            }
        }
    };
    function cancel() {
        setEditable(false);
    };
    return (
        editable ?
            <ConteinerInfo style={{ marginTop: 20 }}>
                <TextHeader>{t("changePass.Header")}</TextHeader>
                <TextDescription>{t("changePass.OldPass")}</TextDescription>
                <Input
                    style={{ marginBottom: 10, width: '100%' }}
                    secureTextEntry={true}
                    value={oldPass}
                    onChangeText={(value)=>{setOldPass(value); setOldPassEmpty(false)}}
                    errorMessage={oldPasswordEmpty ? t('createAccount.requiredField') : ''}
                ></Input>
                <TextDescription>{t("changePass.NewPass")}</TextDescription>
                <Input
                    style={{ marginBottom: 10, width: '100%' } }
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    errorMessage={newPasswordEmpty ? t('createAccount.requiredField') : ''}
                ></Input>
                <TextDescription>{t("changePass.ConfirmPass")}</TextDescription>
                <Input
                    style={{ marginBottom: 10, width: '100%' }}
                    secureTextEntry={true}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    errorMessage={confirmPasswordEmpty ? t('createAccount.requiredField') : ''}>
                </Input>
                {
                    newPassword !== confirmNewPassword
                        ?
                        <Text
                            style={{
                                color: 'red',
                                alignSelf: 'center'
                            }}
                        >{t('createAccount.passwordsDontMatch')}</Text>
                        :
                        null
                }
                <RowConfirmation>
                    {
                        (editable) &&

                        <ContainerCancelButton onPress={() => cancel()}>
                            <CancelButton>{t('validation.cancel')}</CancelButton>
                        </ContainerCancelButton>
                    }

                    {
                        !editable
                        && (
                            <ContainerSVG
                                onPress={() => save()}
                            >
                                <FontAwesome
                                    name={'pencil'}
                                    size={30}
                                    color="black"
                                />
                            </ContainerSVG>)}
                    {
                        editable
                        && <SaveButton
                            onPress={() => save()}
                        ><SaveButtonText>Salvar</SaveButtonText>
                        </SaveButton>}

                </RowConfirmation>

            </ConteinerInfo >
            :
            <ButtonConfigure onPress={() => setEditable(true)}>
                <TextButton>{t("configScreen.ChangePass")}</TextButton>
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
                toastMessage(false, "Conta excluída !")
            } else {

                toastMessage(false, "Preencha os campos corretamente")
            }

        } catch (error) {

            toastMessage(false, "Erro de conexão");
        };

        setDeletable(false)
    };
    return (
        deletable ?
            (
                <ConteinerInfoDelete style={{ marginTop: 16, marginBottom: 20 }}>
                    <TextHeader>{t("exclude.Header")}</TextHeader>
                    <TextDescription>
                        {t("exclude.LabelUser")}
                    </TextDescription>
                    <Input
                        style={{ width: '90%' }}
                        placeholder={t("exclude.placeholder")}
                        secureTextEntry={true} value={password}
                        onChangeText={setPassword}
                    ></Input>
                    <RowConfirmation>
                        <HorizontalButtonsContainer>
                            <DeleteAccountButton
                                onPress={() => setDeletable(false)}>
                                {t('validation.cancel')}
                            </DeleteAccountButton>
                            <ConfirmButton onPress={() => handleDelete()}>EXCLUIR</ConfirmButton>
                        </HorizontalButtonsContainer>

                    </RowConfirmation>
                </ConteinerInfoDelete>
            )
            :
            (
                <ButtonConfigure onPress={() => setDeletable(true)}>
                    <TextButton>{t('configScreen.DesactiveAccount')}</TextButton>
                </ButtonConfigure>
            )
    )
};

export function ConfigureAccount() {
    const { t } = useTranslation();
    const { user, modifyUser } = useUser();
    const [editablePass, setEditablePass] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [deletable, setDeletable] = useState(false);
    const [imageSelect, setImageSelect] = useState(user?.pfp);

    useEffect(() => {
        setImageSelect(user?.pfp)
    }, [user]);

    useEffect(() => {
        (async () => {
            const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            });

            setLoadingImage(true);
            await upload(result, user, modifyUser)
            setLoadingImage(false);

        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <Container >
            {!editablePass &&
                <>
                    <TextHeader>{t("configScreen.Header")}</TextHeader>
                    <ContainerImage>
                        <AreaImage>
                            {
                                !loadingImage ?
                                    (imageSelect !== null ?
                                        <Image
                                            source={
                                                { uri: variables.IMAGES_URL + imageSelect }
                                            }
                                            style={{
                                                width: "100%",
                                                height: "100%"
                                            }}
                                        />
                                        :
                                        <ButtonImage onPress={() => pickImage()}>
                                            <MaterialIcons name="add-a-photo" size={40} color="#dddddd" />
                                        </ButtonImage>)
                                    :
                                    <AreaImage>
                                        <Loading loading={loadingImage} size={40} />
                                    </AreaImage>
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