import styled from "styled-components/native";

export const HeaderContainerDescription = styled.View`
    margin:20px;
    margin-bottom: 0;
`

export const TextHeaderDescription =  styled.Text`
    font-size:16px;
`

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
    border-top-width:6px;
    border-color: #3d3d3d;
    border-style: solid;
`;
export const CardTitle = styled.Text`
    color:#000;
    font-size:16px;
    font-weight:bold;
    margin-bottom:20px;
`;
export const CardDescription = styled.Text`
    color:#000;
    font-size:18px;
    margin-bottom:20px;
`;

export const ViewButton = styled.View`
    width:100%;
    margin-top:20px;
    margin-bottom:20px;
    align-items:center;
`;