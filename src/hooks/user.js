import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { tokenKey } from '../configuration/constants'; 
import { toastMessage } from '../util/toastMessage';

export const UserContext = createContext();

const data = {
    nome: 'rian',
    email: 'riansm100@gmail.com',
    userID: '5',
    tipoUsuario: 1,
    pfp: "f9d20e32d01fe870da44cc00067b6dbf",
}

function UserProvider({ children }) {
    const [user, setUser] = useState(data ? data : null);

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
            if (!response?.data.status) { 
                toastMessage(false, response?.data.mensagem);
                return
            }

            await AsyncStorage.setItem(tokenKey, JSON.stringify(response.data.token))
            modifyUser({
                nome: response.data.nome,
                email: response.data.email,
                userID: response.data.userID,
                tipoUsuario: response.data.tipoUsuario,
                pfp: response.data.pfp,
            });
            toastMessage(true, "Login efetuado com sucesso");
        } catch (error) {  
            toastMessage(false, "Erro de conexão!");
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

