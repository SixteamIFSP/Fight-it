import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getAulaByAulaID } from "../../controler/class";
import {AulaContainer, Container, Retornar, SubTitle, Title, Value, Equipamentos, MaterialViewButton} from './style'

export function LessonView({navigation, route}) {
    const [aula, setAula] = useState(null)

     useEffect(() => {
        getAulaByAulaID(route?.params?.aulaid, setAula)
     }, [])

     function seeMaterialExtra() {
      navigation.navigate('AlunoViewMaterial', {title:'Material Extra da aula:' + aula.NomeAula, aulaId: route?.params?.aulaid});
     }


    return (
        <Container>
          <AulaContainer>
          <Title>Visualizar aula</Title>
            {!aula && <Text>Aula não encontrada</Text>}

            {aula?.Data && aula?.NomeAula && <View style={{width: '100%'}}>
                 <SubTitle>Tópico da aula:</SubTitle>
                 <Value>{aula?.NomeAula}</Value>

                 <SubTitle>Data:</SubTitle>
                 <Value>{new Date(aula?.Data).toLocaleDateString()}</Value>

                 <SubTitle>Hora:</SubTitle>
                 <Value>{new Date(aula?.Data).toLocaleTimeString()}</Value>

                 <SubTitle>Descrição:</SubTitle>
                 <Value>{aula?.Descricao}</Value>
                 
                 
                 <MaterialViewButton
                 onPress={seeMaterialExtra}
                 ><Text style={{color: 'white'}}>Visualizar material extra da aula</Text></MaterialViewButton>
                </View>
              }
          </AulaContainer>
             
        </Container>
    )
}