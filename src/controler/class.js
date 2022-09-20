import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";
import axios from "axios";

export async function getClass(setClasses, idUsuario, type){
    console.log(idUsuario);
    try {
        let response;
        if (type){
            response = await api.get(`/turma/busca/${idUsuario}`);
       } else {
            response = await api.get(`/turma/busca/${idUsuario}`);
       }
       console.log(response?.data.result);
        
        if (response?.data.status){
            setClasses(response?.data.result)
        } else{
            toastMessage(false, response?.data.mensagem)   
        }
       
    } catch (error) {
        console.log(error);

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

export async function getAllDataClass(setAlunos, setClass, data){
    axios.all(
        [
            api.get(`/turma/alunos/${data}`), 
            api.get(`/aula/busca_turma/${data}`),
    ]
    ).then(axios.spread((responseAlunos, responseAula) => {
        console.log('aaaaa', data,responseAlunos.data, responseAula.data);
     
        setAlunos(responseAlunos?.data.result || [])
        setClass(responseAula?.data.result || [])
        
    }))
    .catch((error)=>{
        console.log(error);
    })
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
        const response = await api.delete(`/aula/deletarAula`, {aula});
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem) 

        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}

export async function deleteAluno({turma, aluno}){
    console.log(`/turma/excluir/aluno`, {turma, aluno});

    try {
        const response = await api.post(`/turma/excluir/aluno`, {turma, aluno});
        if (response?.data.status){
            toastMessage(true, response?.data.mensagem)
        } else{
            toastMessage(false, response?.data.mensagem) 
        }
        
    } catch (error) {
        toastMessage(false, 'Erro de conexão!') 
    }
}


