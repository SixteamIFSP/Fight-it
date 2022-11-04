import { toastMessage } from "../utils/toastMessage";
import { api } from "../services/api";




export async function postMaterialExtra( nomeMaterial, descricao, aulaId, key){

    try {
      const body = { 
        nomeMaterial, 
        descricao,
        aulaId,
        key
      }
      
        const response = await api.post(`/materialExtra/registrarArquivo`,  body);

        if (response?.data.status){
            toastMessage(true, 'Material extra públicado com sucesso!')
        } else{
            toastMessage(false, response?.data.mensagem);
        }

    } catch (error) {
        console.log(error)
        toastMessage(false, 'Erro de conexão!');
    }
}


export async function getMaterialExtra(aulaId, setMateriais){

    try {
        const response = await api.get(`/materialExtra/busca_arquivo/` + aulaId);
        if (response?.data.status){
            toastMessage(true, 'Material extra encontrado com sucesso!')
            setMateriais(response?.data?.result)
        } else {
            toastMessage(false, response?.data.mensagem);
        }
    } catch (error) {
        toastMessage(false, 'Erro de conexão!');
    }
}