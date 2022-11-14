import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/button';
import { MaterialView } from '../../components/materialView'
import { UploadMaterialComponent } from '../UploadMaterial';
import { BackButtonContainer } from './style';

export function AlunoViewMaterial({navigation, route}) { 
    return (
      <MaterialView aulaId={route?.params?.aulaId}></MaterialView>
      )
}

export function MaterialViewComponent({aula, handleBack}) {
  const {t} = useTranslation();
  const [currentView, setCurrentView] = useState(1);

  function changeScreem(screen){
    setCurrentView(screen);
  }

  const view = {
    1: <MaterialView aulaId={aula.id} goBack={handleBack} handle={()=>changeScreem(2)}/>,
    2: <UploadMaterialComponent aula={aula} goBack={()=>changeScreem(1)}/>
  }

  return (
          view[currentView]
    )
}