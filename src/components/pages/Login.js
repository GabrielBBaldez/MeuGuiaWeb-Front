import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Input from "../Login/Input/input";
import Button from "../Login/Button/button";
import Signin from "../Context/Auth"

import styles from '../module/Login.module.css'

function Login () {
        const {signin} = useAuth()
        const navigate = useNavigate();

        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        const [error, setError] = useState("");

        const handleLogin = () => {
            if (!email | !senha) {
                setError("Preencha todos os campos");
                return;
            }
            
            try{
            signin(email, senha);
          }
          catch{
            setError("Preencha todos os campos");
          }

          };
        return (
            <div className={styles.container}>
                <div className='border'  style={{boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
                <h1 className={styles.texto}>Login</h1>
                        <div className={styles.login}>
                            <Input
                                type="email"
                                placeholder="Digite seu E-mail"
                                value={email}
                                onChange={(e) => [setEmail(e.target.value), setError("")]}
                            />
                        </div>
                        <div className={styles.senha}>
                            <Input
                                type="password"
                                placeholder="Digite sua Senha"
                                value={senha}
                                onChange={(e) => [setSenha(e.target.value), setError("")]}
                            />
                        </div>
                        <div className={styles.erro}>
                            <label>{error}</label>
                        </div>
                        <div className={styles.botao}>
                            <Button Text="Entrar" onClick={handleLogin}/>
                        </div>              
                </div>
            </div>
            
        );
    }
export default Login;
/*

 */