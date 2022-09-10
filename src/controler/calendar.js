import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";


export async function getCalendar(id, type, setDates){
    try {
        let response;
        if (type){
            response = await api.get(`/aula/busca_professor/${id}`);
       } else {
            response = await api.get(`/aula/busca_aluno/${id}`);
       }
        console.log(response?.data);
        if (response.data.status){
            toastMessage(true, response?.data.mensagem)
        } else{
            toastMessage(false, response?.data.mensagem)   
        }
       
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}