import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { tokenKey } from '../configuration/constants';
import Toast from "react-native-toast-message";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(()=>{

        setUser({
            nome        : 'teste',
            email       : 'teste',
            userID      : 1,
            tipoUsuario : 1,
        })
    },[])

    async function modifyUser(value){
        setUser(value)
    }

    async function singIn({mail, pass}, typeTeacher){
        let response;
        try {

            if (typeTeacher){
                 response = await api.post('/user/login/professor', {email:mail, senha:pass});
            } else {
                 response = await api.post('/user/login/aluno', {email:mail, senha:pass});
            }
              

            console.log(response.data);


            if (!response?.data.status) {
                console.log("Erro de autenticação");
                return
            }

            console.log(response.data.mensagem);
            await AsyncStorage.setItem(tokenKey, JSON.stringify(response.data.token))
            modifyUser({
                nome: response.data.nome,
                email: response.data.email,
                userID: response.data.userID,
                tipoUsuario: response.data.tipoUsuario,
            });


        Toast.show({
            type: "success",
            text2: "Login efetuado com sucesso",
        });
        

        } catch (error) {
            console.log(error.message);
            Toast.show({
                type: "error",
                text2: "Erro interno",
            })
        }

    }

    async function logOut() {
        setUser(null);
        await AsyncStorage.removeItem(tokenKey);
    }

    return (
        <UserContext.Provider value={{
            singIn,
            logOut,
            user,
            modifyUser,
        }}>

            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext);
    return context;
}

export { useUser, UserProvider }

