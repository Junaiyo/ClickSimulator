import React, {useState} from "react";
import "/src/styles/general.css";

export const ShowInventory = (props) => {
  const {item, imgName, especify} = props;
  const [isClicked, setIsClicked] = useState(false);
  const [equiped, setEquiped] = useState(false);
  const [level, setLevel] = useState(0)
  const [max, setMax] = useState(false);
  const [img, setImg] = useState(imgName);
  const [errorEquip, setErrorEquip] = useState(false);
  const [errorUpgrade, setErrorUpgrade] = useState(null);

  const itemsUpgrades = {
    "Calça de couro": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["calca1.1.png", "calca1.2.png", "calca1.3.png"],
      "UpgradesMultipliers": [3, 4, 5, 6],
      "Type": 1
    },
    "Espada de madeira": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["espada1.1.png", "espada1.2.png", "espada1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Peitoral de couro": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["peito1.1.png", "peito1.2.png", "peito1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    },
    "Arco de madeira": {
      "MaxLevel": 2,
      "InitialMulti": 2,
      "UpgradesPrices": [500, 1750, 2275],
      "UpgradesPngs": ["arco1.1.png", "arco1.2.png", "arco1.3.png"],
      "UpgradesMultipliers": [3, 4, 5],
      "Type": 1
    }
  }

  const handleItem = () => {
    setIsClicked(!isClicked);
    setErrorUpgrade(null);
  }

  const handleEquip = () => {
    setEquiped(true);
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
      }
    }
  }

  const ModifyImage = () => {
    const newArr = [...props.armorsEquiped];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][1] === especify) {
        newArr[i][0] = `${especify}${itemsUpgrades[item]["Type"]}.${level+1}.png`;
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
      if (level === itemsUpgrades[item]["MaxLevel"]) {
        setMax(true);
      }
      ModifyImage();
    }
  }

  const handleDesequip = () => {
    setEquiped(false);
    const newArr = [...props.armorsEquiped];
      for (let i = 0; i < newArr.length; i++) {
        if (newArr[i][1] === especify) {
          newArr.splice(i, 1);
          props.setArmorsEquiped(newArr);
          break;
        }
      }
    if (level === 0) {
      props.improvemulti(-itemsUpgrades[item]["InitialMulti"]);
      return;
    }
    for (const i of itemsUpgrades[item]["UpgradesMultipliers"]) {
      props.improvemulti(-i)
      if (i === itemsUpgrades[item]["UpgradesMultipliers"][itemsUpgrades[item]["UpgradesMultipliers"].length-1]) {
        props.improvemulti(-itemsUpgrades[item]["InitialMulti"]);
        break;
      }
    }
  }

  

  return (
    <div>
      <details onToggle={handleItem} className="showitems" id="shItm">
        <summary>
          {item}
          <img src={`assets/${img}`} className={`image ${isClicked ? "inventoryitem-clicked" : "inventoryitem"}`}/>
          
        </summary>
        
        {equiped || <><button onClick={handleEquip}>Equipar</button> {errorEquip && <p>Você já tem um item desse tipo equipado</p>}</>}

        {equiped ? max ? <p className="MaxLevel">MAX LEVEL</p> : <>
          <p>Level: {level}</p>
          <p>Custo de upgrade: {itemsUpgrades[item]["UpgradesPrices"][level]}</p>
          <p>Próximo multiplicador: {itemsUpgrades[item]["UpgradesMultipliers"][level]}</p>
          <button onClick={handleUpgrade}>Upgrade</button>
        </> : null}
        {equiped && <button style={{backgroundColor: "red"}} onClick={handleDesequip}>Desequipar</button>}
        {errorUpgrade && <p>{errorUpgrade}</p>}
      </details>
    </div>
  )
}