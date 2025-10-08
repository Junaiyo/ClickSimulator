import React, {useState} from "react";
import "/src/styles/style.css";
import {ShowInventory} from "./showinventory";

export const Inventory = (props) => {
  const {armaduras, armas, setarmors, setarmadura} = props;
  const [levels, setLevels] = useState({
    "Calça de couro": 0,
    "Peitoral de couro": 0,
    "Espada de madeira": 0,
    "Arco de madeira": 0,
    "Peitoral de ferro": 0,
    "Peitoral de ouro": 0,
    "Peitoral de diamante": 0,
    "Peitoral de obsidiana": 0
  })

  const alterLevels = (item, value) => {
    let newLevels = {...levels};
    newLevels[item] += value;
    setLevels(newLevels);
  }
  
  return (
    <>
    <div className="Loja ArmorMenu" id="InvArma">
      
      {armas.length>0 ? armas.map((arma, index) => <ShowInventory key={index} item={arma[0]} imgName={arma[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={arma[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped} setclicks={props.setclicks} setarmas={setarmors} setarmadura={setarmadura} armas={armas} armaduras={armaduras} multiplier={props.multi} savegame={props.savegame} alterLevels={alterLevels} levels={levels}/>) : <h2>Você não tem nenhuma arma</h2>}
      
    </div>
    <div className="Loja ArmorMenu" id="InvArmadura">

      {armaduras.length>0 ? armaduras.map((armadura, index) => <ShowInventory key={index} item={armadura[0]} imgName={armadura[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={armadura[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped} setclicks={props.setclicks} setarmas={setarmors} setarmadura={setarmadura} armas={armas} armaduras={armaduras} multiplier={props.multi} savegame={props.savegame} alterLevels={alterLevels} levels={levels}/>) : <h2>Você não tem nenhuma armadura</h2>}
        
    </div>
    </>
  )
}