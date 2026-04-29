import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { initNetworkListener } from './src/services/syncService';
import { setUserOnline, setUserOffline } from './src/services/presenceService';

const USER_ID = 'User_' + Math.floor(Math.random() * 1000);

export default function App() {
  useEffect(() => {
    initNetworkListener();

    setUserOnline(USER_ID);

    return () => {
      setUserOffline(USER_ID);
    };
  }, []);

  return <AppNavigator />;
}