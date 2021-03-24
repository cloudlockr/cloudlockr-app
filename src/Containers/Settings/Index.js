import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { BasicHeader, Button, HorizontalLine, ErrorAlert } from '@/Components'
import SetIntention from '@/Store/Intention/SetIntention'
import PostLogout from '@/Services/Server/PostLogout'
import { CheckBondedService } from '@/Services/Device'
import { navigateAndSimpleReset, navigate } from '@/Navigators/Root'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import Spinner from 'react-native-loading-spinner-overlay'

const SettingsContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();
    const dispatch = useDispatch();

    const [spinnerVisible, setSpinnerVisible] = useState(false);
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

    const devicePasswordCallback = () => {
        dispatch(SetIntention.action({ id: "settingsDeviceConnection", value: 1 }));
        navigate("SettingsDeviceConnection", {});
    }

    const deviceWifiCallback = () => {
        dispatch(SetIntention.action({ id: "settingsDeviceConnection", value: 2 }));
        navigate("SettingsDeviceConnection", {});
    }
    
    const logOutCallback = async () => {
        setSpinnerVisible(true);
        const logoutResult = await PostLogout(userAuthToken, dispatch);
        setSpinnerVisible(false);
        
        if (logoutResult[0]) {
            navigateAndSimpleReset("Main");
        } else {
            ErrorAlert("Logout Error", logoutResult[1]);
        }
    }

    const userEmail = useSelector((state) => state.user).email;
    const userAuthToken = useSelector((state) => state.user).token;

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <Spinner visible={spinnerVisible} />
            <BasicHeader title={"MySettings"} previousView={"Dashboard"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <View style={[Gutters.largexxlBMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 150}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.listFileName}>hello,</Text>
                        <Text style={Fonts.listFileNameLighter}>{userEmail}</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
                        <Text style={Fonts.detail}>{deviceConnected ? "Connected" : "Not Connected"}</Text>
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device password"} clickCallback={devicePasswordCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device wifi settings"} clickCallback={deviceWifiCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <HorizontalLine />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"log out"} clickCallback={logOutCallback} color={Colors.secondary} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsContainer;
