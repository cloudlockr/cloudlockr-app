import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text,
    Alert,
} from 'react-native'
import { BasicHeader, Button, HorizontalLine, ErrorAlert } from '@/Components'
import SetIntention from '@/Store/Intention/SetIntention'
import { DeleteUserService, PostLogoutService } from '@/Services/Server'
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
    const [deviceConnected, setDeviceConnected] = useState('-- Checking Status --');

    // Check if the device is bonded on view load
    useFocusEffect(
        React.useCallback(() =>  {
            const checkBonded = async () => {
                try {
                    await CheckBondedService();
                    setDeviceConnected('Connected');
                } catch (err) {
                    setDeviceConnected('Not Connected');
                    ErrorAlert('Could not check connection/bonding status', err);
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
        try {
            await PostLogoutService(userAuthToken, dispatch);
            setSpinnerVisible(false);
            navigateAndSimpleReset("Main");
        } catch (err) {
            setSpinnerVisible(false);
            ErrorAlert("Error while logging out", err);
        }
    }

    const deleteAccountCallback = async () => {
        // Show confirmation alert to ensure the user does not accidentally delete their account
        Alert.alert(
            "ACCOUNT DELETION WARNING",
            "Deleting your account is irreversible. If you choose to proceed, we will delete all of your user data, including all encrypted file data stored on our servers.",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Accept & Continue", onPress: deleteAccount }
            ],
            { cancelable: true }
          );
    }

    const deleteAccount = async () => {
        setSpinnerVisible(true);
        try {
            await DeleteUserService(userAuthToken, dispatch);
            setSpinnerVisible(false);
            navigateAndSimpleReset("Main");
        } catch (err) {
            setSpinnerVisible(false);
            ErrorAlert("Error while deleting acccount", err);
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
                        <Text style={Fonts.detail}>{deviceConnected}</Text>
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 300}]}>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device password settings"} clickCallback={devicePasswordCallback} color={Colors.secondaryGreen} style={Layout.fill} />
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
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <HorizontalLine />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"delete account"} clickCallback={deleteAccountCallback} color={Colors.red} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsContainer;
