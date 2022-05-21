import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from 'react-i18next';
import { Input } from '../../components/input';
import { styles as stylesGlobal } from '../../global/styles';
import { ButtonLinguage } from "../../components/buttonChangeLinguage";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";


export function CreateAccountTeacher({ navigation, route }) {
    const { t } = useTranslation();
    const [marcialFight, setMarcialFight] = useState('');

    // const { dataAuth } = route.params;

    function validation() {
        if (valor === '')
            return false

        return true
    };

    function handleConfirm() {
        if (validation()) {
            const data = {

                aluno: {
                    valor: marcialFight,
                }
            }
      
            navigation.navigate('Login');
        } else {
            console.log("error validacao");
        }
    };
    function handleBack() {
        navigation.navigate('CreateAccount');

    };

    return (
        <View style={stylesGlobal.container}>
            <Text>{t(`createAccount.qualification.title`)}</Text>
            <Text style={{ width: "60%" }}>{t(`createAccount.qualification.description`)}</Text>
            <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center" }}>
                <Input placeholder={t(`createAccount.qualification.form-fight`)} value={marcialFight} onChangeText={setMarcialFight} ></Input>
            </View>

            <DoubleButtonConfirmation handleConfirm={handleConfirm} handleBack={handleBack}></DoubleButtonConfirmation>
        </View>
    )
};