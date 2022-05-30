import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";

export async function getEvaluetion(idAluno, setValue ){
    try {
        const response = await api.get(`/desempenho/busca/${idAluno}`,);
       
        
        if (response?.data.status){
            setValue(response?.data.result.desempenhos);
        } else{
            toastMessage(false, response?.data.mensagem);
        }
       
    } catch (error) {
        console.log(error);
        toastMessage(false, 'Erro de conexão!');
    }
}

export async function createEvaluetion(data){ //data => nome:string, date:(string:yyyy-MM-dd), idAluno:number

    console.log(data);
    
        try {
            const response = await api.post('/desempenho/criar/desempenho', {...data});
           
            
            if (response.data.status){
                toastMessage(true, response?.data.mensagem)
            } else{
                toastMessage(false, response?.data.mensagem)   
            }
           
        } catch (error) {
            console.log(error);
            toastMessage(false, 'Erro de conexão!') 
        }
}