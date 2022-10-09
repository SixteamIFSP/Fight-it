import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getAulaByAulaID } from "../../controler/class";
import {AulaContainer, Container, Retornar, SubTitle, Title, Value, Equipamentos} from './style'

export function LessonView({aulaid, onBack}) {
    const [aula, setAula] = useState({})

     useEffect(() => {
        getAulaByAulaID(aulaid, setAula)
     }, [])

    return (
        <Container>
            <Retornar onPress={onBack}><Text style={{color: 'white'}}>Retornar</Text></Retornar>
          <AulaContainer>
          <Title>Visualizar aula</Title>
            {!aula && <Text>Aula não encontrada</Text>}

            {aula && <View style={{width: '100%'}}>
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
                    return <Text  >Equipamento</Text>
                 }}
                 keyExtractor={e=> e}
                 />
                </View>}
          </AulaContainer>
             
        </Container>
    )
}