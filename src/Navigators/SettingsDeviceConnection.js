import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SettingsDeviceConnectionContainer } from '@/Containers'

const Stack = createStackNavigator();

// @refresh reset
const SettingsDeviceConnectionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsDeviceConnection" component={SettingsDeviceConnectionContainer} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default SettingsDeviceConnectionNavigator;
