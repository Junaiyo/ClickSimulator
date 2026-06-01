import React, {useState} from 'react';
import "/src/styles/style.css";
import {ShowItems} from "/src/funcs/showitems";

export const BuffsMenu = (props) => {
  const {clicks, setClicks, spentClicks, setSpentClicks, rebirths, sprbr, activeBuff, setActiveBuff, setTime, maxBuffs, setBuffsActive, buffsActive} = props;
  const [message, setMessage] = useState()

  const buffs = [
    ["2x clicks 0:30m", 40, 0, 0, "0:30", "2x", 1000],
    ["2x clicks 1:00m", 60, 0, 0, "1:00", "2x", 5000]
  ]

  const setsuccess = (nums, message) => {
    setMessage(message);
  }

  const handleBuy = (price, reqRb, reqSp, time, buffName, mNimo) => {
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
    if (buffsActive === maxBuffs) {
      setMessage("Você já tem um buff ativo!")
      return;
    }
    if (clicks < mNimo) {
      setMessage("Você não tem clicks suficientes para comprar isso!");
      return;
    }
    const [minutos, segundos] = time.split(":").map(Number);
    const totalTime = (minutos * 60) + segundos;
    setTime(totalTime);
    setClicks((prev) => prev - newPrice);
    setSpentClicks((prev) => prev + newPrice);
    setActiveBuff(buffName);
    setBuffsActive((prev) => prev + 1);
    setMessage("Você comprou o buff com sucesso!")
  }

  return (
    <div className="Loja ArmorMenu PeitoMenu" id="BuffsMenu">
      {buffs.map((buff, index) =>(
        <ShowItems item={buff[0]} price={buff[1]} rebirth={buff[2]} spr={buff[3]} handleBuy={handleBuy} success={message} isBuff={true} time={buff[4]} setsuccess={setMessage} bName={buff[5]} mNimo={buff[6]}/>
      ))}
    </div>
  )
}