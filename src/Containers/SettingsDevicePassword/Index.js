import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text,
    Alert
} from 'react-native'
import { BasicHeader, Button, InputField, ErrorAlert } from '@/Components'
import { navigate } from '@/Navigators/Root'
import { SetPasswordService } from '@/Services/Device'
import Spinner from 'react-native-loading-spinner-overlay'

const SettingsDevicePasswordContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const [currentPassword, setCurrentPassword] = useState('');
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
        try {
            await SetPasswordService(currentPassword, password, accessCode);
            setSpinnerVisible(false);
            navigate("SettingsConfirmation", {});
        } catch (err) {
            setSpinnerVisible(false);
            ErrorAlert('Error while updating configuration', err);
        }
    }

    const currentPasswordCallback = (enteredPassword) => {
        setCurrentPassword(enteredPassword);
        if (password !== '' && accessCode !== '')
            setButtonEnabled(true);
    }

    const passwordCallback = (enteredPassword, isValid) => {
        if (!isValid) {
            setButtonEnabled(false);
            setPassword('');
            return;
        }

        setPassword(enteredPassword);
        if (accessCode !== '' && currentPassword !== '')
            setButtonEnabled(true);
    }
    
    const accessCodeCallback = (enteredCode) => {
        setAccessCode(enteredCode);
        if (password !== '' && currentPassword !== '')
            setButtonEnabled(true);
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <Spinner visible={spinnerVisible} textContent={spinnerMessage} textStyle={{color: Colors.white}} />
            <BasicHeader title={"MyDevice — Password"} previousView={"SettingsDeviceConnection"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>enter your new device master password</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 180}]}>
                        <InputField placeholder={"current device master password"} hideInput finishEditingCallback={currentPasswordCallback} />
                        <InputField placeholder={"new device master password"} hideInput finishEditingCallback={passwordCallback} minLength={4} />
                        <InputField placeholder={"displayed device access code"} finishEditingCallback={accessCodeCallback} />
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                        <Text style={[Fonts.detailExtraBold, Fonts.textCenter, {color: Colors.red}]}>WARNING!</Text>
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
