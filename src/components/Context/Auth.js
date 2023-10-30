import { createContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_bd");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0]);
        }
    }, []);

    const signin = (email, password) => {
        let token = Math.random().toString(36).substring(2)
        let user = {
            email: email,
            senha: password,
            token: token
        }
        let usuario = JSON.stringify(user)
        const headers = {
            'Content-Type': 'application/json',
        };
        console.log(usuario)
        axios
            .post('http://localhost:8080/usuario', usuario, {headers})
            .then((response) => {
                console.log('POST request bem-sucedido:', response);
                localStorage.setItem("user_token", JSON.stringify({ email, token }));
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Erro ao enviar o POST request:', error);    

                toast.error('Ocorreu um erro ao tentar fazer o login!', {
                    position: 'top-right', // Posição da notificação
                    autoClose: 3000,      // Duração em milissegundos
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
            })


    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signout }}
        >
            {children}
        <ToastContainer /> 
        </AuthContext.Provider>
        
    );
};
