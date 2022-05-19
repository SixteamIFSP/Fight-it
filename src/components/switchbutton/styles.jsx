import styled from  'styled-components/native';

export const SwitchForm = styled.TouchableOpacity`
    margin-left:5px;
    margin-right:5px;
    margin-top: 10px;
    width: 35%;
`;

export const SwitchText = styled.Text`
    text-align:center;
    width:100%;
    padding: 10px;
    border-radius:25px;
    color: ${({change}) => change ? '#ffffff' : '#000000'};
    background-color: ${({change}) => change ? '#000000' : '#ffffff'};
`