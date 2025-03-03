import React, { useEffect, useState } from 'react';
import { initDataRaw, retrieveLaunchParams } from '@telegram-apps/sdk';
import { addUserIfNotExists } from './other/addUser';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const initDataRaw = retrieveLaunchParams();
        const telegramUserId = initDataRaw.tgWebAppData?.user?.id;
        const telegramUsername = initDataRaw.tgWebAppData?.user?.username;

        if (telegramUserId) {
          const userData = {
            username: telegramUsername || 'Unknown',
            createdAt: new Date().toISOString(),
          };
          await addUserIfNotExists(telegramUserId, userData);
        } else {
          console.warn('User data is not available.');
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false); // Завершение загрузки
      }
    };

    initApp();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      <p>User ID: {retrieveLaunchParams().tgWebAppData?.user?.id}</p>
      <p>Username: {retrieveLaunchParams().tgWebAppData?.user?.username}</p>
    </div>
  );
}

export default App;