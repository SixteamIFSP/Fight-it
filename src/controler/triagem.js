import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function createTriagem(data, alunoId){
    try {
            const  response = await api.post('/triagem/criarTriagem', {...data, alunoId});
        if (response.data.status){
            toastMessage(true, response?.data.mensagem)
            return response?.data?.id
        } else{
            toastMessage(false, response?.data.mensagem)   
        }
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function getTriagem(id){
    try {
          const  response = await api.get(`/triagem/acessarTriagem/${id}`);
        if (response.data.status){
            return response?.data?.result
        } 
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}