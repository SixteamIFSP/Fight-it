import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";


export async function upload(image, user, modifyUser){

    try {
        const form = new FormData();
        form.append('image', {
            uri: image.uri,
            name: 'image.jpg',
            type: 'image/jpeg'
        })
      
        const response = await api.post(`/imagem/document`,  form, { headers: {'Content-Type': 'multipart/form-data'}});

        if (response?.data.status){
            await setImagePerson({...response?.data, ...user});
            modifyUser({...user, pfp:response?.data.Key});
        } else{
            toastMessage(false, response?.data.mensagem);
        }

    } catch (error) {
        toastMessage(false, 'Erro de conexão!');
    }
}

export async function setImagePerson (responseImage){   
    let response; 
    data = {
        0:{
            aluno: responseImage.userID,
            imagekey: responseImage.Key,
        },
        1:{
            professor: responseImage.userID,
            imagekey: responseImage.Key,
        },
    }

    console.log(data[1]);


    try {
        if (responseImage.tipoUsuario===1){
            response = await api.post(`/imagem/document/pfp/professor`, {professor:responseImage.userID, imagekey: responseImage.Key});
        } else {
            response = await api.post(`/imagem/document/pfp/aluno`, {aluno: responseImage.userID, imagekey: responseImage.Key,});
        }

        if (response?.data.status){

            toastMessage(true,  response?.data.mensagem);
        } else{
            toastMessage(false, response?.data.mensagem);
        }
        

    } catch (error) {
        
    }


}