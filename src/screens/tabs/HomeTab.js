import React from 'react'
import FormScreen from '../FormScreen'
import ResultScreen from '../ResultScreen'
import StartScreen from '../StartScreen'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Hangry Ateball" component={StartScreen} />
      <Stack.Screen name="Form" component={FormScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  )
}

export default HomeTab;