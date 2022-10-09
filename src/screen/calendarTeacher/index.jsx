import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user"
import { CalendarList,  LocaleConfig} from "react-native-calendars";
import { ClassText, Container, ContainerFlat, ContainerList, ContentListagem, themeCalendar } from "./styles";
import { getCalendar } from "../../controler/calendar";
import { Text } from "react-native";
import { dateToBrDefault } from "../../utils/dateConvert";

export function CalendarTeacher({ navigation, route }){
    const { t } = useTranslation();
    const { user } = useUser();
    const [dates, setDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState({});

    const isFocused = useIsFocused();
    const [ isLoading, setLoading ] = useState(false);

    useEffect(()=>{
        function effect (){
            console.log("Calendar", isFocused );
            handleLoading();
        };
        isFocused && effect();
    }, [isFocused])

    useEffect(()=>{
        if (dates.length === 0) return
        dates.map((date)=>{
            
            setSelectedDates((oldSelectedDates)=> {
                return { ...oldSelectedDates, [new Date(date.data).toISOString().slice(0, 10)]:{selected: true,}}
            })
        })
        
    }, [dates])

    async function handleLoading(){
        if(isLoading) return
        setLoading(true);
        await getCalendar(user.userID, user.tipoUsuario===1, setDates);
        setLoading(false);
    }

    LocaleConfig.locales['pt-BR'] = {
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
    }

    LocaleConfig.locales['en'] = {
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
    }   

    LocaleConfig.defaultLocale = 'pt-BR';

    return(
        <Container>
            <CalendarList
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350
                }}

                markedDates={selectedDates}

                theme={themeCalendar}

                onDayPress={(day) => {
                    console.log('selected day', day);
                }}
                onDayLongPress={(day) => {
                    console.log('selected day', day);
                }}
                
                // onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}  
                windowSize={300}
            />


            <ContainerList>
                <ClassText>{"Aulas"}</ClassText>
                <ContainerFlat>
                    {<ContentListagem
                        data={dates}
                        renderItem={
                            ({ item }) => 
                            <>
                                <Text>{item.nome}</Text>
                                <Text>{dateToBrDefault(new Date(item.data).toISOString().slice(0, 10))}</Text>
                            </>
                            }
                        
                        >
                    </ContentListagem> }
                </ContainerFlat>
            </ContainerList>
        </Container>
    )
} 