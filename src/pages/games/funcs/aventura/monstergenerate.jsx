import React, {useState, useEffect} from "react";
import "/src/styles/monstergenerate.css";
import {clicksCoins} from "/src/pages/games/funcs/aventura/monsterporcents.js";

export const MonsterGenerate = (props) => {
  const {island, multi, changed, altKill} = props;
  const [monsters, setMonsters] = useState([
    //formato: [id, chance, isExpanded, {hp, possiveis cliques, possiveis moedas}]
    // click-1, coin-1, etc são modos de recompensa, tipo o click-1, clicks entre 5-20, coin-1, coins entre 5-20. Etc.
    [[1, 80, false, {"hp": 100, "clickReward": "click-1", "coinReward": "coin-1"}],
     [2, 60, false, {"hp": 110, "clickReward": "click-1", "coinReward": "coin-1"}],
     [3, 40, true, {"hp": 120, "clickReward": "click-2","coinReward": "coin-2"}],
     [4, 18, true, {"hp": 130, "clickReward": "click-2","coinReward": "coin-2"}]], //island 1
    [[1, 80, false, {"hp": 120, "clickReward": "click-2", "coinReward": "coin-2"}],
     [2, 61, false, {"hp": 140, "clickReward": "click-2", "coinReward": "coin-2"}],
    [3, 38, true, {"hp": 160, "clickReward": "click-3","coinReward": "coin-3"}],
    [4, 16, true, {"hp": 180, "clickReward": "click-3","coinReward": "coin-3"}]],//island 2
    [[1, 80, false, {"hp": 160, "clickReward": "click-3", "coinReward": "coin-3"}],
     [2, 62, false, {"hp": 190, "clickReward": "click-3", "coinReward": "coin-3"}],
    [3, 37, true, {"hp": 220, "clickReward": "click-4","coinReward": "coin-4"}],
    [4, 15, true, {"hp": 260, "clickReward": "click-5","coinReward": "coin-5"}]] , //island 3
    [[1, 80, false, {"hp": 220, "clickReward": "click-4", "coinReward": "coin-4"}],
     [2, 63, false, {"hp": 260, "clickReward": "click-5", "coinReward": "coin-5"}],
    [3, 36, false, {"hp": 300, "clickReward": "click-5","coinReward": "coin-5"}],
    [4, 14, true, {"hp": 340, "clickReward": "click-6","coinReward": "coin-6"}],
    [5, 10, true, {"hp": 550, "clickReward": "click-7","coinReward": "coin-7"}]] //island4
  ]);

  const selectMonster = (isInitial) => {
    let total = 0;
    for (const monster of monsters[island-1]) {
      total += monster[1];
    }
    const num = Math.random() * total;
    
    let acumulator = 0;
    let monsterIndex = 0;
    for (const monster of monsters[island-1]) {
      acumulator += monster[1];
      if (num <= acumulator) {
        monsterIndex = monster[0];
        
        if (isInitial) {
        return monsterIndex;
        } else {
          setMonster(monsterIndex);
          break;
        }
      }
    }
  }
  const [monster, setMonster] = useState(selectMonster(true));

  const [initHp, setInitHp] = useState(monsters[island-1][monster-1][3]["hp"]);

  useEffect(() => {
    selectMonster(false);
    altKill(false);
  }, [changed]);
  
  const attackMonster = () => {
    const initialHP = monsters[island-1][monster-1][3]["hp"];
    const newHP = initialHP - multi;
    const newMonsters = [...monsters];
    newMonsters[island-1][monster-1][3]["hp"] = newHP;
    setMonsters(newMonsters);
    altKill(true);
    if (newHP <= 0) {
      newMonsters[island-1][monster-1][3]["hp"] = initHp;
      setMonsters(newMonsters);
      reward(monsters[island-1][monster-1][3]["clickReward"], monsters[island-1][monster-1][3]["coinReward"]);
      altKill(false);
      selectMonster(false);
    }
  }

  const [showReward, setShowReward] = useState([false, 0, 0]);
  const reward = (click, coin) => {
    const rewards = clicksCoins(click, coin);
    const clk = rewards[0];
    const cns = rewards[1];
    props.gainRewards(clk, cns);
    setShowReward([true, clk, cns]);
    
    setTimeout(() => {
      setShowReward([false, 0, 0]);
    }, 520);
  }

  useEffect(() => {
    setInitHp(monsters[island-1][monster-1][3]["hp"]);
  }, [monster, changed]);

  
  return (
    <div className="monster">
      <div className="showHealth">
        <p>{monsters[island-1][monster-1][3]["hp"]}</p>
        <progress value={monsters[island-1][monster-1][3]["hp"]} max={initHp} className="monsterHealthBar"/>
      </div>

      {showReward[0] && <div className="showRewards">
        <p>+<span>{showReward[1]} </span>Clicks</p>
        <p>+<span>{showReward[2]} </span>Coins</p>
      </div>}
      
      <img src={`assets/island${island}monster${monster}phase1.png`} alt={monster} className={monsters[island-1][monster-1][2] ? "monsterImageExp" : "monsterImage"}/>

      <button onClick={()=>attackMonster()} className="attackButton">
        <p>Atacar</p>
        <img src="assets/attacksword.png" alt="Atacar" className="sword"/>
      </button>
    </div>
  )
}
