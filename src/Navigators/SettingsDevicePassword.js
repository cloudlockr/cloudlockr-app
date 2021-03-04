import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsDevicePasswordContainer } from '@/Containers'

const Stack = createStackNavigator();

// @refresh reset
const SettingsDevicePasswordNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsDevicePassword" component={SettingsDevicePasswordContainer} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default SettingsDevicePasswordNavigator;
