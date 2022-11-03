import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    width:100%;
`;

export const ContainerButtons = styled.View`
    width:75%;
    justify-content:center;
    align-self: center;
    margin-top: 10px;
`;

export const ContentButtons = styled.TouchableOpacity`
    width:100%;
    padding:5%; 
`;

export const TextButtons = styled.Text`
    width:100%;
    text-align:center;
    padding:10px;
    border-width:0.2px;
    border-color:black;
    background-color: rgb(221, 221, 221);

`;

export const ContainerDesempenho = styled.View`
    width:100%;
    padding:5%;
`;

export const DesempenhoHeader = styled.Text`
    margin-bottom:5%;
    padding:5%;
    font-size:20px;
    border-bottom-color:black;
    border-width:1px;
    border-top-width:0;
    border-left-width:0;
    border-right-width:0;

`;

export const ContainerCardParam = styled.TouchableOpacity`
margin-top: 10px;
margin-bottom: 20px;
min-width: 120px;   
background-color: #fff;
padding: 12px;
`;