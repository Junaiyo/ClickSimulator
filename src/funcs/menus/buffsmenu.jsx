import React, {useState} from 'react';
import "/src/styles/style.css";
import {ShowItems} from "/src/funcs/showitems";
import {handleAll} from "/src/funcs/handleAll";

export const BuffsMenu = (props) => {
  const {clicks, setClicks, spentClicks, setSpentClicks, rebirths, sprbr, activeBuff, setActiveBuff, setTime, maxBuffs, setBuffsActive, buffsActive, permaBuffs, setPermaBuffs} = props;
  const [message, setMessage] = useState()

  const buffs = [
    ["2x clicks 0:30m", 40, 1, 0, "0:30", "2x", 6125],
    ["2x clicks 1:00m", 60, 1, 0, "1:00", "2x", 11999]
  ]

  const permBuffs = [
    ["Click crítico", 35, 0, 0, 25000, "ClCritico"]
  ]

  const setsuccess = (nums, message) => {
    setMessage(message);
  }

  const handleBuy = (price, reqRb, reqSp, time, buffName, mNimo, isPerma=false, iName=null) => {
    if (time === undefined) {
      time = "0:00";
    }
    const newPrice = Math.ceil((clicks / 100) * price);
    if (clicks < newPrice) {
      setMessage("Você não tem clicks suficientes para comprar isso!")
      return;
    }
    if (rebirths < reqRb) {
      setMessage("Você não tem rebirths suficientes para comprar isso!")
      return;
    }
    if (sprbr < reqSp) {
      setMessage("Você não tem super rebirths suficientes para comprar isso!")
      return;
    }
    if (buffsActive === maxBuffs && !isPerma) {
      setMessage("Você já tem um buff ativo!")
      return;
    }
    if (clicks < mNimo) {
      setMessage("Você não tem clicks suficientes para comprar isso!");
      return;
    }
    if (permaBuffs.includes(iName)) {
      setMessage("Você já tem esse buff!");
      return;
    }
    if (!isPerma) {
    const [minutos, segundos] = time.split(":").map(Number);
    const totalTime = (minutos * 60) + segundos;
    setTime(totalTime);
    setActiveBuff(buffName);
    setBuffsActive((prev) => prev + 1);
    }
    const data = JSON.parse(localStorage.getItem("gameData"));
    if (isPerma) {
      setPermaBuffs((prev) => [...prev, iName]);
      data.permaBuffs = [...permaBuffs, iName];
    }
    setClicks((prev) => prev - newPrice);
    setSpentClicks((prev) => prev + newPrice);
    data.clicks = clicks - newPrice;
    data.spentClicks = spentClicks + newPrice;
    localStorage.setItem("gameData", JSON.stringify(data));
    setMessage("Você comprou o buff com sucesso!")
  }

  return (
    <div className="Loja ArmorMenu PeitoMenu" id="BuffsMenu">
      <button onClick={(e)=>handleAll("TempMenu", "PermMenu", "Perma","ArmorMenu-active", e)} value="Perma">Temporários</button>
      <button onClick={(e)=>handleAll("TempMenu", "PermMenu", "Perma","ArmorMenu-active", e)} value="Temp">Permanentes</button>
      
      <div className="Loja ArmorMenu" id="TempMenu">
      {buffs.map((buff, index) =>(
        <ShowItems item={buff[0]} price={buff[1]} rebirth={buff[2]} spr={buff[3]} handleBuy={handleBuy} success={message} isBuff={true} time={buff[4]} setsuccess={setMessage} bName={buff[5]} mNimo={buff[6]}/>
      ))}
      </div>

      <div className="Loja ArmorMenu" id="PermMenu">
        {permBuffs.map((buff, index) => (
          <ShowItems item={buff[0]} price={buff[1]} rebirth={buff[2]} spr={buff[3]} mNimo={buff[4]} handleBuy={handleBuy} success={message} isBuff={true} isPerma={true} setsuccess={setMessage} iName={buff[5]}/>
        ))}
      </div>
      
    </div>
  )
}