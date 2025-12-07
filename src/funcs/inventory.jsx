import React, {useState} from "react";
import "/src/styles/style.css";
import {ShowInventory} from "./showinventory";

export const Inventory = (props) => {
  const {armaduras, armas, setarmors, setarmadura} = props;
  const [levels, setLevels] = useState({
    "Calça de couro": {
      "level": 0,
      "max": false,
      "img": "calca1.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "calca1.png"
    },
    "Peitoral de couro": {
      "level": 0,
      "max": false,
      "img": "peito1.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "peito1.png"
    },
    "Espada de madeira": {
      "level": 0,
      "max": false,
      "img": "espada1.png",
      "itemType": "arma",
      "equiped": false,
      "default": "espada1.png"
    },
    "Arco de madeira": {
      "level": 0,
      "max": false,
      "img": "arco1.png",
      "itemType": "arma",
      "equiped": false,
      "default": "arco1.png"
    },
    "Peitoral de ferro": {
      "level": 0,
      "max": false,
      "img": "peito2.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "peito2.png"
    },
    "Peitoral de ouro": {
      "level": 0,
      "max": false,
      "img": "peito3.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "peito3.png"
    },
    "Peitoral de diamante": {
      "level": 0,
      "max": false,
      "img": "peito4.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "peito4.png"
    },
    "Peitoral de obsidiana": {
      "level": 0,
      "max": false,
      "img": "peito5.png",
      "itemType": "armadura",
      "equiped": false,
      "default": "peito5.png"
    }
  })

  const alterLevels = (item, value, isMax, img, equiped, especify) => {
    let newLevels = {...levels};
    newLevels[item]["level"] += value;
    
    if (isMax) {
      newLevels[item]["max"] = true;
    }
    newLevels[item]["img"] = img;
    newLevels[item]["equiped"] = equiped;
    newLevels[item]["itemType"] = especify;
    setLevels(newLevels);
  }

  const alterEquiped = (item, value) => {
    const newLevels = {...levels};
    newLevels[item]["equiped"] = value;
  }

  const resetItem = (item) => {
    const newLevels = {...levels};
    newLevels[item]["level"] = 0;
    newLevels[item]["max"] = false;
    newLevels[item]["img"] = newLevels[item]["default"];
    newLevels[item]["equiped"] = false;
    setLevels(newLevels);
    modifyRest(item);
  }

  const modifyRest = (item) => {
        const type = levels[item]["itemType"];
    const newArr = type === "armadura" ? [...armaduras] : [...armas];
    let index = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][0] === item) {
        index = i+2;
        break;
      }
    }
    for (let i = index; i < newArr.length; i++) {
      let newItem = newArr[index];
      let findNew = newArr.indexOf(newItem);
      newItem[1] = levels[newItem[0]]["img"];
      newArr[findNew] = newItem;
    }
    type === "armadura" ? setarmadura(newArr) : setarmors(newArr);
  }
  
  return (
    <>
    <div className="Loja ArmorMenu" id="InvArma">
      
      {armas.length>0 ? armas.map((arma, index) => <ShowInventory key={arma[0]} item={arma[0]} imgName={arma[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={arma[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped} setclicks={props.setclicks} setarmas={setarmors} setarmadura={setarmadura} armas={armas} armaduras={armaduras} multiplier={props.multi} savegame={props.savegame} alterLevels={alterLevels} levels={levels} invcount={props.invcount} setinvcount={props.setinvcount} alterEquiped={alterEquiped} resetItem={resetItem}/>) : <h2>Você não tem nenhuma arma</h2>}
      
    </div>
    <div className="Loja ArmorMenu" id="InvArmadura">

      {armaduras.length>0 ? armaduras.map((armadura, index) => <ShowInventory key={armadura[0]} item={armadura[0]} imgName={armadura[1]} improvemulti={props.improvemulti} aproveupdate={props.aproveupdate} showPerson={props.showPerson} especify={armadura[3]} handleEquip={props.handleEquip} armorsEquiped={props.armorsEquiped} setArmorsEquiped={props.setArmorsEquiped} setclicks={props.setclicks} setarmas={setarmors} setarmadura={setarmadura} armas={armas} armaduras={armaduras} multiplier={props.multi} savegame={props.savegame} alterLevels={alterLevels} levels={levels} setinvcount={props.setinvcount} invcount={props.invcount} alterEquiped={alterEquiped} resetItem={resetItem}/>) : <h2>Você não tem nenhuma armadura</h2>}
        
    </div>
    </>
  )
}