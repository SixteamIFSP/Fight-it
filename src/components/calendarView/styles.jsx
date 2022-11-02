import styled from 'styled-components/native'

export const Container = styled.View`
    flex:1;
    width:100%;
    height: 100%;
`;

export const ContainerHeader = styled.View`
    height:55px;
    flex-direction:row;
    align-items:stretch;
    justify-content:center;
    margin-bottom:20px;
    border: solid #d3d3d3;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
`;

export const TextHeaderDate = styled.Text`
    padding-top:5px;
    text-align:center;
`;

export const themeCalendar = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: 'red',
    dayTextColor: '#2d4150',
    textDisabledColor: '#d9e1e8',
    dotColor: 'red',
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
}