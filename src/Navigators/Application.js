import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IndexStartupContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { SafeAreaView, StatusBar } from 'react-native'
import { useTheme } from '@/Theme'
import { AppearanceProvider } from 'react-native-appearance'
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator()

let LoginNavigator
let DashboardNavigator
let SettingsNavigator
let SettingsDeviceConnectionNavigator

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector((state) => state.startup.loading)

  useEffect(() => {
    if (LoginNavigator == null && !applicationIsLoading) {
      LoginNavigator = require('@/Navigators/Login').default
      DashboardNavigator = require('@/Navigators/Dashboard').default
      SettingsNavigator = require('@/Navigators/Settings').default
      SettingsDeviceConnectionNavigator = require('@/Navigators/SettingsDeviceConnection').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  // on destroy needed to be able to reset when app close in background (Android)
  useEffect(
    () => () => {
      setIsApplicationLoaded(false)
      LoginNavigator = null
      DashboardNavigator = null
      SettingsNavigator = null
      SettingsDeviceConnectionNavigator = null
    },
    [],
  )

  const customTransition1 = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.9],
                  })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
  }

  return (
    <AppearanceProvider>
      <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Startup" component={IndexStartupContainer} />
            {isApplicationLoaded && LoginNavigator != null && (
              <Stack.Screen
                name="Main"
                component={LoginNavigator}
                options={{
                  animationEnabled: false,
                }}
              />
            )}
            {isApplicationLoaded && DashboardNavigator != null && (<Stack.Screen
                name="Dashboard"
                component={DashboardNavigator}
                options={{
                  ...customTransition1,
                }}
              />
            )}
            {isApplicationLoaded && SettingsNavigator != null && (<Stack.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  ...customTransition1,
                }}
              />
            )}
            {isApplicationLoaded && SettingsDeviceConnectionNavigator != null && (<Stack.Screen
                name="SettingsDeviceConnection"
                component={SettingsDeviceConnectionNavigator}
                options={{
                  ...customTransition1,
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppearanceProvider>
  )
}

export default ApplicationNavigator
