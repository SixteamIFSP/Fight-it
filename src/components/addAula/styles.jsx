import styled from "styled-components/native";

export const AdicionarAulaContainer = styled.View`
    padding: 20px; 
    flex: 1;
    width: 100%;
`;

export const TextDescription = styled.Text`
    width:100%;
    text-align:center;
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 12px;
    `;

export const TextWhite = styled.Text`
color: white;
font-weight: bold;
`;

export const ClassDateContainer = styled.TouchableOpacity`
    width: 100%;
    margin-bottom:16px;
`;

export const AddEquipamentContainer = styled.TouchableOpacity`
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: baseline;
`;

export const AdicionarAulaButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: #3d3d3d;
    justify-content: center;
    border-radius: 10px;
    width: 30%;
    margin-bottom: 16px;
 `;

export const DeleteButton = styled.TouchableOpacity`
padding: 5px;
border-radius: 10px;
align-items: center;
width: 40px;
`;

export const Equipamento = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;