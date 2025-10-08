import React, {useState} from "react";
import "/src/styles/adivinha.css";

export const Adivinha = () => {
  const items = ["uva", "uvaverde", "laranja", "pitaya", "abacate", "abóbora", "banana", "bananaverde", "cupcake", "maçã", "maçaverde", "mamão", "manga", "mangaverde"];

  const [item, setItem] = useState(null);
  const gameData = JSON.parse(localStorage.getItem("gameData"))
  const [clicks, setClicks] = useState(gameData ? gameData.clicks : 0);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleClick = (e) => {
    const itm = e.target.id;
    setItem(itm);
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setShowConfirm(true);
    if (value > clicks) {
      setShowConfirm("Clicks insuficientes");
    }
  }

  const handleConfirm = () => {
    let total = items.length;
    selectMultipliers(total);
  }

  const selectMultipliers = (quantity) => {
    const multipliers = {
      1: 90,
      1.5: 80,
      2: 20,
      3: 10,
    }
    const Arr = [];
    for (let i = 0; i < quantity; i++) {
      let selectedMulti;
    }
  }

  const sortMulti = (multipliers) => {
    
  }
  
  return (
    <div className="advgame">
      <h1>Adivinhação</h1>
    <div className="adv">
      {items.map((item, index) => {
      return <div className="item" key={index} onClick={handleClick}>
        <img src={`/assets/${item}.png`} id={item}/>
      </div>
      })}
    </div>
      <h3 className="animation">Clique em um item</h3>
      {item && <div>
        <h3>selecionado: {item}</h3>
        <input type="number" placeholder="Quanto você quer gastar" onChange={handleInput}/>
        {showConfirm && showConfirm !== "Clicks insuficientes" ? <button className="guest-login gameconfirm" onClick={handleConfirm}>Confirmar</button> : <h3>{showConfirm}</h3>}
      </div>}
    </div>
  )
}