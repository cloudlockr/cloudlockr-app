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

    // TODO: read from the Redux store later to identify the status and error message to display
    const status = "successful"

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice"} previousView={"Settings"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <Text style={[Fonts.detailDarkFileName, Fonts.textCenter]}>configuration update {status}</Text>
                <View style={[Layout.row, Layout.alignItemsCenter, Gutters.regularxlTPadding]}>
                    <Button title={"done"} clickCallback={confirmCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                </View>
            </View>
        </View>
    )
}

export default SettingsConfirmationContainer;
