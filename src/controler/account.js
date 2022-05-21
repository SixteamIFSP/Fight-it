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
    
        try {
            let response;
            if (type){
                response = await api.post('/user/cadastro/professor', {...data});
           } else {
                response = await api.post('/user/cadastro/aluno', {...data});
           }
            
            if (response.data.status){
                toastMensage(true, response.data.mensagem)
            } else{
                toastMensage(false, 'ERRO')   
            }
           
        } catch (error) {
            console.log(error);
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

export async function DeleteAccount(data, type, logout){ // data => {id:number, senha:string}
    console.log(data, type);

    function desconect(){
        logout();
    }

    try {
        let response;
        if (type){
            response = await api.delete('/user/excluir/professor', {data:{...data}});
       } else {
            response = await api.delete('/user/excluir/aluno', {data:{...data}});
       }
        if (response.data.status){
            toastMensage(true, 'Usuário excluido com sucesso!')
            desconect();
        } else{
            toastMensage(false, 'Erro ao atualizar')   
        }
       
    } catch (error) {
        console.log({...error});
        toastMensage(false, "Erro ao enviar os dados") ;
    }
}
