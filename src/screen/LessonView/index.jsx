import { t } from "i18n-js";
import { useEffect, useState } from "react";
import { Text, View, FlatList,  TouchableOpacity, } from "react-native";
import { getAulaByAulaID } from "../../controler/class";
import {AulaContainer, Container, Retornar, SubTitle, Title, Value, Equipamentos, MaterialViewButton} from './style'

export function LessonView({navigation, route}) {
    const [aula, setAula] = useState(null)

    //  useEffect(() => {
    //     getAulaByAulaID(route?.params.aulaid, setAula)
    //  }, [])

     function seeMaterialExtra() {
      navigation.navigate('AlunoViewMaterial', {title:'Material Extra da aula:' + aula.topicoAula, aulaId: route?.params?.aulaid});
     }

    return (
        <Container>
          <AulaContainer>
          <Title>{t('lessonView.title')}</Title>
            {!aula && <Text>{t('lessonView.subtitle')}</Text>}

            {aula?.date && aula?.topicoAula && <View style={{width: '100%'}}>
                 <SubTitle>{t('lessonView.topic')}</SubTitle>
                 <Value>{aula?.topicoAula}</Value>

                 <SubTitle>{t('lessonView.date')}</SubTitle>
                 <Value>{aula?.date}</Value>

                 <SubTitle>{t('lessonView.hour')}</SubTitle>
                 <Value>{aula?.time}</Value>

                 <SubTitle>{t('lessonView.description')}</SubTitle>
                 <Value>{aula?.descricao}</Value>

                {/* <SubTitle>Equipamentos:</SubTitle>
                 <Equipamentos
                 data={aula?.equipamentos}
                 renderItem={e => {
                    return <Text>{e}</Text>
                 }}
                 keyExtractor={e=> e}
                 /> */}
                 
                 <MaterialViewButton
                 onPress={seeMaterialExtra}
                 ><Text style={{color: 'white'}}>{t('lessonView.material')}</Text></MaterialViewButton>
                </View>
              }
          </AulaContainer>
             
        </Container>
    )
}