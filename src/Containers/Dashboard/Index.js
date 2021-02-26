import { useTheme } from '@/Theme'
import React, { useEffect } from 'react'
import {
    View,
    BackHandler
} from 'react-native'
import { DashboardHeader, FileList } from '@/Components'


const DashboardContainer = () => {
    const { Common, Gutters, Layout, Images, Colors } = useTheme()

    // Prevent user from going back to login view via back button press
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <DashboardHeader />
            <FileList />
        </View>
    )
}

export default DashboardContainer
