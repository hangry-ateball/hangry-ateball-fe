import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeTab from './HomeTab'
import PrevTab from './PrevTab'
import FavsTab from './FavsTab'

const MaterialBottomTabs = createMaterialBottomTabNavigator();

export const createBottomTabs = () => {
  return (
    <MaterialBottomTabs.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="lightgrey"
    >
      <MaterialBottomTabs.Screen 
        name="Previous" 
        component={PrevTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon 
              style={[{ height: 50, width: 40 }]} 
              color={color} 
              size={40} 
              name={'view-list'} />
          )
        }}
      />
      <MaterialBottomTabs.Screen
        name="Home"
        style={{ marginBottom: 16 }}
        component={HomeTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon 
              style={[{ height: 50, width: 40 }]} 
              color={color} 
              size={40} 
              name={'numeric-8-circle'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen 
        name="Favorites" 
        component={FavsTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Icon 
            style={[{ height: 50, width: 40 }]} 
            color={color} 
            size={40} 
            name={'star'} />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  )
}