import React, {useState} from "react";
import "/src/styles/general.css";

export const ShowItems = (props) => {
  const {item, imgName, price, multiplier, rebirth, spr, success, type, especify, nums} = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked)
    props.setsuccess(nums, null);
  }
  
  return (
    <div>
        <details className="showitems" onToggle={handleClick}>
          <summary>
            {imgName && <img src={`assets/${imgName}`} className={`image ${isClicked ? "lojaitem-clicked" : "lojaitem"}`}/>}
            
           {item}
          </summary>
          <p>Preço: <span>{!props.isBuff ? price : `${price}%`}</span></p>
          {props.mNimo && <p>Preço mínimo: <span>{props.mNimo}</span></p>}
          {multiplier && <p>Multiplicador: <span>{multiplier}</span></p>}
          <p>Rebirths: <span>{rebirth}</span></p>
          <p>Super Rebirths: <span>{spr}</span></p>
          {!props.isBuff &&
          <button onClick={()=>props.handleBuy(price, rebirth, spr, item, imgName, type, especify, props.setsuccess, nums)}>Comprar</button>}
          {props.isBuff &&
          <button onClick={()=>props.handleBuy(price, rebirth, spr, props.time, props.bName, props.mNimo, props.isPerma, props.iName)}>Comprar</button>}
          {success && <p>{success}</p>}
        </details>
    </div>
  )
}