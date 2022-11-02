import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const styles = StyleSheet.create(
   {
      dropdown2BtnStyle: {
         width: '100%',
         height: 50,
         marginTop: '5%',
         backgroundColor: '#9d9d9d',
         borderRadius: 8,
      },
      dropdown2BtnTxtStyle: {
         color: '#FFF',
         textAlign: 'center',
         fontWeight: 'bold',
      }
   }
);

export const Container = styled.View`
    flex:1;
    width:100%;
    padding: 16px;
 `;

export const TextHeader = styled.Text`
    text-align:center;
 `;

export const ContainerEvaluation = styled.View`
    width:100%;
    height:55%;
    border-width:0.5px;
    border-color:black;
    margin-bottom: 20px;
    margin-top: 16px;
    padding-top: 10px;
    background-color: #fff;
 `;

export const EvaluationList = styled.FlatList`
    width:100%;
 `;

export const EvaluationSelect = styled.TouchableOpacity`
    padding:10px;
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    margin-bottom:10px;
    margin-top:12px;
    border-radius: 4px;
    background-color: #3d3d3d;
    ${(props) =>
      props?.select && `
         border-color:black;
         border-width:0.5px;`
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

export const ContainerNewPerformance = styled.View`
   width:90%;
   padding: 20px;
   background-color: #fff;
   align-items:center;
   margin-top: 20px;
`;



