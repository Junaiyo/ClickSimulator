import React from 'react';
import "/src/styles/style.css";

export const Login = () => {
  return (
    <div>
      <h1 className="ClickTitle">Click Simulator (Beta 1)</h1>
      <h2>Login</h2>
      <h2>Sistema de login inacabado</h2>
      <button className="guest-login" onClick={() => {window.location.href="/#/home"}}>Entrar como visitante</button>
    </div>
  )
}