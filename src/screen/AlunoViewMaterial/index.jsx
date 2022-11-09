import { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Input } from '../../components/input'
import { variables } from '../../configuration/constants'
import { postAulaFeedback } from '../../controler/class'
import { getMaterialExtra } from '../../controler/materialExtra'
import {Container, Descricao, EnviarFeedBack, FeedbackButton, FeedbackContainer, ImagemMaterial, Modal, ModalContainer, Title, Wrapper} from './style'

export function AlunoViewMaterial({navigation, route}) { 

     const [materiais, setMateriais]  = useState([])
     const [modal, setModal] = useState(false)
     const [feedback, setFeedback] = useState('')
     const [errorFeedback, setErrorFeedBack ] = useState('') 
     

    async function getMaterial() { 
        const aulaid = route?.params?.aulaId
         getMaterialExtra(aulaid, setMateriais)
    }

    useEffect(() => {
      getMaterial()
      console.log('sdas', !materiais || !materiais?.length)
    }, [])


   function handleFeedback(value) {
    setFeedback(value)  
    if(!feedback || feedback.length < 5) {
            setErrorFeedBack('Campo inválido')
            return
     }
        setErrorFeedBack('')
    }

    function sendFeedback() {
      const aulaid = route?.params?.aulaId
      postAulaFeedback(aulaid, feedback)
      setFeedback('')
      setModal(false)
    }

    return (
        
         <Container>
         {!materiais || !materiais?.length && (
                <Text>Nenhum material extra encontrado!</Text>
            )}
         <FlatList
          keyExtractor={material => material?.id}
          data={materiais}
          renderItem={({item}) => <Wrapper  key={item?.id}>
               <ImagemMaterial>
               <Image 
                      source={
                        { uri: variables.IMAGES_URL + item?.S3Key }
                       }
                      style={{
                        width: "100%",
                        height: "100%"
                        }}
                   />
                 </ImagemMaterial>
                 <Title>{item?.NomeMaterial}</Title>
                 <Descricao>{item?.Descricao}</Descricao>
               </Wrapper>
          }
         ></FlatList>  
       {materiais && materiais?.length > 0 && <FeedbackButton onPress={() => setModal(e => !e)}>
                   <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Envie um feedback!</Text>
               </FeedbackButton>}

               {modal && <TouchableWithoutFeedback onPress={() => setModal(false)}>
                             <ModalContainer>
                              <TouchableWithoutFeedback>
                                 <Modal>
                                       <Text>Enviar feedback</Text>
                                       <Input
                                        style={{ borderColor: `${errorFeedback ? 'red' : 'black'}` }}
                                        onChangeText={(value) => { handleFeedback(value) }}
                                        value={feedback}
                                        placeholder={'Mensagem'}
                                        errorMessage={errorFeedback || ''} />
                                        <EnviarFeedBack onPress={() => sendFeedback()}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Enviar</Text></EnviarFeedBack>
                                 </Modal>
                               </TouchableWithoutFeedback>
                            </ModalContainer>
                         </TouchableWithoutFeedback>}
         </Container>  
    )
}