import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function getParamsAluno(data, setValue ){ // data => { "aluno": number, "turma": number}

    try {
        const response = await api.post(`/desempenho/parametros/aluno`, {...data});
        if (response?.data.status)
            setValue(response?.data.result.parametros || []);

    } catch (error) {
        toastMessage(false, 'Erro de conexão!');
    }
}

export async function getDesempenhoPorParametro(data, setValue ){ // data => { "aluno": number, "parametro": number}
    try {
        const response = await api.post(`/desempenho/busca/desempenho/parametro`, {...data});
       
        if (response?.data.status){
            setValue(response?.data.result.Parametros);

        } else{
            toastMessage(false, response?.data.mensagem);
        }
       
    } catch (error) {
        toastMessage(false, 'Erro de conexão!');
    }
}

export async function getAluno(data, setValue ){ // data:string
    try {
        const response = await api.get(`/aluno/busca/${data}`);
        if (response?.data.status)
            setValue(response?.data.result || []);

    } catch (error) {
        toastMessage(false, 'Erro de conexão!');
    }
}