import React, {useState, useEffect} from "react";
import "/src/styles/openbox.css";

export const OpenBox = (props) => {
  const boxItems = {
    "Caixa básica": [[5, "Comum"], [10, "Comum"], [50, "Raro"], [100, "Raro"], [250, "Raro"], [500, "Épico"], [750, "Épico"], [1000, "Lendário"]],
    "Caixa de ferro": [[10, "Comum"], [50, "Comum"], [100, "Raro"], [250, "Raro"], [500, "Raro"], [750, "Épico"], [1000, "Lendário"], [1250, "Lendário"]]
  }
  const { box, porcents, cR, rR, eR, lR } = props;
  const iterables = [cR, rR, eR, lR]
  const items = boxItems[box] ? boxItems[box] : [];
  const [currentItem, setCurrentItem] = useState(items[0][0]);
  const [currentStyle, setCurrentStyle] = useState(items[0][1]);
  const [reward, setReward] = useState(false);
  
  const selector = () => {
    for (let i = 0; i < porcents.length; i++) {
      porcents[i][0] -= iterables[i];
    }
    let total = 0;
    for (const p of porcents) {
      total += p[0];
    }
    const num = Math.random() * total;
    let acumulator = 0;
    for (const r of porcents) {
      acumulator += r[0];
      if (num <= acumulator) {
        return r[1];
      }
    }
    
  }

  const calcRItem = (rarity) => {
    let cumulator = 0;
    let initialIndex = -1;
    for (const item of items) {
      if (item[1] === rarity) {
        cumulator += 1;
        if(initialIndex === -1)  {initialIndex = items.indexOf(item)}
      }
    }
    const select = Math.floor(Math.random() * cumulator);
    return items[initialIndex + select][0];
  }
  
  const spin = () => {
    let time = 225;
    let giro = 0;

    const doSpin = () => {
      const randomIndex = Math.floor(Math.random() * items.length);
      setCurrentItem(items[randomIndex][0]);
      setCurrentStyle(items[randomIndex][1]);
      time *= 1.1;
      giro += 1;
      if (giro > 21) {
        setTimeout(() => {
          props.handleVisible();
          props.setRolling(false);
        }, 4500)
        const selected = selector();
        const selected2 = calcRItem(selected)
        setCurrentStyle(selected);
        setCurrentItem(selected2);
        setReward(true);
        props.updateClicks(-selected2)
        return;
      }
      setTimeout(doSpin, time);
    }
    doSpin();
  }

  useEffect(() => {
    spin();
  }, []);


  return (
    <div>
      <div className={`op-item ${currentStyle} ${currentStyle === "Lendário" ? "bordaLegend" : ""}`}>
      <h2>+<span> {currentItem}</span> Clicks</h2>
        {reward && <h3 className="rewardMsg">Parabéns você ganhou {currentItem} clicks</h3>}
    </div>
    </div>
  )
}