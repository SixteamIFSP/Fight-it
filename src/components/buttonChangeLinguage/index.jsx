import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTranslation } from "react-i18next";

export function ButtonLinguage() {
    const { t, i18n } = useTranslation();
    const [linguage, setLinguage] = useState(true);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    function changeLinguage() {
        setLinguage((value) => !value)
    }

    useEffect(() => {
        linguage ? changeLanguage('br') : changeLanguage('en');
    }, [linguage])

    return (
        <TouchableOpacity  onPress={changeLinguage}>
            <Text>{`${t("translate")} ${i18n.language.toUpperCase()}`}</Text> 
        </TouchableOpacity>
    )


}