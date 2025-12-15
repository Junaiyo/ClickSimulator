import React, {useState, useEffect} from "react";
import "/src/styles/general.css";

export const ShowInventory = (props) => {
  const {item, imgName, especify, levels, alterLevels, alterEquiped} = props;
  const [isClicked, setIsClicked] = useState(false);
  const [equiped, setEquiped] = useState(false);
  const [level, setLevel] = useState(0)
  const [max, setMax] = useState(false);
  const [img, setImg] = useState(imgName);
  const [errorEquip, setErrorEquip] = useState(false);
  const [errorUpgrade, setErrorUpgrade] = useState(null);
  const [itemType, setItemType] = useState(() => {
    if (especify === "peito" || especify === "calca") {
      return "armadura";
    }
    return "arma";
  })

  const itemsUpgrades = {
    "Calça de couro": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "InitialPrice": 50,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["calca1.1.png", "calca1.2.png", "calca1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Espada de madeira": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "InitialPrice": 50,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["espada1.1.png", "espada1.2.png", "espada1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Peitoral de couro": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "InitialPrice": 50,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["peito1.1.png", "peito1.2.png", "peito1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Arco de madeira": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "InitialPrice": 50,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["arco1.1.png", "arco1.2.png", "arco1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Peitoral de ferro": {
      "MaxLevel": 0,
      "InitialMulti": 3,
      "InitialPrice": 125,
      "UpgradesPrices": [800],
      "UpgradesPngs": ["peito2.1.png"],
      "UpgradesMultipliers": [4],
      "Type": 2
    },
    "Peitoral de ouro": {
      "MaxLevel": 0,
      "InitialMulti": 4,
      "InitialPrice": 200,
      "UpgradesPrices": [1000],
      "UpgradesPngs": ["peito3.1.png"],
      "UpgradesMultipliers": [5],
      "Type": 3
    },
    "Peitoral de diamante": {
      "MaxLevel": 0,
      "InitialMulti": 5,
      "InitialPrice": 500,
      "UpgradesPrices": [2500],
      "UpgradesPngs": ["peito4.1.png"],
      "UpgradesMultipliers": [6],
      "Type": 4
    },
    "Peitoral de obsidiana": {
      "MaxLevel": 1,
      "InitialMulti": 6,
      "InitialPrice": 1000,
      "UpgradesPrices": [3000, 6000],
      "UpgradesPngs": ["peito5.1.png", "peito5.2.png"],
      "UpgradesMultipliers": [7, 8],
      "Type": 5
    }
  }

  const handleItem = () => {
    setIsClicked(!isClicked);
    setErrorUpgrade(null);
  }

  const handleEquip = () => {
    setEquiped(true);
    
    alterEquiped(item, true);
    
    let initial = itemsUpgrades[item]["InitialMulti"];
    const tryEquip = props.handleEquip(img, especify);
    if (tryEquip) {
      setEquiped(false);
      setErrorEquip(true);
      return;
    }
    props.showPerson();
    props.improvemulti(itemsUpgrades[item]["InitialMulti"]);
    if (level > 0) {
      for (let i = 0; i < level; i++) {
      props.improvemulti(itemsUpgrades[item]["UpgradesMultipliers"][i])
        initial += itemsUpgrades[item]["UpgradesMultipliers"][i];
      }
    }
    let timeout = setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("gameData"));
    data.multiplier += initial;
    localStorage.setItem("gameData", JSON.stringify(data));
      clearTimeout(timeout);
    }, 900)
  }

  const ModifyImage = (extra=false) => {
    const newArr = [...props.armorsEquiped];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][1] === especify) {
        newArr[i][0] = `${especify}${itemsUpgrades[item]["Type"]}.${extra ? level+2 : level+1}.png`;
        props.setArmorsEquiped(newArr);
      }
    }
  }
  
  const handleUpgrade = () => {
    const aprove = props.aproveupdate(itemsUpgrades[item]["UpgradesPrices"][level]);
    setErrorUpgrade("Clicks insuficientes");
    if (aprove) {
      setErrorUpgrade(null);
      setLevel((prev) => prev + 1);
      props.improvemulti(itemsUpgrades[item]["UpgradesMultipliers"][level]);
      setImg(itemsUpgrades[item]["UpgradesPngs"][level]);

      let willbemax = false;
      if (level === itemsUpgrades[item]["MaxLevel"]) {
        setMax(true);
        willbemax = true;
      }
      alterLevels(item, 1, willbemax, itemsUpgrades[item]["UpgradesPngs"][level], equiped, itemType);
      ModifyImage();
    }
  }

  

  const handleDesequip = () => {
    setEquiped(false);

    alterEquiped(item, false);
    
    let cumulator = 0;
    let newArmors;
    const newArr = [...props.armorsEquiped];
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i][1] === especify) {
          newArr.splice(i, 1);
          newArmors = newArr;
          props.setArmorsEquiped(newArr);
          break;
        }
      }
    if (level === 0) {
      props.improvemulti(-itemsUpgrades[item]["InitialMulti"]);
      cumulator += itemsUpgrades[item]["InitialMulti"];
      handleAltAST(newArmors, cumulator);
      return;
    }
    for (let i = 0; i < level; i++) {
      if (i === 0) {
        props.improvemulti(-itemsUpgrades[item]["InitialMulti"]);
        cumulator += itemsUpgrades[item]["InitialMulti"];
      }
      props.improvemulti(-itemsUpgrades[item]["UpgradesMultipliers"][i]);
      cumulator += itemsUpgrades[item]["UpgradesMultipliers"][i];
    }
    handleAltAST(newArmors, cumulator)
  }

  const handleAltAST = (newArmors, cumulator) => {
    let timeout = setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("gameData"));
      data.armorsEquiped = newArmors;
      data.multiplier -= cumulator;
      localStorage.setItem("gameData", JSON.stringify(data));
      clearTimeout(timeout);
    }, 900)
  }

  const handleVisible = (e) => {
    const id = e.target.id;
    document.getElementById(id).classList.toggle("VisibleFalse")
    const element = document.getElementsByClassName(especify)[0];
    element.style.visibility = element.style.visibility === "hidden" ? "visible" : "hidden";
  }

  const handleSell = () => {
    const newArr = [...props.armas];
    const newArr2 = [...props.armaduras];

    props.resetItem(item);


    const select = itemType === "armadura" ? newArr2 : newArr;
    if (select.length > 1) {
    let index = 0;
    let newitem = "not find";
    for (let i of select) {
      if (i[0] === item) {
        index = select.indexOf(i)+1;
        newitem = select[index];
        break;
      }
    }
    let newite = newitem[0];

      
    setLevel(levels[newite]["level"]);
    setImg(levels[newite]["img"]);
    setMax(levels[newite]["max"]);
    setEquiped(levels[newite]["equiped"]);
    setItemType(levels[newite]["itemType"])
    }
    
    const val = itemsUpgrades[item]["InitialPrice"];
    const val2 = val - ((20 * val) / 100);
    props.setclicks((prev) => prev + val2);
    const newInv = {...props.invcount};
    newInv[especify] -= 1;
    props.setinvcount(newInv);

    
    
    if (itemType === "armadura") {
      for (let i = 0; i<newArr2.length; i++) {
        if (newArr2[i][0] === item) {
          newArr2.splice(newArr2.indexOf(newArr2[i]), 1);
        }
      }
    } else {
      for (let i = 0; i<newArr.length; i++) {
        if (newArr[i][0] === item) {
          newArr.splice(newArr.indexOf(newArr[i]), 1);
        }
      }
    } 
    
    itemType === "armadura" ? props.setarmadura(newArr2) : props.setarmas(newArr);
    const data = JSON.parse(localStorage.getItem("gameData"));
    data.clicks += val2;
    itemType === "armadura" ? data.armaduras = newArr2 : data.armas = newArr;
    localStorage.setItem("gameData", JSON.stringify(data));
  }

  return (
    <div>
      <details onToggle={handleItem} className="showitems" id="shItm">
        <summary>
          {item}
          <img src={`assets/${img}`} className={`image ${isClicked ? "inventoryitem-clicked" : "inventoryitem"}`}/>
          
        </summary>
        
        {equiped || <><button onClick={handleEquip}>Equipar</button>
          <button className="sellItem" onClick={handleSell}>Vender</button>
          {errorEquip && <p>Você já tem um item desse tipo equipado</p>}</>}

        {equiped ? max ? <p className="MaxLevel">MAX LEVEL</p> : <>
          <p>Level: {level}</p>
          <p>Custo de upgrade: {itemsUpgrades[item]["UpgradesPrices"][level]}</p>
          <p>Próximo multiplicador: {itemsUpgrades[item]["UpgradesMultipliers"][level]}</p>
          <button onClick={handleUpgrade}>Upgrade</button>
        </> : null}
        {equiped && <button className="Visible" onClick={handleVisible} id={`Visible-${item}`}>Visível</button>}
        {equiped && <button style={{backgroundColor: "red"}} onClick={handleDesequip}>Desequipar</button>}
        {errorUpgrade && <p>{errorUpgrade}</p>}
      </details>
    </div>
  )
}