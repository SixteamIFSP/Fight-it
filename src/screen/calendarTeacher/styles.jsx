import styled from 'styled-components/native'

export const Container = styled.View`
    flex:1;
    width:100%;
    height: 100%;
`;


export const ContainerList = styled.View`
    width: 100%;
    height: 93%;
    border: 0.5px;
    border-color: black;
    background-color: #fff;
    margin-bottom: 20px;
    padding-top: 16px;
    padding-left: 10px;
    `;
    
export const ContentListagem = styled.FlatList`
    width:100%; 
    `;

export const ContainerFlat = styled.View`
    max-height:100%;
    padding: 10px;
`;

export const ClassText = styled.Text`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

export const themeCalendar = {
    backgroundColor: '#d1d1d1',
    calendarBackground: '#d3d3d3',
    textSectionTitleColor: '#2d4150',
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
}