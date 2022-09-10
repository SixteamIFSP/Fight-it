import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/user"
import { CalendarList,  LocaleConfig} from "react-native-calendars";
import { ClassText, Container, ContainerFlat, ContainerList, ContentListagem } from "./styles";
import { getCalendar } from "../../controler/calendar";

export function CalendarTeacher({ navigation, route }){
    const { t } = useTranslation();
    const { user } = useUser();
    const [dates, setDates] = useState([]);
    const isFocused = useIsFocused();
    const [ isLoading, setLoading ] = useState(false);

    useEffect(()=>{
        function effect (){
            console.log("Calendar", isFocused );
            handleLoading();
        };
        isFocused && effect();
    }, [isFocused])

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

                markedDates={{
                    '2022-09-07': {marked: true},
                    '2022-09-04': {marked: true},
                    '2022-09-05': {marked: true, dotColor: 'red', activeOpacity: 0},
                    '2022-09-06': {disabled: true, disableTouchEvent: true}
                }}

                theme={{
                    backgroundColor: '#d1d1d1',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'black',
                    indicatorColor: 'black',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 18,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12
                }}

                onDayPress={(day) => {
                    console.log('selected day', day);
                }}
                onDayLongPress={(day) => {
                    console.log('selected day', day);
                }}
                
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
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
                    {/* {<ContentListagem
                        data={dataAlunos}
                        renderItem={
                            ({ item }) => <Text>{item.name}</Text>}
                        keyExtractor={item => `${item.Nome}` + '91'}>
                    </ContentListagem> } */}
                </ContainerFlat>
            </ContainerList>
        </Container>
    )
} 