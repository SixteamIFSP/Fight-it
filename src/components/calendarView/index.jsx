import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { setI18n, useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user"
import { CalendarList,  LocaleConfig} from "react-native-calendars";
import { Container, themeCalendar } from "./styles";
import { getArrayDates, getCalendar } from "../../controler/calendar";
import { convertDataUTC, dateSplit, dateToBrDefault } from "../../utils/dateConvert";
import { ListCalendarDates } from "../../components/listCalendarDates";





export function CalendarView({handleChangeView}){
    const { t } = useTranslation();
    const { user } = useUser();
    const [selectedDate, setSelectedDate] = useState( new Date().setHours(0));
    const [selectedDates, setSelectedDates] = useState({});
    const isFocused = useIsFocused();
    const [ isLoading, setLoading ] = useState(false);

    useEffect(()=>{
        function effect (){
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

        setSelectedDates(() => {return {...object}})
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
/*
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

    LocaleConfig.defaultLocale = 'pt-BR'; */

    LocaleConfig.locales['en'] = {
        monthNames: [
            (t('calendar.monthNames.jan')),
            (t('calendar.monthNames.feb')),
            (t('calendar.monthNames.mar')),
            (t('calendar.monthNames.apr')),
            (t('calendar.monthNames.may')),
            (t('calendar.monthNames.jun')),
            (t('calendar.monthNames.jul')),
            (t('calendar.monthNames.aug')),
            (t('calendar.monthNames.sept')),
            (t('calendar.monthNames.oct')),
            (t('calendar.monthNames.nov')),
            (t('calendar.monthNames.dec'))
        ],

        monthNamesShort: [
            (t('calendar.monthNamesShort.january')),
            (t('calendar.monthNamesShort.february')),
            (t('calendar.monthNamesShort.march')),
            (t('calendar.monthNamesShort.april')),
            (t('calendar.monthNamesShort.may')),
            (t('calendar.monthNamesShort.june')),
            (t('calendar.monthNamesShort.july')),
            (t('calendar.monthNamesShort.august')),
            (t('calendar.monthNamesShort.september')),
            (t('calendar.monthNamesShort.october')),
            (t('calendar.monthNamesShort.november')),
            (t('calendar.monthNamesShort.december'))
        ],

        dayNames: [
            (t('calendar.dayNames.sunday')),
            (t('calendar.dayNames.monday')),
            (t('calendar.dayNames.tuesday')),
            (t('calendar.dayNames.wednesday')),
            (t('calendar.dayNames.thursday')),
            (t('calendar.dayNames.friday')),
            (t('calendar.dayNames.saturday')),
        ],

        dayNamesShort: [
            (t('calendar.dayNamesShort.sun')),
            (t('calendar.dayNamesShort.mon')),
            (t('calendar.dayNamesShort.tue')),
            (t('calendar.dayNamesShort.wed')),
            (t('calendar.dayNamesShort.thu')),
            (t('calendar.dayNamesShort.fri')),
            (t('calendar.dayNamesShort.sat'))
        ],
        
        today: (t('calendar.today'))
    },   
   
    LocaleConfig.defaultLocale = 'en';

   //LocaleConfig.defaultLocale = i18n;


    function addHandle(){
        handleChangeView(2);
    }

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

            <ListCalendarDates addHandle={addHandle} selectedDate={selectedDate}/>
        </Container>
    )
} 