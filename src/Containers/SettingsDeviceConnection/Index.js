import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button } from '@/Components'
import { useFocusEffect } from '@react-navigation/native'
import { CheckBondedService } from '@/Services/Device'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { navigate } from '@/Navigators/Root'

const SettingsDeviceConnectionContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const intentionId = useSelector((state) => state.intention).intention.settingsDeviceConnection;
    const [deviceConnected, setDeviceConnected] = useState(false);

    // Check if the device is bonded on view load
    useFocusEffect(
        React.useCallback(() =>  {
            const checkBonded = async () => {
                var checkBonded = await CheckBondedService();
                setDeviceConnected(checkBonded[0]);

                if (checkBonded[1] !== '') {
                    Toast.show({
                        text1: 'Could not check connection/bonding status',
                        text2: checkBonded[1],
                        type: 'error',
                        position: 'bottom',
                        visibilityTime: 10000
                    });
                }
            }

            checkBonded();

            return () => {
                // Hide the toasts when the user navigates away from the view
                Toast.hide();
            };
        }, [])
    );

    const continueCallback = () => {
        if (intentionId === 1) {
            navigate("SettingsDevicePassword", {});
        }
        else if (intentionId === 2) {
            navigate("SettingsDeviceWifi", {});
        }
        else {
            throw "Unknown intentionId!";
        }
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice"} previousView={"Settings"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>connect to your CloudLockr device via Bluetooth to proceed with configuration</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
                        <Text style={Fonts.detail}>{deviceConnected ? "Connected" : "Not Connected"}</Text>
                    </View>
                </View>
                {!deviceConnected && 
                    <Text style={[Fonts.detailBold, Fonts.textCenter, {color: Colors.red}]}>Device must be connected to proceed!</Text>
                }
                <View style={[Layout.row, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <Button title={"continue"} clickCallback={continueCallback} color={Colors.secondaryGreen} style={Layout.fill} setEnabled={deviceConnected} />
                </View>
            </View>
        </View>
    )
}

export default SettingsDeviceConnectionContainer;
