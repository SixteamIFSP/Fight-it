import { useTranslation } from "react-i18next";
import { api } from "../services/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";

function toastMensage(bool, msg){
    Toast.show({
        type: bool ? 'success' : "error",
        text2: msg,
    }); 
}

export async function createAccount(data, type){

    console.log("Data interno", data);
    
        try {
            let response;
            if (type){
                response = await api.post('/user/cadastro/professor', {data});
           } else {
                response = await api.post('/user/cadastro/aluno', {data});
           }
    
            console.log("\nRESPOSTA DA CRIACAO;", response?.data);
            
            if (response.data.status){
                toastMensage(true, 'sucessor')
            } else{
                toastMensage(false, 'error')   
            }
           
        } catch (error) {
            toastMensage(false, 'error') 
        }
}
