import styled  from 'styled-components/native'

export const Container = styled.View`
    flex:1;
    width:100%;
    height: 100%;
`;
export const ContainerListColumn = styled.View`
    width:90%;
    height:50%;
    flex-direction:column;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
`;

export const ContainerList = styled.View`
    width: 100%;
    height: 100%;
    border: 0.5px;
    border-color: black;
    
    background-color: #fff;
    margin-bottom: 20px;
`;
export const ContentListagem = styled.FlatList`
    width:100%; 
`;
export const ContainerFlat = styled.View`
    max-height:100%;
    padding: 10px;
`;

export const AddContainer = styled.View`
    margin-top:5px;
    justify-content: flex-end;

`;

export const TextDescription = styled.Text`
    width:100%;
    height:10%;
`;

export const TextTouchable = styled.TouchableOpacity`
    padding:5px;
`;
export const ClassText = styled.Text`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;