import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { init, miniApp, mainButton, shareURL } from '@telegram-apps/sdk';


const initializeTelegramSDK = async () => {
  try {
    await init();


    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      console.log('Mini App готово');

      miniApp.setHeaderColor('#fcb69f');
    }


  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
};



initializeTelegramSDK();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)