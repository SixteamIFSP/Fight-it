import React, { useEffect, useState } from "react";
import { CalendarView } from "../../components/calendarView";
import { useUser } from "../../hooks/user";
import { LoadingClass } from "../loadingClass";
import { AdicionarAula } from "../../components/addAula"
import { LessionViewCalendar } from "../LessonView";

export function CalendarTeacher({ navigation, route }){
    const { user } = useUser();
    const [viewPosition, setViewPosition] = useState(1);
    const [turmaId, setTurmaId] = useState(0);
    const [aulaId, setAulaId] = useState(0);

    function handleBack(){
        setViewPosition(1);
    }

    function handleNewScreen(tela, {data}){
        setViewPosition(3);
        setTurmaId(data.id);
    }

    function handleChangeLessionView(idAula, viewPosition) {
        setAulaId(idAula)
        setViewPosition(viewPosition);
    }

    const view = {
        1:<CalendarView handleChangeView={setViewPosition} handleChangeLessionView={handleChangeLessionView} />,
        2:<LoadingClass handleBack={handleBack} handleNewScreen={handleNewScreen}  user={user} navigation={navigation} />,
        3:<AdicionarAula setback={handleBack} turmaId={turmaId} ></AdicionarAula>,
        4:<LessionViewCalendar aulaId={aulaId} handleBack={handleBack}/>,
    }

    return(
       view[viewPosition]
    )
} 