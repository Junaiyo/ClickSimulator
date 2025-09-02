import React, {useState} from "react";
import "/src/styles/general.css";

export const ShowItems = (props) => {
  const {item, imgName, price, multiplier, rebirth, spr, success, type, especify} = props;
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked)
    props.setsuccess(null);
  }
  
  return (
    <div>
        <details className="showitems" onToggle={handleClick}>
          <summary>
            <img src={`assets/${imgName}`} className={`image ${isClicked ? "lojaitem-clicked" : "lojaitem"}`}/>
            
            {item}
          </summary>
          <p>Preço: <span>{price}</span></p>
          <p>Multiplicador: <span>{multiplier}</span></p>
          <p>Rebirths: <span>{rebirth}</span></p>
          <p>Super Rebirths: <span>{spr}</span></p>
          <button onClick={()=>props.handleBuy(price, rebirth, spr, item, imgName, type, especify)}>Comprar</button>
          {success && <p>{success}</p>}
        </details>
    </div>
  )
}