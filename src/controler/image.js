import { api } from "../services/api";
import { toastMessage } from "../util/toastMessage";


export async function upload(image, user){

    try {
        const form = new FormData();
        form.append('image', {
            uri: image.uri,
            name: 'image.jpg',
            type: 'image/jpeg'
        })

        console.log("form:" ,form);
      

        const response = await api.post(`/imagem/document`,  form, { headers: {'Content-Type': 'multipart/form-data'}});

        console.log(response);

        if (response?.data.status){
            setImagePerson({...response?.data, ...user})
        } else{
            toastMessage(false, response?.data.mensagem);
        }


       
    } catch (error) {
        console.log("erro ", error.message);
        toastMessage(false, 'Erro de conexão!');
    }
}

export async function setImagePerson (responseImage){   
    let response; 

    data = {
        0:{
            aluno: responseImage.userID,
            imagekey: responseImage.imagePath,
        },
        1:{
            professor: responseImage.userID,
            imagekey: responseImage.imagePath,
        },
    }


    try {
        if (responseImage===1){
            response = await api.post(`/imagem/documento/pfp/professor`, data[1]);
        } else {
            response = await api.post(`/imagem/documento/pfp/professor`, data[0]);
        }

        

    } catch (error) {
        
    }


}