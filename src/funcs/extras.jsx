import React, {useState} from 'react';
import "/src/styles/extras.css"
import {handleAll} from "/src/funcs/handleAll";
import {Configs} from "/src/funcs/configs";

export const Extras = () => {
  const  [configs, setConfigs] = useState(false);
  const [configStyle, setConfigStyle] = useState(false);

  return (
    <div className="Extras">
      
      <div className="Loja ArmorMenu" id="Config">
        <Configs cStyle={configStyle} sCStyle={setConfigStyle} sCC={setConfigs}/>
      </div>
      
      {configStyle ? <button onClick={(e)=>handleAll("Config", null, "Config", "ArmorMenu-active", e)} value="Config">Configs2</button> : <button onClick={()=>setConfigs(!configs)} value="Config">Configs</button>}

      {configs && <Configs cStyle={configStyle} sCStyle={setConfigStyle} sCC={setConfigs}/>}
      
    </div>
  )
}