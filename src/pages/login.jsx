import React from 'react';
import "/src/styles/style.css";
import {useNavigate} from "react-router-dom";

export const Login = () => {
 const navigate = useNavigate();
  
  return (
    <div>
      <h1 className="ClickTitle">Click Simulator (Beta 1)</h1>
      <h2>Login</h2>
      <h2>Sistema de login inacabado</h2>
      <button className="guest-login" onClick={() => {navigate('/home')}}>Entrar como visitante</button>
    </div>
  )
}