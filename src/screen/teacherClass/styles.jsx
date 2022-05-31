import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    width:100%;
    z-index:0;
    background-color:#fff;
    
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
    height:150px;
    padding:10px;
    margin-bottom:20px;
    border-color:black;
    border-width:1px;
    border-radius:10px;
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
`

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
    width:100%;
    padding-left:15%;
    justify-content:center;
    margin-bottom:30px;
`;

