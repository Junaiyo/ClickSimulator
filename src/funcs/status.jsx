import React, {useState, useEffect} from "react"; 
import "/src/styles/general.css";

export const Status = (props) => {
  const {status, rebirths, spr, clicks, multiplier} = props;
  const [showrebirth, setshowrebirth] = useState(false);
  const [reqRb, setReqRb] = useState();
  const [reqSp, setReqSp] = useState();
  const [showMessage, setShowMessage] = useState("");
  const [buff, setBuff] = useState();
  const [buffSp, setBuffSp] = useState();

  const rebirth = () => {
    setshowrebirth(!showrebirth);
    setShowMessage("");
    calcRebirth();
    calcBuff();
  }

  const calcRebirth = () => {
    const calc1 = rebirths === 0 ? 100000 : Math.floor(100000 + 100000 * rebirths - ((13 * 100000) / 100)); 
    const calc2 = spr === 0 ? 5 : Math.floor(5 * spr - ((-60 * 5) / 100))
    
    setReqRb(calc1);
    setReqSp(calc2);
  }

  const calcBuff = () => {
    const calc1 = Math.floor((multiplier / 100) + ((rebirths === 0 ? 1 : rebirths) * 100));
    const calc2 = Math.floor((multiplier / 100) + ((spr === 0 ? 1 : spr) * 100)*2);
    setBuff(calc1/100);
    setBuffSp(calc2/100);
  }

  const makeRebirth = () => {
    if (clicks >= reqRb) {
      props.setRB();
      props.setRebirth((prev) => prev + 1);
      setShowMessage("Rebirth realizado com sucesso");
      props.setspentclicks((prev) => prev + reqRb);
      props.improvemultiplier(buff);
      return;
    }
    setShowMessage("Clicks insuficientes");
  }

  const makeSpRebirth = () => {
    if (rebirths >= reqSp) {
      props.setRB()
      props.setSpr((prev) => prev + 1);
      props.setRebirth((prev) => prev - reqSp);
      setShowMessage("Super Rebirth realizado com sucesso");
      props.improvemultiplier(buffSp);
      return;
    }
    setShowMessage("Rebirths insuficientes");
  }

  useEffect(() => {
    calcRebirth();
    calcBuff();
  }, []);
  useEffect(() => {
    calcRebirth();
    calcBuff();
  }, [rebirths, spr]);

  
  return (
    <div className="statusBack">
      {status && status.map((stat) => <p className="status">{stat}</p>)}
      <button onClick={makeRebirth}>Rebirth</button>
      <button onClick={makeSpRebirth}>Super Rebirth</button>
      <button className="InfoRebirth" onClick={rebirth}>Requisitos rebirths</button>
      {showrebirth &&
        <p className="ShowRebirth">Requisito próximo Rb: {reqRb}
          <br/>
          Benefício: {buff}+ multi
          <br/>
           Requisito próximo Sp: {reqSp}Rb
          <br/>
          Benefício: {buffSp}+ multi
        </p>
      }
      {showMessage && <p className="ShowMessageRB">{showMessage}</p>}
    </div>
  )
}