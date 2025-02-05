import { useState, useEffect } from 'react';

const ClickerGame = () => {
  // Загрузка сохраненных данных
  const loadSave = () => {
    const savedData = JSON.parse(localStorage.getItem('hamsterClickerSave')) || {
      coins: 0,
      clickPower: 1,
      autoClickers: 0,
      upgradeCost: 50,
      autoClickerCost: 10
    };
    return savedData;
  };

  // Инициализация состояния из localStorage
  const [state, setState] = useState(() => loadSave());

  // Деструктурируем состояние для удобства
  const { 
    coins, 
    clickPower, 
    autoClickers, 
    upgradeCost, 
    autoClickerCost 
  } = state;

  // Автоматическое сохранение при любом изменении
  useEffect(() => {
    localStorage.setItem('hamsterClickerSave', JSON.stringify(state));
  }, [state]);

  // Автокликеры
  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setState(prev => ({ ...prev, coins: prev.coins + prev.autoClickers }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers]);

  // Обработчики действий
  const handleClick = () => {
    setState(prev => ({ ...prev, coins: prev.coins + prev.clickPower }));
  };

  const buyUpgrade = () => {
    if (coins >= upgradeCost) {
      setState(prev => ({
        ...prev,
        coins: prev.coins - prev.upgradeCost,
        clickPower: prev.clickPower + 1,
        upgradeCost: prev.upgradeCost + 50
      }));
    }
  };

  const buyAutoClicker = () => {
    if (coins >= autoClickerCost) {
      setState(prev => ({
        ...prev,
        coins: prev.coins - prev.autoClickerCost,
        autoClickers: prev.autoClickers + 1,
        autoClickerCost: Math.ceil(prev.autoClickerCost * 1.5)
      }));
    }
  };

  // Форматирование чисел
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Сброс прогресса
  const resetProgress = () => {
    localStorage.removeItem('hamsterClickerSave');
    setState(loadSave());
  };

  return (
    <div className="game-container">
      <h1>Монеты: {formatNumber(coins)}</h1>
      
      <button className="click-button" onClick={handleClick}>
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

        <button 
          className="reset-button"
          onClick={resetProgress}
        >
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
};

export default ClickerGame;