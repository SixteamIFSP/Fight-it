import { useEffect, useState } from "react";
import { Text, View, FlatList,  TouchableOpacity, } from "react-native";
import { getAulaByAulaID } from "../../controler/class";
import {AulaContainer, Container, Retornar, SubTitle, Title, Value, Equipamentos, MaterialViewButton} from './style'

export function LessonView({navigation, route }) {
    const [aula, setAula] = useState(null);

     console.log(route?.params);

    console.log("route", route);

    
    // console.log(aulaid);

    // console.log({route});

    //  useEffect(() => {
    //     getAulaByAulaID(route?.params.aulaid, setAula)
    //  }, [])

     function seeMaterialExtra() {
      navigation.navigate('AlunoViewMaterial', {title:'Material Extra da aula:' + aula.topicoAula, aulaId: route?.params?.aulaid});
     }
     
    return (
        <Container>
          <AulaContainer>
          <Title>Visualizar aula</Title>
            {!aula && <Text>Aula não encontrada</Text>}

            {/* {aula?.date && aula?.topicoAula && <View style={{width: '100%'}}>
                 <SubTitle>Tópico da aula:</SubTitle>
                 <Value>{aula?.topicoAula}</Value>

                 <SubTitle>Data:</SubTitle>
                 <Value>{aula?.date}</Value>

                 <SubTitle>Hora:</SubTitle>
                 <Value>{aula?.time}</Value>

                 <SubTitle>Descrição:</SubTitle>
                 <Value>{aula?.descricao}</Value>
                 <SubTitle>Equipamentos:</SubTitle>
                 <Equipamentos
                 data={aula?.equipamentos}
                 renderItem={e => {
                    return <Text>{e}</Text>
                 }}
                 keyExtractor={e=> e}
                 />
                 
                 <MaterialViewButton
                 onPress={seeMaterialExtra}
                 ><Text style={{color: 'white'}}>Visualizar material extra da aula</Text></MaterialViewButton>
                </View>
              } */}
          </AulaContainer>
             
        </Container>
    )
}