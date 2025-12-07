import React from "react";
import {useNavigate} from "react-router-dom";
import "/src/styles/style2.css";

export const ShowGames = (props) => {
  const games = ["Roleta", "Adivinha", "Aventura"]
  const navigate = useNavigate();

  const handlePlay = (game) => {
    const updateData = JSON.parse(localStorage.getItem("gameData"))
    updateData.clicks = props.clicks;
    localStorage.setItem("gameData", JSON.stringify(updateData));
    const path = game.toLowerCase();
    navigate(`/${path}`);
  }
  
  return (
    <div>
      {games.map((game, index) => {
        return (
          <div className="game" key={index}>
            <details>
            <summary>
              <img src={`assets/${game.toLowerCase()}.png`}/>
              <h3>{game}</h3>
            </summary>
            <button onClick={() => handlePlay(game)}>Jogar</button>
            </details>
          </div>
        )
      })}
    </div>
  )
}