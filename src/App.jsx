import { useState, useEffect } from 'react';

const ClickerGame = () => {
  // Состояние для монет и силы клика
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [upgradeCost, setUpgradeCost] = useState(50);
  const [autoClickerCost, setAutoClickerCost] = useState(10);

  // Загрузка сохранения
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('clickerSave'));
  if (saved) {
    setCoins(saved.coins);
    setClickPower(saved.clickPower);
    // ... остальные состояния
  }
}, []);

// Сохранение прогресса
useEffect(() => {
  const saveData = {
    coins,
    clickPower,
    autoClickers,
    upgradeCost,
    autoClickerCost
  };
  localStorage.setItem('clickerSave', JSON.stringify(saveData));
}, [coins, clickPower, autoClickers]);

  // Автокликеры
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setCoins(prev => prev + autoClickers);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers]);

  // Обработчик клика
  const handleClick = () => {
    setCoins(prev => prev + clickPower);
  };

  // Покупка улучшения
  const buyUpgrade = () => {
    if (coins >= upgradeCost) {
      setClickPower(prev => prev + 1);
      setCoins(prev => prev - upgradeCost);
      setUpgradeCost(prev => prev + 50);
    }
  };

  // Покупка автокликера
  const buyAutoClicker = () => {
    if (coins >= autoClickerCost) {
      setAutoClickers(prev => prev + 1);
      setCoins(prev => prev - autoClickerCost);
      setAutoClickerCost(prev => Math.ceil(prev * 1.5));
    }
  };

  // Форматирование чисел
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="game-container">
      <h1>Монеты: {formatNumber(coins)}</h1>
      
      <button 
        className="click-button"
        onClick={handleClick}
      >
        Кликай! (+{clickPower})
      </button>

      <div className="shop">
        <h2>Магазин</h2>
        
        <button 
          className="upgrade-button"
          onClick={buyUpgrade}
          disabled={coins < upgradeCost}
        >
          Улучшение клика ({formatNumber(upgradeCost)} монет)
        </button>

        <button 
          className="autoclicker-button"
          onClick={buyAutoClicker}
          disabled={coins < autoClickerCost}
        >
          Купить автокликер ({formatNumber(autoClickerCost)} монет) ⟳ {autoClickers}
        </button>
      </div>
    </div>
  );
};


export default ClickerGame;