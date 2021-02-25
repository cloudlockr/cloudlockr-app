import { useTheme } from '@/Theme'
import React, { useEffect } from 'react'
import {
    View,
    BackHandler
} from 'react-native'
import { DashboardHeader } from '@/Components'


const DashboardContainer = () => {
    const { Common, Gutters, Layout, Images, Colors } = useTheme()

    // Prevent user from going back to login view via back button press
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return (
        <View style={[Layout.fill, Common.backgroundPrimary]}>
            <DashboardHeader title='MyLockr' />
        </View>
    )
}

export default DashboardContainer
