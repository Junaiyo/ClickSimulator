import  React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "/src/styles/reset.css";

export const Reset = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleClicker = () => {
    //localStorage.clear("gameData");
    setMsg("Clicker resetado!");
  }

  const handleAdventure = () => {
    //localStorage.clear("aventuraData");
    setMsg("Aventura resetada!");
  }

  return (
    <div className="reset">
      <h1>Resetar progresso</h1>

      <button onClick={handleClicker}>Resetar clicker</button>

      <button onClick={handleAdventure}>Resetar aventura</button>

      <p><small>(O botão não tem confirmação)</small></p>

      {msg && <p>{msg}</p>}
      
      <button className="guest-login changelogs btt" onClick={() =>navigate("/login")}>Voltar</button>
    </div>
  )
}