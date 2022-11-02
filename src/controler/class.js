import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";
import axios from "axios";

export async function getClass(setClasses, idUsuario, type){
    try {
        let response;
        if (type){
            response = await api.get(`/turma/busca/${idUsuario}`);
       } else {
            response = await api.get(`/turma/busca/aluno/${idUsuario}`);
       }
       
       setClasses(response?.data.resultado || []);
    } catch (error) {
        console.log(error);
        toastMessage(false, 'Erro de conexão!');
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

export async function changeClass(data){
    try {
        const response = await api.post(`/turma/alterar`, {...data});

        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 

        } else{
            toastMessage(false, response?.data.mensagem) 
        }

    } catch(error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function getAllDataClass(setAlunos, setClass, data){
    axios.all(
        [
            api.get(`/turma/alunos/${data}`), 
            api.get(`/aula/busca_turma/${data}`),
    ]
    ).then(axios.spread((responseAlunos, responseAula) => {     
        setAlunos(responseAlunos?.data.result || [])
        setClass(responseAula?.data.result || [])
        
    }))
    .catch((error)=>{
        console.log(error);
    })
}

export async function getAulasByTurma(setAulas,  turmaid){

        try {
            const response = await api.get(`/aula/busca_turma/${turmaid}`)
            if (response?.data.status){
                setAulas(response?.data.result || []);
    
            } else{
                if (response?.data.result == null)
                    toastMessage(false, 'Aulas não encontradas');
                else 
                    toastMessage(false, 'Erro ao buscar dos dados');
            }
            
        } catch (error) {
            console.log(error.message)
            toastMessage(false, 'Erro de conexão!') 
        }
}

export async function getAlunosTurma(setAlunos, data){ // data => number
    try {
        const response = await api.get(`/turma/alunos/${data}`);

        if (response?.data.status){
            setAlunos(response?.data.result || []);

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

export async function removeAula(id){
    try {
        const response = await api.delete(`/aula/deletarAula/${id}`);
        toastMessage(response?.data.status, response?.data.message)

    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function deleteAluno(data){
    try {
        const response = await api.post(`/turma/excluir/aluno`, {...data});  
            toastMessage(response?.data.status, response?.data.mensagem)
    
        
    } catch (error) {
        console.log(error)
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function getAulaByAulaID(aulaID, setAula){
    

    try {
        const response = await api.get(`/urlDeBuscarAulaPorIDaindaNãoDesenvolvida` + aulaID);
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem)
            setAula(response?.data)
        } else{
            
            setAula(null)
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
        setAula(null)
    }
}


export async function postAulaFeedback(aulaid, message) { 
    try {
        const response = await api.post(`/urlPostAulaFeedback` + aulaid, {message});
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem)
        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}


