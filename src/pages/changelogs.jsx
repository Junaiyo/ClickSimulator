import React, {useState} from 'react';
import "/src/styles/style2.css";
import {useNavigate} from "react-router-dom";

export const ChangeLogs = () => {
  const navigate = useNavigate();
  const versions = ["V1", "V1.5", "V2", "V3", "V3.5"];
  const vLogs = [["versão inicial"], ["sistema de rebirth", "change logs"],
["sistema de jogos", "sistema de vender armaduras", "sistema de visibilidade de armaduras equipadas", "save automático (a cada 10 minutos ou a cada ação importante)", "limite de inventário (expansível futuramente)"],
["modo de jogo aventura, com 4 ilhas e 16 monstros","modo de jogo adivinha", "inventário expansível", "cooldown para desequipar, vender e melhorar armaduras", "interface levemente melhorada", "removido save a cada 10 minutos, agora só em ações importantes"], ["sistema de buffs temporários e permanentes", "menu de extras", "caminho /reset", "suporte para teclas em partes especificas", "grande bug fix"]]
  const [number, setNumber] = useState(versions.length-1);
  
  return (
    <div className="logs">
      <h1>Change logs</h1>
      <div className="showlogs">
        <h2>{versions[number]}</h2>
        {vLogs[number].map((log, index) => (
      <ul key={index}>
        <li className="msgLog">{log}</li>
      </ul>
        ))}
        
        {number < versions.length-1 &&<p className="arrow" onClick={()=>setNumber((prev) => prev+1)}>{">"}</p>}
        
        {number > 0 && <p className="arrow" onClick={()=>setNumber((prev) => prev-1)}>{"<"}</p>}
        
      </div>
      <button className="guest-login changelogs btt" onClick={() =>navigate("/login")}>Voltar</button>
    </div>
  )
}