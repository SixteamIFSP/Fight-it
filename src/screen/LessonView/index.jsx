import { useEffect, useState } from "react";
import { LessionComponent } from "../../components/lessionComponent";
import { getAulaByAulaID } from "../../controler/class";
import { MaterialViewComponent } from "../AlunoViewMaterial";

export function LessonView({navigation, route}) {
    const [aula, setAula] = useState(null)

     useEffect(() => {
        getAulaByAulaID(route?.params.aulaid, setAula)
     }, [])

     function seeMaterialExtra() {
      navigation.navigate('AlunoViewMaterial', {title:'Material Extra da aula:' + aula.NomeAula, aulaId: route?.params?.aulaid});
     }

    return (
        <LessionComponent aula={aula} seeMaterialExtra={seeMaterialExtra} ></LessionComponent>
    )
}

export function LessionViewCalendar({aulaId, handleBack}){
  const [pageView, setView] = useState(1);

  const [aula, setAula] = useState(null)

  useEffect(() => {
    getAulaByAulaID(aulaId, setAula)
  }, []);

  function handleHiddenMaterial(){
    setView(1);
  }

  function seeMaterialExtra(){
    setView(2);
  }

  const view = {
    1: <LessionComponent aula={aula} handleBack={handleBack} seeMaterialExtra={seeMaterialExtra} ></LessionComponent>,
    2: <MaterialViewComponent  handleBack={handleHiddenMaterial} aula={aula}/>
  }

  return (
    view[pageView]
  )
}