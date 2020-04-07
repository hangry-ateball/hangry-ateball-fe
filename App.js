import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabs } from './src/screens/tabs/MaterialBottomTabs'

export default App = () => {
  return (
    <NavigationContainer>
      {createBottomTabs()}
    </NavigationContainer>
  );
}
