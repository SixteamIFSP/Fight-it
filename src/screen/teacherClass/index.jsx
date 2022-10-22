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
import { createClass } from "../../controler/class";
import { useUser } from "../../hooks/user";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { toastMessage } from "../../utils/toastMessage";
import { useTranslation } from 'react-i18next';
import { LoadingClass } from "../loadingClass";

function CreateClass({ user, setCreateNew }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { t } = useTranslation();

    function confirm() {
        if (name !== '', description != '') {
            const data = {
                nome: name,
                descricao: description,
                professorId: user.userID,
            };
            createClass(data);
            cancel();
        } else {
            toastMessage(false, t("toast.error.blank"));
        };
        
    };
    function cancel() {
        setCreateNew(false);
    };

    return (
        <CardCreateClasss>
            <ContainerTitle>
                <TextTitle>{t('createClass.Header')}</TextTitle>
            </ContainerTitle>
            <ContainerForm>
                <Input
                    value={name}
                    placeholder={t('createClass.Placeholder.Nome')}
                    onChangeText={setName}
                />
                <Input
                    value={description}
                    placeholder={t('createClass.Placeholder.Description')}
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

    function handleNewScreen(screen, params) {
        navigation.navigate(screen, params)
    };

    return (
        <Container>
            {!createNew ?
                (
                    <LoadingClass handleNewScreen={handleNewScreen} user={user} setCreateNew={setCreateNew} navigation={navigation}></LoadingClass>
                ) :
                (
                    <CreateClass user={user} setCreateNew={setCreateNew}></CreateClass>
                )
            }
        </Container>
    );
};