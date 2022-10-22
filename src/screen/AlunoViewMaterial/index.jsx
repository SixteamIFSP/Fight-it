import { useEffect, useState } from 'react'
import { Image, ScrollView, Text } from 'react-native'
import { variables } from '../../configuration/constants'
import { getMaterialExtra } from '../../controler/materialExtra'
import {Container, Descricao, ImagemMaterial, Title, Wrapper} from './style'


export function AlunoViewMaterial({navigation, route}) { 

     const [materiais, setMateriais]  = useState([])

    async function getMaterial() { 
        const aulaid = route?.params?.aulaId
        const material = await getMaterialExtra(aulaid)
        console.log('material', material)
       if(material) {
        console.log('caiu')
        setMateriais(material)
       }
    }

    useEffect(() => {
      getMaterial()
      console.log('sdas', !materiais || !materiais?.length)
    }, [])

    return (
        <ScrollView>
         <Container>
         {!materiais || !materiais?.length && (
                <Text>Nenhum material extra encontrado!</Text>
            )}
         {materiais && materiais?.length > 0 && materiais.map(material => {
                return ( 
              <Wrapper  key={material?.aulaId}>
               <ImagemMaterial>
               <Image 
                      source={
                        { uri: variables.IMAGES_URL + material?.key }
                       }
                      style={{
                        width: "100%",
                        height: "100%"
                        }}
                   />

                 </ImagemMaterial>
                 <Title>{material?.nomeMaterial}</Title>
                 <Descricao>{material?.descricao}</Descricao>
               </Wrapper>
                )
               })}
         </Container>
      </ScrollView>
    )
}