import React, { useReducer, useEffect, useState } from 'react';
import './App.css';

function Coin() {

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('counter');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  useEffect (() => {
    localStorage.setItem('counter', JSON.stringify(count));
  }, [count])

  return (

    <button className='coin' onClick={handleClick}>
      <h2> {count} </h2>
      <img  src="/img/coin.jpg" alt="Описание изображения"/>
    </button>

  );

  function handleClick() {
    setCount(count+1);
  };

}



export default Coin;