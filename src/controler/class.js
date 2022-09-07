import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";

export async function getClass(setClasses, idUsuario, type){
    
    try {
        let response;
        if (type){
            response = await api.get(`/turma/busca/${idUsuario}`);
            console.log(response);
       } else {
            response = await api.get(`/turma/busca/${idUsuario}`);
            console.log(response);
       }
        
        if (response?.data.status){
            setClasses(response?.data.result)
        } else{
            toastMessage(false, response?.data.mensagem)   
        }
       
    } catch (error) {
    
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function createClass(data){ // data => { nome:string, descricao:string, professorId:number}
    try {
      const response = await api.post(`/turma/criar`, {...data});
      
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 

        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function getAlunosTurma(setAlunos, data){ // data => number

    try {
        const response = await api.get(`/turma/alunos/${data}`);

        if (response?.data.status){
            setAlunos(response?.data.result);

        } else{
            if (response?.data.result == null)
                toastMessage(false, 'Turma sem alunos');
            else 
                toastMessage(false, 'Erro ao buscar dos dados');
        }
        
    } catch (error) {
        console.log(error.message)
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function adicionarAluno(data){ // data => {turmaId:number, email:string}

    try {
        const response = await api.post(`/turma/adiciona`, {...data});

        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 

        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function deleteTurma(turmaId){
    try {
        const response = await api.delete(`/turma/excluir/turma/${turmaId}`);

        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 
        } else{
            toastMessage(false, response?.data.mensagem) 
        }  
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function adicionarAula(data){

    try {
        const response = await api.post(`/aula/criarAula`, {...data});


        if (response?.data.status){
            toastMessage(true, response?.data.message) 

        } else{
            toastMessage(false, response?.data.message) 
        }
        
    } catch (error) {
        console.log(error);
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function removeAula(aula){

    try {
        const response = await api.patch(`/aula/deletarAula`, {aula});

        console.log(response?.data);

        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 

        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

