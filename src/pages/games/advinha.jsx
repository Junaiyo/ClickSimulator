import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "/src/styles/adivinha.css";

export const Adivinha = () => {
  const items = ["uva", "uvaverde", "laranja", "pitaya", "abacate", "abóbora", "banana", "bananaverde", "cupcake", "maçã", "maçaverde", "mamão", "manga", "mangaverde"];

  const [item, setItem] = useState(null);
  const gameData = JSON.parse(localStorage.getItem("gameData"))
  const [clicks, setClicks] = useState(gameData ? gameData.clicks : 0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMulti, setShowMulti] = useState(null);
  const element = document.getElementById("InputNum");
  const [valor, setValor] = useState(0);
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    setShowMulti(null);
    const itm = e.target.id;
    setItem(itm);
  }

  const [initialValue, setInitialValue] = useState(0);
  const handleInput = (e) => {
    const value = e.target.value;
    setInitialValue(value);
    setShowConfirm(true);
    setValor(value);
    if (value > clicks) {
      setShowConfirm("Clicks insuficientes");
    }
    if (value < 1 || value === "" || value < 50) {
      setShowConfirm("Valor inválido");
    }
  }

  const handleConfirm = () => {
    let total = items.length;
    selectMultipliers(total);
  }

  const selectMultipliers = (quantity) => {
    const multipliers = [[0.90, 96], [0.5, 95], [1, 90], [1.5, 20], [2, 15], [2.5, 10], [3, 5], [3.5, 3], [4, 2], [4.5, 1], [5, 0.5]]
    let total = 0;
    for (const m of multipliers) {
      total+= m[1];
    }
    let Selecteds = [];
    let cumulator = 0;
    for (let i = 0; i < quantity; i++) {
      const num = Math.random() * total;
      for (const m of multipliers) {
        cumulator += m[1];
        if (num <= cumulator) {
          Selecteds.push(m[0]);
          cumulator = 0;
        }
      }
    }
    sortMulti(Selecteds);
      }

  const sortMulti = (Selecteds) => {
    setShowMulti(Selecteds);
    setShowConfirm(false);
    element.style.display = "none";
    calcReward(Selecteds);
  }

  const calcReward = (Selecteds) => {
    let multi = Selecteds[items.indexOf(item)];
    let reward = valor * multi;
    setValor(reward);
    updateClicks(reward, multi);
  }

  const updateClicks = (value, multi) => {
  let signal = multi >= 1 ? "+" : "-";
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    
    const expression = signal === "+" ? Math.floor(value * multi) - initialValue : -(initialValue - (Math.ceil(value * multi)))
    setClicks((prev) => prev + expression);
    gameData.clicks = clicks + expression;
    
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }
  
  return (
    <div className="advgame">
      <h1>Adivinhação</h1>
    <div className="adv">
      {items.map((item, index) => {
      return <div className="item" key={index} onClick={handleClick}>
        <img src={`/assets/${item}.png`} id={item}/>
        {showMulti && <h3>{showMulti[index]}x</h3>}
      </div>
      })}
    </div>
      <h3 className="animation">Clique em um item</h3>
      {item && <div>
        <h3>selecionado: {item}</h3>
        <input type="number" placeholder="Quanto você quer gastar" onChange={handleInput} id="InputNum"/>
        {showConfirm && showConfirm !== "Clicks insuficientes" && showConfirm !== "Valor inválido" ? <button className="guest-login gameconfirm" onClick={handleConfirm}>Confirmar</button> : <h3>{showConfirm}</h3>}
        {showMulti && <>
          <h3>Seu multiplicador: {showMulti[items.indexOf(item)]}x</h3>
          <h3>Você ganhou {valor} clicks</h3>
        </>}
      </div>}
      <button onClick={() => navigate("/home")} className="guest-login">Voltar</button>
    </div>
  )
}