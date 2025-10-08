import React, {useState} from 'react';
import "/src/styles/style2.css";
import {useNavigate} from "react-router-dom";

export const ChangeLogs = () => {
  const navigate = useNavigate();
  const versions = ["Beta 1", "Beta1.5", "Beta 2"];
  const vLogs = [["versão inicial"], ["sistema de rebirth", "change logs"], ["sistema de jogos", "sistema de vender armaduras", "sistema de visibilidade de armaduras equipadas", "save automático (a cada 10 minutos ou ação importante)", "limite de inventário (expansível futuramente)"]]
  const [number, setNumber] = useState(0);
  
  return (
    <div className="logs">
      <h1>Change logs</h1>
      <div className="showlogs">
        <h2>{versions[number]}</h2>
        {vLogs[number].map((log, index) => (
      <ul key={index}>
        <li className="msgLog">Adicionado {log}</li>
      </ul>
        ))}
        
        {number < versions.length-1 &&<p className="arrow" onClick={()=>setNumber((prev) => prev+1)}>{">"}</p>}
        
        {number > 0 && <p className="arrow" onClick={()=>setNumber((prev) => prev-1)}>{"<"}</p>}
        
      </div>
      <button className="guest-login changelogs btt" onClick={() =>navigate("/login")}>Voltar</button>
    </div>
  )
}