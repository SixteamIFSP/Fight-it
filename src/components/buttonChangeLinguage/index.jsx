import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTranslation } from "react-i18next";
export function ButtonLinguage() {
    const { i18n } = useTranslation();
    const [linguage, setLinguage] = useState(true);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    function changeLinguage() {
        setLinguage((value) => !value)
    }

    useEffect(() => {
        linguage ? changeLanguage('br') : changeLanguage('en');
    }, [linguage])

    return (
        <TouchableOpacity onPress={changeLinguage}>
            <MaterialCommunityIcons name="translate" size={24} color="black" />
        </TouchableOpacity>
    )


}