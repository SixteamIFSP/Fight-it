import { api } from "../services/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useUser } from "../hooks/user";

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
                toastMensage(true, 'Sucesso')
            } else{
                toastMensage(false, 'ERRO')   
            }
           
        } catch (error) {
            toastMensage(false, 'error') 
        }
}


export async function GetUserAccount(setDataUser,id, type){
    let response;

    try {
        if(type){
            response = await api.get(`/user/busca/professor/${id}`,);
       } else {
            response = await api.get(`/user/busca/aluno/${id}`,);
       }

       
        
        if (response.data.status){
                setDataUser(response?.data.result);
                // toastMensage(true, response?.data.mensagem)
        } else {
            toastMensage(false, 'Erro ao buscar dados')   
        }

        console.log("\nResposta GET DATA;", response.data.result);
       
    } catch (error) {
        console.log('erro:',error)
        toastMensage(false, 'error') 
    }

}

export async function ChangeInfoAccount(data, type){
    try {
        let response;
        if (type){
            response = await api.patch('/user/perfil/professor', {...data});
       } else {
            response = await api.patch('/user/perfil/aluno', {...data});
       }

        console.log("\nRESPOSTA DA CRIACAO;", response?.data);
        
        if (response.data.status){
            toastMensage(true, 'Atualizado com sucesso!')
        } else{
            toastMensage(false, 'Erro ao atualizar')   
        }
       
    } catch (error) {
        console.log(error);
        toastMensage(false, "ERRO INTERNO") ;
    }
}

export async function ChangePassowrd(data, type){
    try {
        let response;
        if (type){
            response = await api.patch('/user/senha/professor', {...data});
       } else {
            response = await api.patch('/user/senha/aluno', {...data});
       }

        console.log("\nRESPOSTA DA alteracao;", response?.data);
        
        if (response.data.status){
            toastMensage(true, 'Atualizado com sucesso!')
        } else{
            toastMensage(false, 'Erro ao atualizar')   
        }
       
    } catch (error) {
        console.log(error);
        toastMensage(false, "ERRO INTERNO") ;
    }
}
