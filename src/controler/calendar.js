import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function getCalendar(id, type, setDates){
    try {
        let response;
        if (type){
            response = await api.get(`/aula/busca_professor/${id}`);
        } else {
                response = await api.get(`/aula/busca_aluno/${id}`);
        }
       
        if (response?.data.status)
            setDates(response.data.result)
       
    } catch (error) {
        console.log(error);
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function getArrayDates(id, type, setDates){
    try {
        let response;
        if (type){
            response = await api.get(`/aula/diaAulaProfessor/${id}`);
        } else {
            response = await api.get(`/aula/diaAulaAluno/${id}`);
        }
        console.log(response.data);
       
        if (response?.data.status)
            setDates(response.data.result)
       
    } catch (error) {
        console.log(error);
        toastMessage(false, 'Erro de conexão!') 
    }
}