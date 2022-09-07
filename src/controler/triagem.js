import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";

export async function createTriagem(data, id){
    
        try {
              const  response = await api.post('/triagem/criarTriagem', {...data});
  
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


