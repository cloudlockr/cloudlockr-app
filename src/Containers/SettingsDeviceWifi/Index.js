import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button, InputField, WifiList } from '@/Components'
import { useSelector } from 'react-redux'
import { navigate } from '@/Navigators/Root'

const SettingsDeviceWifiContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const confirmCallback = () => {
        // TODO: complex logic interaction
        // TODO: navigate to confirmation view once complete
    }

    const networkClickCallback = (clickedNetworkName) => {
        setConfirmedEnabled(true);
        setNetworkName(clickedNetworkName);
    }

    const [confirmEnabled, setConfirmedEnabled] = useState(false);
    const [networkName, setNetworkName] = useState("—— select network ——");

    return (
        <View style={[Layout.fill, Layout.column]}>
            <BasicHeader title={"MyDevice — Wifi"} previousView={"SettingsDeviceConnection"} />
            <View style={[Layout.fill, Layout.justifyContentBetween]}>
                <View style={[Layout.column, Layout.center, Layout.fill, Layout.justifyContentBetween, Common.backgroundPrimary]} >
                    <View style={[Layout.column, Layout.fill, Layout.fullWidth]}>
                        <View style={[Layout.fill]}>
                            <WifiList clickCallback={networkClickCallback} />
                        </View>
                    </View>
                </View>
                <View style={[Layout.column, Layout.center, Layout.justifyContentBetween, Gutters.regularVPadding, Common.backgroundSecondaryGreen]} >
                    <View style={[Gutters.largexlHPadding, Layout.fullWidth]}>
                        <Text style={[Fonts.detailFileName, Fonts.textCenter]}>enter password for:</Text>
                        <Text style={[Fonts.detailWhite, Gutters.regularBPadding, Fonts.textCenter]}>{networkName}</Text>
                        <InputField placeholder='network password' fieldId='5' hideInput={true} useLightInput={true} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largexlHPadding, Gutters.regularVPadding]}>
                        <Button title={"connect device to network"} clickCallback={confirmCallback} setEnabled={confirmEnabled} color={Colors.secondary} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsDeviceWifiContainer;
