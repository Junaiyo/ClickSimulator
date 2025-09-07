import React, {useState} from 'react';
import "/src/styles/style.css";
import {LojaMenu} from "/src/funcs/lojamenu";
import {handleAll, handleAll2} from "/src/funcs/handleAll";
import {ArmorsMenu} from "/src/funcs/menus/armorsmenu";
import {GunsMenu} from "/src/funcs/menus/gunsmenu";
import {Inventory} from "/src/funcs/inventory";
import {Status} from "/src/funcs/status";
import {RendPerso} from "./home/rendperso";

export const Home = () => {
  const [clicks, setClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [spentClicks, setSpentClicks] = useState(0);
  const [armas, setArmas] = useState([]);
  const [armaduras, setArmaduras] = useState([]);
  const [rebirths, setRebirths] = useState(0);
  const [spr, setSpr] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [success, setSuccess] = useState(null);
  
  const [showClicks, setShowClicks] = useState(false);
  const [showPerso, setShowPerso] = useState(false);
  const [armorsEquiped, setArmorsEquiped] = useState([]);

  const handleShowClicks = () => {
    setShowClicks(!showClicks);
      setTimeout(() => {
        setShowClicks(false)
      }, 500)
  }
  
  const handleClick = () => {
    setClicks((prev) => prev + 1 * multiplier);
    setTotalClicks((prev) => prev + 1 * multiplier);
    handleShowClicks();
  }

  const handleBuy = (price, rb, sbr, name, itemName, type, especify) => {
    if (price > clicks) {
      setSuccess("Você não tem clicks suficientes");
      return;
    } 
    if (rb > rebirths) {
      setSuccess("Você não tem rebirths suficientes");
      return;
    }
    if (spr > sbr) {
      setSuccess("Você não tem super rebirths suficientes");
      return;
      
    }
    for (let i = 0; i < armaduras.length; i++) {
      if (armaduras[i][0] === name) {
        setSuccess("Você já possui esse item");
        return;
      }
    }
    for (let i = 0; i < armas.length; i++) {
      if (armas[i][0] === name) {
        setSuccess("Você já possui esse item");
        return;
      }
    }

    setClicks((prev) => prev - price);
    setSpentClicks((prev) => prev + price);
    type === "Armaduras" ?setArmaduras((prev) => [...prev, [name, itemName, type, especify]]) : setArmas((prev) => [...prev, [name, itemName, type, especify]]);
    setSuccess("Compra realizada com sucesso");
    return;
  }

  const ImproveMultiplier = (multi) => {
    setMultiplier((prev) => prev + multi);
  }

  const UpdateItem = (price) => {
    if (price > clicks) {
      return false;
    }

    setClicks((prev) => prev - price);
    setSpentClicks((prev) => prev + price);
    return true;
  }

  const setsuccs = (msg) => {
    setSuccess(msg);
  }

  const handleShowPerso = () => {
    setShowPerso(true);
  }

  const improveEquiped = (item, especify) => {
      for (let i = 0; i < armorsEquiped.length; i++) {
        if (armorsEquiped[i][1] === especify) {
          return true;
        }
      }
    
    setArmorsEquiped((prev) => [...prev, [item, especify]]);
  }

  const MakeRB = () => {
    setArmas([]);
    setArmaduras([]);
    setClicks(0);
    setArmorsEquiped([]);
    setShowPerso(false);
    setMultiplier(1);
  }
  
  return (
    <div>
      
      <LojaMenu buttons={[<button onClick={(e) =>handleAll("ArmorMenu", "GunsMenu", "Armadura", "ArmorMenu-active", e)} value="Armadura">Armaduras</button>, <button onClick={(e) =>handleAll("ArmorMenu", "GunsMenu", "Armadura", "ArmorMenu-active", e)} value="Arma">Armas</button>]} components={[<ArmorsMenu handleBuy={handleBuy} success={success} setsuccess={setsuccs}/>, <GunsMenu handleBuy={handleBuy} success={success} setsuccess={setsuccs}/>]} id="Loja"/>
      
      <LojaMenu buttons={[<button value="Armas" onClick={(e) => handleAll("InvArmadura", "InvArma", "Inv", "ArmorMenu-active", e)}>Armas</button>, <button value="Armaduras" onClick={(e)=>handleAll("InvArma", "InvArmadura", "Inv", "ArmorMenu-active", e)}>Armaduras</button>]}components={[<Inventory armaduras={armaduras} armas={armas} improvemulti={ImproveMultiplier} aproveupdate={UpdateItem} showPerson={handleShowPerso} handleEquip={improveEquiped} armorsEquiped={armorsEquiped} setArmorsEquiped={setArmorsEquiped}/>]} id="Inv"/>
      
      <LojaMenu components={[<Status status={[`Clicks: ${clicks}`, `Total de clicks: ${totalClicks}`, `Clicks gastos: ${spentClicks}`, `Multiplicador: ${multiplier}`, `Rebirths: ${rebirths}`, `Super Rebirths: ${spr}`]} rebirths={rebirths} spr={spr} setRebirth={setRebirths} setSpr={setSpr} clicks={clicks} setspentclicks={setSpentClicks} improvemultiplier={ImproveMultiplier} multiplier={multiplier} setRB={MakeRB}/>]} id="Status"/>
      
      <div className="top">
        
        <button onClick={(e) => {
          handleAll2("Loja", ["Inv", "Status"], "Loja", "Loja-active", e);
        }} value="Loja">Loja</button>
        
        <button onClick={(e)=>handleAll2("Status", ["Loja", "Inv"], "Status", "Loja-active", e)} value="Status">Status</button>
        
        <button onClick={(e)=>handleAll2("Inv", ["Loja", "Status"], "Inv", "Loja-active", e)} value="Inv">Inventário</button>
        
      </div>
      
      {showClicks && <p className="anm">+{1 * multiplier}</p>}
      <h3 className="viewclicks">Clicks: {clicks}</h3>
      <h2>Seu personagem:</h2>
      <div className="rendImages">
      <img src="assets/perso.png" className="image InitialPerson" />
      {showPerso && <RendPerso renders={armorsEquiped}/>}
      </div>
      <button className="click" onClick={handleClick}>
        <img src="/assets/mouse.png" alt="click" className="Mouse"/>
      </button>
    </div>
  )
}