import { api } from "../services/api";

export async function getDashboard(id, type, setValue){
    try {
        let response;
        if (type){
            response = await api.get(`/dashboard/count_homepageProf/${id}`);
        } else {
            response = await api.get(`/dashboard/count_homepageAluno/${id}`);
        }
       
        setValue(response.data.result || null)
       
    } catch (error) {
        console.log(error);
        //toastMessage(false, 'Erro de conexão!') 
    }
}