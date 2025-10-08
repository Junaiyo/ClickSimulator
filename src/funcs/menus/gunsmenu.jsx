import React from "react";
import "/src/styles/style.css";
import {ShowItems} from "/src/funcs/showitems";
import {handleAll} from "/src/funcs/handleAll";

export const GunsMenu = (props) => {
  
  return (
    <div className="Loja ArmorMenu" id="GunsMenu">
      <button className="b" onClick={(e) =>handleAll("EspadaMenu", "ArcoMenu", "Espada", "ArmorMenu-active", e)} value="Espada">Espada</button>
      <button className="b" value="Arco" onClick={(e)=>handleAll("EspadaMenu", "ArcoMenu", "Espada", "ArmorMenu-active", e)}>Arco</button>
      
      <div className="Loja ArmorMenu PeitoMenu" id="EspadaMenu">

        <ShowItems item="Espada de madeira" imgName="espada1.png" price={50} multiplier={2} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armas" setsuccess={props.setsuccess} especify="espada"/>
        
      </div>
      
      <div className="Loja ArmorMenu CalcaMenu" id="ArcoMenu">

        <ShowItems item="Arco de madeira" imgName="arco1.png" setsuccess={props.setsuccess} price={50} multiplier={2} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armas" especify="arco"/>
        
      </div>
      
    </div>
  )
}