import React from "react"; 
import "/src/styles/general.css";

export const Status = (props) => {
  const {status} = props;
  
  return (
    <div className="statusBack">
      {status && status.map((stat) => <p className="status">{stat}</p>)}
      <button disabled>Rebirth</button>
      <button disabled>Super Rebirth</button>
    </div>
  )
}