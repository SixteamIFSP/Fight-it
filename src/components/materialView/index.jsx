import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableWithoutFeedback } from "react-native"
import { postAulaFeedback } from "../../controler/class"
import { getMaterialExtra } from "../../controler/materialExtra"
import { variables } from '../../configuration/constants'

import { Input } from "../input"
import { 
  BackButtonContainer,
  Container,
  Descricao,
  EnviarFeedBack,
  FeedbackButton,
  ImagemMaterial,
  Modal,
  Title,
  Wrapper
} from "./styles"
import { AddButton } from "../addButton"
import { useUser } from "../../hooks/user"
import { Button } from "../button"
import { useTranslation } from "react-i18next"

export function MaterialView({ aulaId, handle, goBack}){
    const [materiais, setMateriais]  = useState([]);
    const [modal, setModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [errorFeedback, setErrorFeedBack ] = useState('') ;

    const {t} = useTranslation();

    const { user } = useUser();
    
   async function getMaterial() {  
        getMaterialExtra(aulaId, setMateriais);
   }

   useEffect(() => {
     getMaterial();
     console.log('sdas', user);
   }, [])

    function handleFeedback(value) {
    setFeedback(value);  
    if(!feedback || feedback.length < 5) {
            setErrorFeedBack('Campo inválido');
            return;
      }
        setErrorFeedBack('');
    }

   function sendFeedback() {
     const aulaid = aulaId;
     postAulaFeedback(aulaid, feedback);
     setFeedback('');
     setModal(false);
   }

   return (
       
        <Container>
        {
          user.tipoUsuario === 1 ? 
            <AddButton handle={handle}></AddButton>
          : <></>
        }
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

                        <BackButtonContainer>
                          <Button handle={goBack} text={t('loadingClass.backButton')}></Button>
                        </BackButtonContainer>
        </Container>  
   )
}