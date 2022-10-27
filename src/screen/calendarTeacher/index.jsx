import React, { useEffect, useState } from "react";
import { CalendarView } from "../../components/calendarView";
import { useUser } from "../../hooks/user";
import { LoadingClass } from "../loadingClass";
import { AdicionarAula } from "../../components/addAula"

export function CalendarTeacher({ navigation, route }){
    const { user } = useUser();
    const [viewPosition, setViewPosition] = useState(1);
    const [turmaId, setTurmaId] = useState(0)

    function handleBack(){
        setViewPosition(1);
    }

    function handleNewScreen(tela, {data}){
        setViewPosition(3)
        setTurmaId(data.id)
    }

    const view = {
        1:<CalendarView handleChangeView={setViewPosition} />,
        2:<LoadingClass handleBack={handleBack} handleNewScreen={handleNewScreen}  user={user} navigation={navigation} />,
        3:<AdicionarAula setback={handleBack} turmaId={turmaId} ></AdicionarAula>
    }

    return(
       view[viewPosition]
    )
} 