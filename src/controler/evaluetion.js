import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function getEvaluetion(data, setValue) {
    try {
        const response = await api.post(`/desempenho/busca/aluno`, { ...data });

        if (response?.data.status) {
            setValue(response?.data.result.desempenhos);
        } 
        
    } catch (error) {

        toastMessage(false, 'Erro de conexão!');
    }
}

export async function createEvaluetion(data) { //data => nome:string, date:(string:yyyy-MM-dd), idAluno:number
    try {
        const response = await api.post('/desempenho/criar/desempenho', { ...data });
        if (response.data.status) {
            toastMessage(true, response?.data.mensagem);
        } else {
            toastMessage(false, response?.data.mensagem);
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!');
    }
}

export async function getTypesParams(setData) {

    try {
        const response = await api.get('/desempenho/tipo_parametro');

        if (response?.data.status) {
            setData(response?.data.resultado)
        } else {
            toastMessage(false, response?.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!')
    }
}
export async function getParams(setData) {
    try {
        const response = await api.get('/desempenho/parametro');

        if (response.data.status) {
            setData(response?.data.resultado)
        } else {
            toastMessage(false, response?.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!')
    }
}

export async function criarParametroDesempenho(data) {
    try {
        const response = await api.post('/desempenho/inserir/parametro/desempenho', { ...data });
        if (response.data.status) {
            toastMessage(true, response?.data.mensagem)

        } else {
            toastMessage(false, response?.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!')
    }
}

export async function criarNovoParametro(data) { //data => {parametro:string,  tipoparametroid:number }


    try {
        const response = await api.post('/desempenho/inserir/parametro', { ...data });


        if (response.data.status) {
            toastMessage(true, response?.data.mensagem)
        } else {
            toastMessage(false, response?.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!')
    }
}