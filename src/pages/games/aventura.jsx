import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "/src/styles/aventura.css";
import {MonsterGenerate} from "/src/pages/games/funcs/aventura/monstergenerate.jsx";

export const Aventura = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("gameData"));
  const multi = data["multiplier"];

  const islandsIcons = [1, 2, 3, 4];
  const [currentIcon, setCurrentIcon] = useState(1);

  const [islandsCoins, setIslandsCoins] = useState([[0], [0], [0], [0]]);
  const [abbrCoin, setAbbrCoin] = useState("");
  const [currentIsland, setCurrentIsland] = useState(1);
  const [unlockedIslands, setUnlockedIslands] = useState([[true],[false],[false], [false]]);
  const [changed, setChanged] = useState(false);
  const [isKilling, setIsKilling] = useState(false);

  const altIsKill = (value) => {
    setIsKilling(value);
  }

  useEffect(() => {
    const coins = islandsCoins[currentIsland-1];
    const abbr = ["K", "M", "B", "T", "Qd", "Qt", "Sx", "Sp", "Oc"]
    if (coins >= 1000) {
      const Calc1 = Math.floor(Math.log10(coins) / 3);
      const Calc2 = (coins / Math.pow(1000, Calc1)).toFixed(1);
      setAbbrCoin(`${Calc2}${abbr[Calc1-1]}`)
    }
  }, [islandsCoins, currentIsland])

  const changeIsland = (val) => {
    setOfferIsland(false);
    if (val === currentIsland-1) {
      setOfferIsland(offerIsland ? false : "Você já está nessa ilha");
      return;
    }
    if (val > 0 && !unlockedIslands[val-1][0]) {
      setOfferIsland(offerIsland ? false : "Você precisa da ilha anterior para comprar essa!");
      return;
    }
    if (!unlockedIslands[val][0]  && val - currentIsland >=1) {
      setOfferIsland("Mova para a próxima ilha para comprar essa");
      return;
    }
    if (!unlockedIslands[val][0]) {
      setOfferIsland(offerIsland ? false : "Você não tem essa ilha");
      setShowPriceIsland(val-1);
      islandsCoins[currentIsland-1] >= islandPrices[val-1] ? setCanBuyIsland(true) : setCanBuyIsland(false);
      return;
    }
    if (isKilling) {
      setOfferIsland("Você não pode mudar de ilha enquanto está matando um monstro!");
      return;
    }
    const ImgNum = val+1;
    setCurrentIcon(islandsIcons[val]);
    setCurrentIsland(ImgNum);
    setChanged(!changed);
    const background = document.querySelector(".island");
    background.style.backgroundImage = `url("assets/islandbackground${ImgNum}.jpeg")`;
  }

  const [offerIsland, setOfferIsland] = useState(false);
  const [canBuyIsland, setCanBuyIsland] = useState(false);
  const [showPriceIsland, setShowPriceIsland] = useState(null);
  const islandPrices = [1000, 10000, 50000];

  const buyIsland = () => {
    setOfferIsland(false);
    if (islandsCoins[currentIsland-1] < islandPrices[showPriceIsland]) {
      setOfferIsland("Moedas insuficientes");
      return;
      //verificação extra
    }
    const unlocked = [...unlockedIslands];
    unlocked[currentIsland][0] = true;
    const coins = [...islandsCoins];
    coins[currentIsland-1] -= islandPrices[showPriceIsland];
    
    setIslandsCoins(coins);
    setUnlockedIslands(unlocked);
    setOfferIsland(false);
    changeIsland(currentIsland);
    setOfferIsland("Ilha comprada com sucesso!");
    saveIsland();
  }

  const gainRewards = (clicks, coins) => {
    data.clicks += clicks;
    localStorage.setItem("gameData", JSON.stringify(data));
    const newCoins = [...islandsCoins];
    if (newCoins[currentIsland-1][0] === undefined) {
      newCoins[currentIsland-1] += coins;
      setIslandsCoins(newCoins);
      altIsKill(false);
      const data = JSON.parse(localStorage.getItem("aventuraData"));
      data.islandsCoins = newCoins;
      data.currentIsland = currentIsland;
      data.currentIcon = currentIcon;
      localStorage.setItem("aventuraData", JSON.stringify(data));
      //não remover esse trecho e substituir pela função, porque da bug, só Deus sabe o porquê 
      //válido para o gameData também, e o expansions (que só funciona na gambiarra)
      return;
    }
    newCoins[currentIsland-1][0] += coins;
    
    setIslandsCoins(newCoins);
    saveIsland();
  }

  const saveIsland = () => {
    const islandData = {
      islandsCoins: islandsCoins,
      unlockedIslands: unlockedIslands,
      currentIsland: currentIsland,
      currentIcon: currentIcon
    }
    localStorage.setItem("aventuraData", JSON.stringify(islandData));
  };

  const loadIsland = () => {
    const islandData = JSON.parse(localStorage.getItem("aventuraData"));
    setIslandsCoins(islandData.islandsCoins);
    setUnlockedIslands(islandData.unlockedIslands);
    setCurrentIsland(islandData.currentIsland);
    setCurrentIcon(islandData.currentIcon);
    const background = document.querySelector(".island");
    background.style.backgroundImage = `url("assets/islandbackground${islandData.currentIsland}.jpeg")`;
  };

  useEffect(() => {
    if (!localStorage.getItem("aventuraData")) {
      saveIsland();
      return;
    }
    loadIsland();
  }, []);

  
  
  return (
    <div>
      <h1>Aventura</h1>
      
      <div className="showIsland">
        {islandsIcons.map((island, index) => (
      <React.Fragment className="lock">
          <img src={`/assets/islandicon${island}.jpeg`} alt={`Ilha ${index+1}`} className={`${island === currentIcon ? "islandHotBarSelected" : "islandsHotBar"} islandImgHotBar`} key={island} onClick={()=>changeIsland(index)}/>
        {unlockedIslands[index][0] || <img src="/assets/locker.png" className="lockerIsland"/>}
      </React.Fragment>
        ))}
      </div>

      {offerIsland && <div className="offerIsland">
        <h2><small>{offerIsland}</small></h2>
        {offerIsland === "Você não tem essa ilha" && <>
        <h3 className="decorCoins">{islandsCoins[currentIsland-1] >= 1000 ? abbrCoin : islandsCoins[currentIsland-1]}/{islandPrices[showPriceIsland]}<img src={`/assets/islandcoin${currentIsland}.png`} className="lowerCoin"/></h3>
        
        {canBuyIsland && <button className="buyIsland" onClick={buyIsland}>Comprar ilha</button>}
    </>}
      </div>}

      <div className="ShowCoins">
        <img src={`/assets/islandcoin${currentIsland}.png`} className="imgCoin"/>
        <p className="showBalance">{islandsCoins[currentIsland-1] >= 1000 ? abbrCoin : islandsCoins[currentIsland-1]}</p>
      </div>
      
    <div className="island">
      <MonsterGenerate island={currentIsland} multi={multi} gainRewards={gainRewards} changed={changed} altKill={altIsKill}/>
    </div>
      
      <button onClick={() => navigate("/home")} className="guest-login returnIsland">Voltar</button>
    </div>
  )
}
//I'll kiil myself