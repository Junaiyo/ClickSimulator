import React from 'react';
import "/src/styles/style.css";

export const LojaMenu = (props) => {
  const {buttons, components, id} = props;
    
  return (
    <div className="Loja" id={id}>
        <div>
          <span></span>
          <span></span>
        </div>
      {buttons && buttons.map((button) => button)}
        <div>
          {components && components.map((component) => component)}
        </div>
      </div>
  )
}