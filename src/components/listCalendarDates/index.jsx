import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useUser } from "../../hooks/user"
import { ClassText, ContainerFlat, ContainerList, ContentListagem } from "./styles";
import { CardAula } from "../cardAula";
import { convertDataUTC, convertDateToBrString, dateSplit } from "../../utils/dateConvert";
import { getCalendarList } from "../../controler/calendar";


export function ListCalendarDates({selectedDate}){
    const { user } = useUser();
    const [dates, setDates] = useState([]);

    useEffect(() => {
        console.log("aaaaa", selectedDate);
        const date = dateSplit(selectedDate);
        console.log(user);

        getCalendarList(user.userID, date, user.tipoUsuario===1, setDates);
    }, [selectedDate]);
    return (
    <ContainerList>
        <ClassText>{"Aulas"}</ClassText>
        <Text>
            Aulas marcadas: {convertDateToBrString(new Date(selectedDate))}
        </Text>
        
            <ContainerFlat>
                { dates.length > 0 ? 
                    <ContentListagem
                    data={dates}
                    renderItem={
                        ({ item }) => <CardAula item={item}/>}
                    >
                    </ContentListagem>
                    :
                    <Text>Não há aulas para essa data</Text>
                }
            
        </ContainerFlat>
    </ContainerList>
    )
}