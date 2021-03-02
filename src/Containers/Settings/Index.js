import { useTheme } from '@/Theme'
import React from 'react'
import {
    View
} from 'react-native'
import { BasicHeader } from '@/Components'

const SettingsContainer = () => {
    const { Common, Layout, Colors } = useTheme();

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MySettings"} previousView={"Dashboard"} />
        </View>
    )
}

export default SettingsContainer;
