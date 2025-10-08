import React from "react";
import "/src/styles/style.css";
import {handleAll} from "/src/funcs/handleAll";
import {ShowItems} from "/src/funcs/showitems";

export const ArmorsMenu = (props) => {
  
  return (
    <div className="Loja ArmorMenu" id="ArmorMenu">
      <button onClick={(e) =>handleAll("PeitoMenu", "CalcaMenu", "Peito", "ArmorMenu-active", e)} value="Peito">Peitoral</button>
      <button onClick={(e) =>handleAll("PeitoMenu", "CalcaMenu", "Peito", "ArmorMenu-active", e)} value="Calca">Calça</button>
      <div id="PeitoMenu" className="Loja ArmorMenu PeitoMenu">
        
        <ShowItems item="Peitoral de couro" imgName="peito1.png" setsuccess={props.setsuccess} price={50} multiplier={2} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" especify="peito"/>

        <ShowItems item="Peitoral de ferro" imgName="peito2.png" setsuccess={props.setsuccess} price={125} multiplier={3} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" especify="peito"/>

        <ShowItems item="Peitoral de ouro" imgName="peito3.png" setsuccess={props.setsuccess} price={200} multiplier={4} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" especify="peito"/>

        <ShowItems item="Peitoral de diamante" imgName="peito4.png" setsuccess={props.setsuccess} price={500} multiplier={5} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" especify="peito"/>

        <ShowItems item="Peitoral de obsidiana" imgName="peito5.png" setsuccess={props.setsuccess} price={1000} multiplier={6} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" especify="peito"/>
        
      </div>
      <div id="CalcaMenu" className="Loja ArmorMenu CalcaMenu">

        <ShowItems item="Calça de couro" imgName="calca1.png" price={50} multiplier={2} rebirth={0} spr={0} handleBuy={props.handleBuy} success={props.success} type="Armaduras" setsuccess={props.setsuccess} especify="calca"/>
        
      </div>
    </div>
  )
}