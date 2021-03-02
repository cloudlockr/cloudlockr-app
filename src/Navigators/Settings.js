import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsContainer } from '@/Containers'

const Stack = createStackNavigator();

// @refresh reset
const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsContainer} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default SettingsNavigator;
