//PROMETO QUE ALGUM DIA MELHORO O CODIGO
//inclusive sumir com esse monte de props (zustand) e esse componente gigante
//na próxima update farei algumas melhorias de código
import React, {useState, useEffect} from 'react';
import "/src/styles/style.css";
import {LojaMenu} from "/src/funcs/lojamenu";
import {handleAll, handleAll2} from "/src/funcs/handleAll";
import {ArmorsMenu} from "/src/funcs/menus/armorsmenu";
import {GunsMenu} from "/src/funcs/menus/gunsmenu";
import {Inventory} from "/src/funcs/inventory";
import {Status} from "/src/funcs/status";
import {RendPerso} from "./home/rendperso";
import {ShowGames} from "/src/funcs/showgames";
import {Extras} from "/src/funcs/extras";
import {BuffsMenu} from "/src/funcs/menus/buffsmenu";


export const Home = () => {
  const [clicks, setClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [spentClicks, setSpentClicks] = useState(0);
  const [armas, setArmas] = useState([]);
  const [armaduras, setArmaduras] = useState([]);
  const [rebirths, setRebirths] = useState(0);
  const [spr, setSpr] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [inventoryLimit, setInventoryLimit] = useState({
    "peito": 1,
    "calca": 1,
    "espada": 1,
    "arco": 1
  })
  const [inventoryCount, setInventoryCount] = useState({
    "peito": 0,
    "calca": 0,
    "espada": 0,
    "arco": 0
  })

  const [loaded, setLoaded] = useState(false);
  const [reseted, setReseted] = useState(false);
  const [activeBuff, setActiveBuff] = useState(false);
  const [maxBuffs, setMaxBuffs] = useState(1);
  const [buffsActive, setBuffsActive] = useState(0);
  const [permaBuffs, setPermaBuffs] = useState([]);

  const buffs = {
    "2x": () => setMultiplier((prev) =>prev * 2)
  }
  const debuffs = {
    "2x": () => setMultiplier((prev) => prev / 2)
  }
  const [time, setTime] = useState(0);
  const saveGame = () => {
    //se o expansions sumir, criar condição que verifica se existe
    const gameData = {
      clicks: clicks,
      totalClicks: totalClicks,
      spentClicks: spentClicks,
      armas: armas,
      armaduras: armaduras,
      rebirths: rebirths,
      spr: spr,
      multiplier: multiplier,
      armorsEquiped: armorsEquiped,
      showPerso: showPerso,
      inventoryLimit: inventoryLimit,
      inventoryCount: inventoryCount,
      maxBuffs: maxBuffs,
      permaBuffs: permaBuffs
      
    }
    const jsonData = JSON.stringify(gameData);
    localStorage.setItem("gameData", jsonData);
  }

  const loadGame = () => {
    //localStorage.clear();
    const jd = JSON.parse(localStorage.getItem("gameData"));
    if (jd) {
      const funcs = [setClicks, setTotalClicks, setSpentClicks, setArmas, setArmaduras, setRebirths, setSpr, setMultiplier, setArmorsEquiped, setShowPerso, setInventoryLimit, setInventoryCount, setMaxBuffs, setPermaBuffs]
      for (let i = 0; i < funcs.length; i++) {
        funcs[i](jd[Object.keys(jd)[i]])
      }
    }
  }

  useEffect(() => {
    const data = localStorage.getItem("gameData");
    if (!data) {
      saveGame();
    } else {
    loadGame();
    }
    setLoaded(true);
  }, []);

  const expandInventory = (type, expansions, value) => {
    const newInv = {...inventoryLimit};
    newInv[type] += 1;
    setInventoryLimit(newInv);
    const data = JSON.parse(localStorage.getItem("gameData"));
    data.inventoryLimit = newInv;
    data.expansions = expansions;
    data.clicks = data.clicks - value;
    localStorage.setItem("gameData", JSON.stringify(data));
  }
  
  const [showClicks, setShowClicks] = useState(false);
  const [showPerso, setShowPerso] = useState(false);
  const [armorsEquiped, setArmorsEquiped] = useState([]);

  const handleShowClicks = () => {
    setShowClicks(!showClicks);
      setTimeout(() => {
        setShowClicks(false)
      }, 500)
  }

  //...
  const [gainn, setGain] = useState(1);
  const handleClick = (e) => {
    const elm = document.querySelector(".Mouse");
    elm.classList.add("ClAnim");
    setTimeout(() => {
      elm.classList.remove("ClAnim");
    }, 100);
    document
    let gain = 1;
    if (activeBuff) {
      buffs[activeBuff]();
      setActiveBuff(false);
      setTimeout(() => {
        debuffs[activeBuff]();
        setTime(0);
        setBuffsActive((prev) => prev - 1);
      }, time * 1000)
    }
    let critical = false;
    //REFATORAR BASEADO NO SISTEMA DE SORTE
    if (permaBuffs?.includes("ClCritico")) {
      if (Math.random() < 0.25) {
        critical = true;
        gain = 2;
        setGain(2);
      }
    }
    setClicks((prev) => prev + gain * multiplier);
    setTotalClicks((prev) => prev + gain * multiplier);
    //REFATORAR BASEADO NO SISTEMA DE SORTE
    handleShowClicks();
    //TODo: sistema de impedir autoclicks extremamente rapidos de abusarem de criticos e outras coisas
    setTimeout(() => {
      setGain(1);
    }, 350);
  }

  const handleBuy = (price, rb, sbr, name, itemName, type, especify, setMsg, nums) => {
    if (price > clicks) {
      setMsg(nums, "Você não tem clicks suficientes");
      return;
    } 
    if (rb > rebirths) {
      setMsg(nums, "Você não tem rebirths suficientes");
      return;
    }
    if (spr > sbr) {
      setMsg(nums, "Você não tem super rebirths suficientes");
      return;
    }
    if (inventoryCount[especify] >= inventoryLimit[especify]) {
      setMsg(nums, "Você atingiu o limite de itens desse tipo");
      return;
    }
    for (let i = 0; i < armaduras.length; i++) {
      if (armaduras[i][0] === name) {
        setMsg(nums, "Você já possui esse item");
        return;
      }
    }
    for (let i = 0; i < armas.length; i++) {
      if (armas[i][0] === name) {
        setMsg(nums, "Você já possui esse item");
        return;
      }
    }

    const newInv = {...inventoryCount};
    newInv[especify] += 1;
    setInventoryCount(newInv);
    setClicks((prev) => prev - price);
    setSpentClicks((prev) => prev + price);
    type === "Armaduras" ?setArmaduras((prev) => [...prev, [name, itemName, type, especify]]) : setArmas((prev) => [...prev, [name, itemName, type, especify]]);
    setMsg(nums, "Compra realizada com sucesso");
    const data = JSON.parse(localStorage.getItem("gameData")) || {};
    type === "Armaduras" ? data.armaduras = [...armaduras, [name, itemName, type, especify]] : data.armas = [...armas, [name, itemName, type, especify]];
    data.clicks = clicks - price;
    data.spentClicks = data.spentClicks + price;
    localStorage.setItem("gameData", JSON.stringify(data));
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

  const handleShowPerso = () => {
    setShowPerso(true);
  }

  const improveEquiped = (item, especify, multi=multiplier) => {
      for (let i = 0; i < armorsEquiped.length; i++) {
        if (armorsEquiped[i][1] === especify) {
          return true;
        }
      }
    
    setArmorsEquiped((prev) => [...prev, [item, especify]]);
    const equiped = [...armorsEquiped, [item, especify]];
    const data = JSON.parse(localStorage.getItem("gameData"));
    data.armorsEquiped = equiped;
    data.showPerso = true;
    localStorage.setItem("gameData", JSON.stringify(data));
  }

  const MakeRB = () => {
    setArmas([]);
    setArmaduras([]);
    setClicks(0);
    setArmorsEquiped([]);
    setShowPerso(false);
    setMultiplier(1);
    setBuffsActive(0);
    setActiveBuff(false);
    setTime(0);
  }

  useEffect(() => {
    if (multiplier < 1) {
      setMultiplier(1);
    }
  }, [multiplier])

  if (!loaded) return (
    <div>
      <p>Carregando</p>
    </div>
  )
  
  return (
    <div>
      
      <LojaMenu buttons={[<button onClick={(e) =>handleAll2("ArmorMenu", ["GunsMenu", "BuffsMenu"], "Armadura", "ArmorMenu-active", e)} value="Armadura">Armaduras</button>, <button onClick={(e) =>handleAll2("GunsMenu", ["ArmorMenu", "BuffsMenu"], "Arma", "ArmorMenu-active", e)} value="Arma">Armas</button>, <button onClick={(e)=>handleAll2("BuffsMenu", ["GunsMenu", "ArmorMenu",], "Buff", "ArmorMenu-active", e)} value="Buff">Buffs</button>]} components={[<ArmorsMenu handleBuy={handleBuy} />, <GunsMenu handleBuy={handleBuy} />, <BuffsMenu clicks={clicks} setClicks={setClicks} spentClicks={spentClicks} setSpentClicks={setSpentClicks} rebirths={rebirths} sprbr={spr} activeBuff={activeBuff} setActiveBuff={setActiveBuff} setTime={setTime} maxBuffs={maxBuffs} setBuffsActive={setBuffsActive} buffsActive={buffsActive} permaBuffs={permaBuffs} setPermaBuffs={setPermaBuffs}/>]} id="Loja"/>
      
      <LojaMenu buttons={[<button value="Armas" onClick={(e) => handleAll("InvArmadura", "InvArma", "Inv", "ArmorMenu-active", e)}>Armas</button>, <button value="Armaduras" onClick={(e)=>handleAll("InvArma", "InvArmadura", "Inv", "ArmorMenu-active", e)}>Armaduras</button>]}components={[<Inventory armaduras={armaduras} armas={armas} improvemulti={ImproveMultiplier} aproveupdate={UpdateItem} showPerson={handleShowPerso} handleEquip={improveEquiped} armorsEquiped={armorsEquiped} setArmorsEquiped={setArmorsEquiped} setclicks={setClicks} setarmadura={setArmaduras} setarmors={setArmas} multi={multiplier} savegame={saveGame} invcount={inventoryCount} setinvcount={setInventoryCount} setMulti={setMultiplier} rbr={rebirths} spr={spr} reseted={reseted}/>]} id="Inv"/>
      
      <LojaMenu components={[<Status status={[`Clicks: ${clicks}`, `Total de clicks: ${totalClicks}`, `Clicks gastos: ${spentClicks}`, `Multiplicador: ${multiplier}`, `Rebirths: ${rebirths}`, `Super Rebirths: ${spr}`]} rebirths={rebirths} spr={spr} setRebirth={setRebirths} setSpr={setSpr} clicks={clicks} setspentclicks={setSpentClicks} improvemultiplier={ImproveMultiplier} multiplier={multiplier} setRB={MakeRB} setclicks={setClicks} expinv={expandInventory} setInvCount={setInventoryCount} setInvLimit={setInventoryLimit} setR={setReseted}/>]} id="Status"/>

      <LojaMenu components={[<ShowGames clicks={clicks}/>]} id="Games"/>

      <LojaMenu components={[<Extras />]} id="Extras"/>
      
      <div className="top">
        
        <button onClick={(e) => {
          handleAll2("Loja", ["Inv", "Status", "Games", "Extras"], "Loja", "Loja-active", e);
        }} value="Loja">Loja</button>
        
        <button onClick={(e)=>handleAll2("Status", ["Loja", "Inv", "Games", "Extras"], "Status", "Loja-active", e)} value="Status">Status</button>
        
        <button onClick={(e)=>handleAll2("Inv", ["Loja", "Status", "Games", "Extras"], "Inv", "Loja-active", e)} value="Inv">Inventário</button>

        <button onClick={(e)=>handleAll2("Games", ["Loja", "Status", "Inv", "Extras"], "Games", "Loja-active", e)} value="Games">Games</button>

        <button onClick={(e)=>handleAll2("Extras", ["Loja", "Status", "Inv", "Games"], "Config", "Loja-active", e)} value="Config">Extras</button>
        
      </div>

      <div className="center">
      {showClicks && <p className="anm">+{gainn * multiplier}</p>}
      <h3 className="viewclicks">Clicks: {clicks}</h3>
      <h2 className="sPerso" style={{"marginBottom":"0.9em", "transform": "translate(0, -1.9em)"}}>Seu personagem:</h2>
      <div className="rendImages">
      <img src="assets/perso.png" className="image InitialPerson" />
      {showPerso && <RendPerso renders={armorsEquiped}/>}
      </div>
      <button className="click" onClick={(e)=>handleClick(e)} id="bClick">
        <img src="assets/mouse.png" alt="click" className="Mouse"/>
      </button>
      </div>
    </div>
  )
}