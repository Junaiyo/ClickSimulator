import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "/src/styles/style2.css";
import {OpenBox} from "./funcs/openbox";


export const Roleta = () => {
  const navigate = useNavigate();
  const boxes = ["Caixa básica", "Caixa de ferro", "Caixa de ouro", "Caixa de diamante"];
  const boxPrices = [100, 200, 500, 1000];
  const rdts = {
    "Caixa básica": [0, 0, 0, 0],
    "Caixa de ferro": [4, -4, -3, -1],
    "Caixa de ouro" : [5, -6, -5, -2],
    "Caixa de diamante": [7, -9, -7, -3]
  }
  const porcents = [[74, "Comum"], [15, "Raro"], [10, "Épico"], [1, "Lendário"]];
  
  const [opBox, setOpBox] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [rolling, setRolling] = useState(false);
  
  const [msg, setMsg] = useState();
  
  const gameData = JSON.parse(localStorage.getItem("gameData"));
  const [clicks, setClicks] = useState(gameData ? gameData.clicks : 0)

  const updateClicks = (price) => {
    setClicks((prev) => {
      const newVal = prev - price;
      gameData.clicks = newVal;
      localStorage.setItem("gameData", JSON.stringify(gameData));
      return newVal;
    })
  }

  const handleVisibleBox = () => {
    setOpenBox(false);
  }
  
  const handleBuy = (box) => {
    const price = boxPrices[boxes.indexOf(box)];
    if (price > clicks) {
      setMsg("Clicks insuficientes");
      return;
    }
    if (rolling) {
      setMsg("Já tem uma caixa sendo aberta");
      return;
    }
    updateClicks(price);
    setMsg("Compra realizada com sucesso");
    setOpenBox(true);
    setOpBox(box)
    setRolling(true);
    window.scrollTo(0,0);
  }

  const [rarity, setRarity] = useState(() => boxes.map(() => false));
  const handleShowBoxes = (index) => {
    const newRarity = [...rarity];
    newRarity[index] = !newRarity[index];
    setRarity(newRarity);
  }
  
  return (
    <div className="roulet">
      <h1>Caixas</h1>
      <div className="box">
        {boxes.map((box, index) => (
          <details key={index} className="box-item">
            <summary>
              <img src={`assets/caixa${index+1}.png`}/>
              <h3>{box}</h3>
            </summary>
            <p>Preço: <span>{boxPrices[index]}</span></p>
            <button className="rarity" onClick={()=>handleShowBoxes(index)}>Raridades</button>
            <button onClick={()=>handleBuy(box)}>Comprar</button>
           {msg && <p>{msg}</p>}
            {rarity[index] && porcents.map((porcent, index) => (
               <p key={index} className={`${porcent[1]}`}>{porcent[1]}: <span id="spn">{porcent[0]-rdts[box][index]}%</span></p>
              ))}
          </details>
        ))}
      </div>
      {openBox && <OpenBox box={opBox} handleVisible={handleVisibleBox} porcents={porcents} cR={rdts[opBox][0]} rR={rdts[opBox][1]} eR={rdts[opBox][2]} lR={rdts[opBox][3]} updateClicks={updateClicks} setRolling={setRolling}/>}
      <button onClick={() => navigate("/home")} className="guest-login">Voltar</button>
    </div>
  )
}