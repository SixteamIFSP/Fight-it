import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Button } from "../button";
import {AulaContainer, Container, SubTitle, Title, Value, MaterialViewButton, BackButtonContainer} from './styles';

export function LessionComponent({aula, seeMaterialExtra, handleBack}) {
    const { t } = useTranslation();

    return(
        <Container>
          <AulaContainer>
          <Title>{t('lessonView.title')}</Title>
            {!aula && <Text>{t('lessonView.subtitle')}</Text>}

            {aula?.Data && aula?.NomeAula && <View style={{width: '100%'}}>
                 <SubTitle>{t('lessonView.topic')}:</SubTitle>
                 <Value>{aula?.NomeAula}</Value>

                 <SubTitle>{t('lessonView.date')}</SubTitle>
                 <Value>{new Date(aula?.Data).toLocaleDateString()}</Value>

                 <SubTitle>{t('lessonView.hour')}</SubTitle>
                 <Value>{new Date(aula?.Data).toLocaleTimeString()}</Value>

                 <SubTitle>{t('lessonView.description')}</SubTitle>
                 <Value>{aula?.Descricao}</Value>
                 
                 
                 <MaterialViewButton
                 onPress={seeMaterialExtra}
                 ><Text style={{color: 'white'}}>{t('lessonView.material')}</Text></MaterialViewButton>
                </View>
              }
              {   
                (handleBack) ?  
                  <BackButtonContainer>
                    <Button handle={handleBack} text={t('loadingClass.backButton')}></Button>
                  </BackButtonContainer>
                  : <></>
              }
          </AulaContainer>
          
        </Container>
    )
}