import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const styles = StyleSheet.create(
   { 
      dropdown2BtnStyle: {
      width: '100%',
      height: 50,
      marginTop:'5%',
      backgroundColor: '#9d9d9d',
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: '#FFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
   }
)


 export const Container = styled.View`
    flex:1;
    width:100%;
 `;

 export const TextHeader = styled.Text`
    text-align:center;
 `;

 export const ContainerEvaluation = styled.View`
    width:100%;
    height:60%;
    border-width:1px;
    border-color:black;
    margin-bottom: 
 `;
 
 export const EvaluationList = styled.FlatList`
    width:100%;
 `;

 export const EvaluationSelect = styled.TouchableOpacity`
    padding:2%;
    margin:5%;
    margin-bottom:1px;
    margin-top:1px;

    ${(props)=>
        props?.select && `
                border-color:black;
                border-width:1px;

            `
    }
 `;

 export const AlingButtons = styled.View`
    flex-direction: row;
    width:100%;
    justify-content:center;
    margin-top:5%;
`;

export const AlingDropDown = styled.View`
   width:100%;
   padding-left:10%;
   padding-right:10%;
   align-items:center;

`; 




