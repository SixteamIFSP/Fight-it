import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";

export async function getClass(setClasses, idUsuario, type){
    
    try {
        let response;
        if (type){
            response = await api.get(`/turma/busca/${idUsuario}`);
       } else {
            response = await api.get(`/turma/busca/${idUsuario}`);
       }
        
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem)
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
        response = await api.post(`/turma/criar`, {...data});

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

        if (response?.data.status & response?.data.result.length > 0){
            setAlunos(response?.data.result)

        } else{
            if (response?.data.result.length == 0)
                toastMessage(false, 'Turma sem alunos') 
            else 
                toastMessage(false, 'Erro ao buscar dos dados') 
        }
        
    } catch (error) {
  
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