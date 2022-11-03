import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function createTriagem(data, alunoId) {
    try {
        const response = await api.post('/triagem/criarTriagem', { ...data, alunoId });
        if (response.data.status) {
            toastMessage(true, response?.data.mensagem, 4000)
            return response?.data?.id
        } else {
            toastMessage(false, response?.data.mensagem, 4000)
        }
    } catch (error) {
        toastMessage(false, 'Erro de conexão!')
    }
}

export async function getTriagem(id) {
    try {
        const response = await api.get(`/triagem/acessarTriagem/${id}`);
        console.log(response.data, 'response da get triagem')
        if (response.data.status) {
            return response?.data?.result
        }
    } catch (error) {
        toastMessage(false, 'Erro de conexão!')
    }
}