import React, {useState} from "react";
import "/src/styles/style.css";
import {ShowItems} from "/src/funcs/showitems";
import {handleAll} from "/src/funcs/handleAll";

export const GunsMenu = (props) => {

  const [swords, _] = useState([
    ["Espada de madeira", "espada1.png", 50, 2, 0, 0]
  ]);

  const [bows, __] = useState([
    ["Arco de madeira", "arco1.png", 50, 2, 0, 0]
  ]);

  const msg1 = swords.map(() => false);
  const msg2 = bows.map(() => false);
  const [showMsg, setMsg] = useState([[...msg1], [...msg2]]);

  const handleShowMsg = (nums, message) => {
    const newMsg = [...showMsg];
    newMsg[nums[0]][nums[1]] = message;
    setMsg(newMsg);
  }

  
  return (
    <div className="Loja ArmorMenu" id="GunsMenu">
      <button className="b" onClick={(e) =>handleAll("EspadaMenu", "ArcoMenu", "Espada", "ArmorMenu-active", e)} value="Espada">Espada</button>
      <button className="b" value="Arco" onClick={(e)=>handleAll("EspadaMenu", "ArcoMenu", "Espada", "ArmorMenu-active", e)}>Arco</button>
      
      <div className="Loja ArmorMenu PeitoMenu" id="EspadaMenu">

        {swords.map((sword, index) => (
          <ShowItems item={sword[0]} imgName={sword[1]} price={sword[2]} multiplier={sword[3]} rebirth={sword[4]} spr={sword[5]} handleBuy={props.handleBuy} success={showMsg[0][index]} type="Armas" setsuccess={handleShowMsg} especify="espada" nums={[0, index]}/>
        ))}
        
      </div>
      
      <div className="Loja ArmorMenu CalcaMenu" id="ArcoMenu">

        {bows.map((bow, index) => (
          <ShowItems item={bow[0]} imgName={bow[1]} price={bow[2]} multiplier={bow[3]} rebirth={bow[4]} spr={bow[5]} handleBuy={props.handleBuy} success={showMsg[1][index]} type="Armas" setsuccess={handleShowMsg} especify="arco" nums={[1, index]}/>
        ))}
        
      </div>
      
    </div>
  )
}