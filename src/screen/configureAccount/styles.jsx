import  styled  from 'styled-components/native'

export const Container = styled.ScrollView`
    flex:1;
    width:100%;
`;

export const TextHeader = styled.Text`
    width:100%;
    margin:10px;
    margin-left:0px;
    text-align:center;
    font-size:30px;
`;

export const ConteinerInfo = styled.View`
    width:100%;
    padding:20px;
    border-bottom-color:black;
    border-width:1px;
`;

export const TextAlingLine = styled.View`
    flex-direction:row;
    align-items:center;
    margin-bottom:10px;

`;

export const TextDescription = styled.Text`
    font-size:18px;
    text-align:left;
    margin-right:10px;
`;

export const TextInfo = styled.Text`
    width:100%;
    text-align:left;
    font-size:18px;
`;

export  const RowConfirmation = styled.View`
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
`;

export const ContainerSVG = styled.TouchableOpacity`
    width:40px;
    height:40px;
    justify-content:center;
    align-items:center;
   
`;

export const ContainerCancelButton = styled.TouchableOpacity`
    width:35%;
    margin-left:auto;
`;

export const CancelButton = styled.Text`
    text-align:center;
    padding:5px;
    font-size:14px;
    font-weight:bold;
    border-color:black;
    border-width:1px;
    border-radius:5px;
`;

export const ButtonConfigure = styled.TouchableOpacity`
    width:100%;
    margin-top:30px;
    padding:5px;
    border-color:black;
    border-width:1px;
    border-radius:5px;
`;

export const TextButton = styled.Text`
    text-align:center;
    font-size:14px;
    font-weight:bold;
`;
