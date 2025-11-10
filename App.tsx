// App.tsx
/* import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
} */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import RootStackNavigator from './src/navigation/RootStackNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <RootStackNavigator /> // Màn hình đã đăng nhập
      ) : (
        <AuthStackNavigator onLogin={() => setIsLoggedIn(true)} /> // Màn hình đăng nhập
      )}
    </NavigationContainer>
  );
}
