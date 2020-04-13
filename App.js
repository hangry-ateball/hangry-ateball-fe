import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabs } from './src/screens/tabs/MaterialBottomTabs'

const App = () => {
  return (
    <NavigationContainer>
      {createBottomTabs()}
    </NavigationContainer>
  );
}

export default App