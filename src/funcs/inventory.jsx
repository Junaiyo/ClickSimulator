import React from "react";
import "/src/styles/style.css";
import {ShowInventory} from "./showinventory";

export const Inventory = (props) => {
  const {armaduras, armas} = props;
  
  return (
    <>
    <div className="Loja ArmorMenu" id="InvArma">
      
      {armas.length>0 ? armas.map((arma, index) => <ShowInventory key={index} item={arma[0]} imgName={arma[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={arma[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped}/>) : <h2>Você não tem nenhuma arma</h2>}
      
    </div>
    <div className="Loja ArmorMenu" id="InvArmadura">

      {armaduras.length>0 ? armaduras.map((armadura, index) => <ShowInventory key={index} item={armadura[0]} imgName={armadura[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={armadura[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped}/>) : <h2>Você não tem nenhuma armadura</h2>}
        
    </div>
    </>
  )
}