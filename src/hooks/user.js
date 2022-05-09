import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'
import { tokenKey } from '../configuration/constants';

export const UserContext = createContext();

function UserProvider({children}){
    const [user, setUser] = useState(null);

    async function singIn({mail, pass}){
        try {
            const response = await api.post('/user/login', {email:mail, senha:pass});

            console.log(response);

            if (!response?.data.status){
                console.log("Erro de autenticação");
            return
            }

        console.log(response.data.mensagem);
        await AsyncStorage.setItem(tokenKey, JSON.stringify(response.data.token))
        setUser({
            nome: response.data.nome,
            email:response.data.email,
            userID: response.data.userID,
            tipoUsuario: response.data.tipoUsuario,
        });
        } catch (error) {
            console.log(error.message);
        }

    }

    async function logOut(){
        setUser(null);
        await AsyncStorage.removeItem(tokenKey);
    }

    return (
        <UserContext.Provider value={{
            singIn,
            logOut,
            user,
            }}>

            {children}
        </UserContext.Provider>
    )
}

function useUser(){
    const context = useContext(UserContext);

    return context;
}

export {useUser, UserProvider}

