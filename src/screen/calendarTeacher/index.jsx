import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user"
import { CalendarList,  LocaleConfig} from "react-native-calendars";
import { Container, themeCalendar } from "./styles";
import { getArrayDates, getCalendar } from "../../controler/calendar";
import { convertDataUTC, dateSplit, dateToBrDefault } from "../../utils/dateConvert";
import { ListCalendarDates } from "../../components/listCalendarDates";

export function CalendarTeacher({ navigation, route }){
    const { t } = useTranslation();
    const { user } = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date());
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


    function arrayToObject(array){
        var object = {};

        array.map((value) => 
        object[dateSplit(
            convertDataUTC(value).toISOString()
            )] = {marked: true})


        setSelectedDates((value) => {return {...object}})
    }

    async function handleLoading(){
        if(isLoading) return
        setLoading(true);
        await getArrayDates(user.userID, user.tipoUsuario===1, arrayToObject);
        setLoading(false);
    }

    function handleDateSelected(dateCalendar){
        setSelectedDate(new Date(dateCalendar.timestamp))
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
                    handleDateSelected(day);
                }}
                onDayLongPress={(day) => {
                    handleDateSelected(day);
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

            <ListCalendarDates selectedDate={selectedDate}/>

        </Container>
    )
} 