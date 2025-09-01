import React from 'react';
import "/src/styles/style.css";

export const RendPerso = (props) => {
  const {renders} = props;

  return (
    <>
      {renders && renders.map((item) => {
      return <img src={`/src/assets/${item[0]}`} className={`image ${item[1]}`}/>
      })}
    </>
  )
}