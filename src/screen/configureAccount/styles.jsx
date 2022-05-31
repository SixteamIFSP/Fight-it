import styled from 'styled-components/native'

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
    margin-left:auto;
    margin-right:auto;
    width:90%;
    padding:20px;
    border-width:0.5px;
    border-radius: 4px;
    background-color: white;
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
    margin-left:10px;
`;
export const TextInfo = styled.Text`
    width:100%;
    text-align:left;
    font-size:18px;
`;
export const RowConfirmation = styled.View`
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
    width:50%;
    margin-top: 16px;
    margin-left:auto;
    margin-right: auto;
`;
export const CancelButton = styled.Text`
    text-align:center;
    padding:5px;
    font-size:14px;
    font-weight:bold;
    border-color:black;
    border-width:1px;
    border-radius:5px;
    background-color:rgb(221, 221, 221);
`;
export const ButtonConfigure = styled.TouchableOpacity`
    width:75%;
    margin-top:30px;
    margin-bottom:30px;
    padding:5px;
    border-color:black;
    border-width:1px;
    border-radius:5px;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    background-color: white;
`;
export const TextButton = styled.Text`
    text-align:center;
    font-size:14px;
    font-weight:bold;
    width: 100%;
`;
export const ConteinerInfoDelete = styled.View`
width:90%;
padding: 20px
height:auto;
margin-bottom:20px;
margin-right: auto;
margin-left: auto;
border-color:black;
border-width:0.5px;
border-radius:4px;
background-color: white;
border-top-width:6px;
borderTopColor: #ce0000;
borderStyle: solid;
`;
