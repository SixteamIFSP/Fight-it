import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    width:100%;
    z-index:0;
`;
// Visualização de turma
export const ContainerList = styled.SafeAreaView`
    flex:1;
    padding-top:10%;
    padding-left:10%;
    padding-right:10%;
`;
export const CardView = styled.TouchableOpacity`
    z-index:1;
    width:100%;
    height:auto;
    padding:10px;
    margin-bottom:20px;
    border-color:black;
    border-width:0.5px;
    border-radius:4px;
    background-color: white;
`;
export const CardTitle = styled.Text`
    color:#000;
    font-size:24px;
    font-weight:bold;
    margin-bottom:20px;
`;
export const CardDescription = styled.Text`
    color:#000;
    font-size:18px;
    margin-bottom:20px;
`;
//Criação de turma
export const ContainerTitle = styled.View`
    width:100%;
    padding:20px;
    margin-bottom:20px;
`;
export const TextTitle = styled.Text`
    text-align:center;
    font-size:25px;
`;
export const ContainerForm = styled.View`
    align-items: center
    width:100%;
    margin-bottom:30px;
`;
export const CardCreateClasss = styled.View`
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;
    border-top-width:6px;
    borderColor: #3d3d3d;
    border-width:0.5px;
    border-radius: 4px;
    borderStyle: solid;
    width:90%;
    padding:16px;
    background-color: white;
`;
