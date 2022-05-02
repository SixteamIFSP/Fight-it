import styled from  'styled-components/native';

export const SwitchForm = styled.TouchableOpacity`
    align-items:center;
    margin-left:5px;
    margin-right:5px;
    width: 35%;
    

`;

export const SwitchText = styled.Text`

    width:100%;
    padding: 10px;
    border-radius:25px;
    color: ${({change}) => change ? '#ffffff' : '#000000'};
    background-color: ${({change}) => change ? '#000000' : '#ffffff'};
`