import styled from "styled-components/native";

export const Container = styled.View`
    width:100%;
    height:70px;
    padding:5px;
    padding-left:20px;
    flex-direction:row;
    border: 1px solid #e0e0e0;
    border-radius:25px;
    margin-bottom:5px;
`

export const InfoContainer = styled.View`
    flex-direction:column;
    width:50%;
`

export const DateDescription = styled.Text`
    font-size:18px;
    font-weight:bold;
`

export const ButtonsContainer = styled.View`
    width:50%;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`