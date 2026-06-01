import React from 'react';
import "/src/styles/configs.css";
import {handleAll} from "/src/funcs/handleAll";

export const Configs = (props) => {
  const {cStyle, sCStyle, sCC} = props;

  const alterCStyle = (e) => {
    sCStyle(!cStyle);
    const btn = document.getElementById(e.target.id);
    btn.classList.toggle("ButtonS2");
    sCC(cStyle);
    handleAll("Config", null, "Config", "ArmorMenu-active", e);
  }

  return (
    <div className="Configs">
      <button onClick={(e)=>alterCStyle(e)} id="CStyle" className="ButtonS1" value="Config">Estilo 2 de configurações</button>
      <button className="ButtonS1" onClick={()=>alert("Soon")}>Estilo 2 de armaduras</button>
    </div>
  )
}