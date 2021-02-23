import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginContainer } from '@/Containers'

const Stack = createStackNavigator()

// @refresh reset
const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={LoginContainer} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default LoginNavigator
