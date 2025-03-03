import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Глобальные стили приложения
import App from './App'; // Корневой компонент приложения
import { BrowserRouter } from 'react-router-dom'; // Для маршрутизации (если используется)

// Рендеринг приложения

  <React.StrictMode>
    {/* Оборачиваем приложение в BrowserRouter, если используется навигация */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>