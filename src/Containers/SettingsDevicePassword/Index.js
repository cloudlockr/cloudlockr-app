import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button, InputField } from '@/Components'
import { useSelector } from 'react-redux'
import { navigate } from '@/Navigators/Root'

const SettingsDevicePasswordContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const confirmCallback = () => {
        // TODO: complex logic interaction
        // TODO: navigate to confirmation view once complete
    }

    // TODO: add logic to only enable once fields are filled in (see login implementation)
    var confirmEnabled = false;

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice — Password"} previousView={"SettingsDeviceConnection"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>enter your new device master password</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 120}]}>
                        <InputField placeholder={"new device master password"} hideInput={true} fieldId={3} />
                        <InputField placeholder={"displayed device access code"} fieldId={4} />
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                        <Text style={[Fonts.detailExtraBold, Fonts.textCenter]}>WARNING!</Text>
                        <Text style={[Fonts.detail, Fonts.textCenter]}>changing your device password will make all previosuly stored data forever inaccessible!</Text>
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"confirm configuration"} clickCallback={confirmCallback} setEnabled={confirmEnabled} color={Colors.red} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsDevicePasswordContainer;
