import React, {useState} from "react";
import "/src/styles/style.css";
import {handleAll} from "/src/funcs/handleAll";
import {ShowItems} from "/src/funcs/showitems";

export const ArmorsMenu = (props) => {

  const [chests, _] = useState([
    ["Peitoral de couro", "peito1.png", 50, 2, 0, 0],
    ["Peitoral de ferro", "peito2.png", 125, 3, 0, 0],
    ["Peitoral de ouro", "peito3.png", 200, 4, 0, 0],
    ["Peitoral de diamante", "peito4.png", 500, 5, 0, 0],
    ["Peitoral de obsidiana", "peito5.png", 1000, 6, 0, 0]
  ]);
  
  const [legs, __] = useState([
    ["Calça de couro", "calca1.png", 50, 2, 0, 0]
  ]);

  const msg1 = chests.map(() => false);
  const msg2 = legs.map(() => false);
  const [showMsg, setMsg] = useState([[...msg1], [...msg2]]);

  const handleShowMsg = (nums, message) => {
    const newMsg = [...showMsg];
    newMsg[nums[0]][nums[1]] = message;
    setMsg(newMsg);
  }
  
  return (
    <div className="Loja ArmorMenu" id="ArmorMenu">
      <button onClick={(e) =>handleAll("PeitoMenu", "CalcaMenu", "Peito", "ArmorMenu-active", e)} value="Peito">Peitoral</button>
      <button onClick={(e) =>handleAll("PeitoMenu", "CalcaMenu", "Peito", "ArmorMenu-active", e)} value="Calca">Calça</button>
      <div id="PeitoMenu" className="Loja ArmorMenu PeitoMenu">

        {chests.map((chest, index) => (
          <ShowItems item={chest[0]} imgName={chest[1]} price={chest[2]} multiplier={chest[3]} rebirth={chest[4]} spr={chest[5]} handleBuy={props.handleBuy} success={showMsg[0][index]} type="Armaduras" setsuccess={handleShowMsg} especify="peito" nums={[0, index]}/>
        ))}
        
      </div>
      <div id="CalcaMenu" className="Loja ArmorMenu CalcaMenu">

        {legs.map((leg, index) => {
          return <ShowItems item={leg[0]} imgName={leg[1]} price={leg[2]} multiplier={leg[3]} rebirth={leg[4]} spr={leg[5]} handleBuy={props.handleBuy} success={showMsg[1][index]} type="Armaduras" setsuccess={handleShowMsg} especify="calca" nums={[1, index]}/>
        })}
        
      </div>
    </div>
  )
}