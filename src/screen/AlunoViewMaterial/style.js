import styled from 'styled-components/native'




export const Container = styled.View`
 flex: 1;
`

export const Wrapper = styled.View`
height: auto;
width: 100%;
padding: 10px;
`

export const Title = styled.Text`
font-size: 24px;
font-weight: bold;
`

export const Descricao = styled.Text`
font-size: 21px;
margin-top: 10px;
`

export const ImagemMaterial = styled.View`
width: 100%;
height: 300px;
`

export const FeedbackButton = styled.TouchableOpacity`
  background-color: #303030;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
`

export const ModalContainer = styled.View`
position: absolute;
flex: 1;
background-color: rgba(52, 52, 52, 0.8);
height: 100%;
width: 100%;
justify-content: center;
align-items: center;
`

export const Modal = styled.View`
width: 90%;
height: 40%;
background-color: white;
border-radius: 10px;
align-items: center;
padding: 10px;
justify-content: space-around;
`


export const EnviarFeedBack = styled.TouchableOpacity`
margin-top: 10px;
  background-color: #303030;
  border-radius: 5px;
  height: 35px;
  justify-content: center;
  align-items: center;
  width: 100%;
`