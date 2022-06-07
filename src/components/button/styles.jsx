import styled from "styled-components/native";

export const Container = styled.View`
    width:50%;
    flex-direction: row;
    justify-content:center;
`;

export const ButtonConfirm = styled.TouchableOpacity`
    width: 80%;

`;

export const TextButton = styled.Text`
    text-align:center;

    padding: 10px;
    background-color: ${({confirm}) => confirm ? '#3d3d3d' : '#cfcfcf'};
    color: ${({confirm}) => confirm ? '#cfcfcf' : '#3d3d3d'};
    font-weight: bold;
    border-radius:10px;
`;