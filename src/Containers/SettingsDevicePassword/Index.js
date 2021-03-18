import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text,
    Alert
} from 'react-native'
import { BasicHeader, Button, InputField } from '@/Components'
import { navigate } from '@/Navigators/Root'
import { SetPasswordService } from '@/Services/Device'
import Spinner from 'react-native-loading-spinner-overlay'

const SettingsDevicePasswordContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const [password, setPassword] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false); 
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [spinnerMessage, setSpinnerMessage] = useState('processing');

    const confirmCallback = () => {
        // Show confirmation alert to ensure the user does not accidentally change password
        Alert.alert(
            "PASSWORD CHANGE WARNING",
            "Changing your device password will make all previously stored data inaccessible (unless the password is reverted at a future date to the old value)",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Accept & Continue", onPress: performPasswordChange }
            ],
            { cancelable: true }
          );
    }

    const performPasswordChange = async () => {
        setSpinnerVisible(true);
        const changeResult = await SetPasswordService(password, accessCode);
        setSpinnerVisible(false);

        if (changeResult[0]) {
            navigate("SettingsConfirmation", {});
        } else {
            errorAlert(changeResult[1]);
        }
    }

    const errorAlert = (message) => {
        Alert.alert(
            "Error Occured While Updating",
            message + ". Please try again later and/or resolve the error.",
            [
                {
                text: "Cancel",
                style: "cancel"
                }
            ],
            { cancelable: true }
        );
    }

    const passwordCallback = (enteredPassword) => {
        setPassword(enteredPassword);
        if (accessCode !== '')
            setButtonEnabled(true);
    }
    
    const accessCodeCallback = (enteredCode) => {
        setAccessCode(enteredCode);
        if (password !== '')
            setButtonEnabled(true);
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <Spinner visible={spinnerVisible} textContent={spinnerMessage} textStyle={{color: Colors.white}} />
            <BasicHeader title={"MyDevice — Password"} previousView={"SettingsDeviceConnection"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>enter your new device master password</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 120}]}>
                        <InputField placeholder={"new device master password"} hideInput finishEditingCallback={passwordCallback} />
                        <InputField placeholder={"displayed device access code"} finishEditingCallback={accessCodeCallback} />
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                        <Text style={[Fonts.detailExtraBold, Fonts.textCenter]}>WARNING!</Text>
                        <Text style={[Fonts.detail, Fonts.textCenter]}>changing your device password will make all previously stored data inaccessible!</Text>
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"confirm configuration"} clickCallback={confirmCallback} setEnabled={buttonEnabled} color={Colors.red} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsDevicePasswordContainer;
