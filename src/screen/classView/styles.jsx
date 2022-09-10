import styled from 'styled-components/native'

export const AdicionarAulaContainer = styled.View`
 padding: 20px; 
 flex: 1;
`

export const AdicionarAulaButton = styled.TouchableOpacity`
   padding: 10px;
   width: 232px;
   background-color: #3d3d3d;
   justify-content: center;
   border-radius: 10px;
`

export const RenderAulaContainer = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 5px;
padding-left: 10px;
padding-right: 10px;
height: auto;
`

export const DeleteButton = styled.TouchableOpacity`
 padding: 5px;
 border-radius: 10px;
 align-items: center;
 width: 40px;
`

export const Container = styled.View`
    flex:1;
    width:100%;
    height: 100%;
`;

export const AddContainerView = styled(Container)`
     align-items:center;
     padding: 15px;
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
    height: 93%;
    border: 0.5px;
    border-color: black;
    background-color: #fff;
    margin-bottom: 20px;
    padding-top: 16px;
    padding-left: 10px;
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
    text-align:center;
    font-weight: 700;
    font-size: 16px;
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

export const TextWhite  = styled.Text`
  color: white;
  font-weight: bold;
`
export const Equipamento = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`

export const CancelarAula = styled.TouchableOpacity`
 padding: 4px;
 padding-left: 10px;
 padding-right: 10px;
 background-color: #3d3d3d;
 border-radius: 10px;
`