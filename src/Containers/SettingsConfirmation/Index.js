import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button } from '@/Components'
import { navigate } from '@/Navigators/Root'

const SettingsConfirmationContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const confirmCallback = () => {
        navigate("Settings", {});
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice"} previousView={"Settings"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <Text style={[Fonts.listFileName, Fonts.textCenter]}>configuration update successful!</Text>
                <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largexlTPadding]}>
                    <Button title={"okay"} clickCallback={confirmCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                </View>
            </View>
        </View>
    )
}

export default SettingsConfirmationContainer;
