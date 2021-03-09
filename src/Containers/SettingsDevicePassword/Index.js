import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text,
    Alert
} from 'react-native'
import { BasicHeader, Button, InputField } from '@/Components'
import { navigate } from '@/Navigators/Root'

const SettingsDevicePasswordContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const confirmCallback = () => {
        // Show confirmation alert to ensure the user does not accidentally change password
        Alert.alert(
            "PASSWORD CHANGE WARNING",
            "Changing your device password will make all previosuly stored data forever inaccessible. This process is irreversable.",
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

    const performPasswordChange = () => {
        // TODO: complex logic interaction via service layer
        // TODO: show an activity indicator while the complex logic is running
        navigate("SettingsConfirmation", {});
    }

    const [passwordEntered, setPasswordEntered] = useState(false);
    const [accessCodeEntered, setAccessCodeEntered] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false); 

    const passwordCallback = () => {
        setPasswordEntered(true);
        if (accessCodeEntered)
            setButtonEnabled(true);
    }
    
    const accessCodeCallback = () => {
        setAccessCodeEntered(true);
        if (passwordEntered)
            setButtonEnabled(true);
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MyDevice — Password"} previousView={"SettingsDeviceConnection"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlTMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.listFileName, Fonts.textCenter]}>enter your new device master password</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 120}]}>
                        <InputField placeholder={"new device master password"} hideInput={true} fieldId={3} finishEditingCallback={passwordCallback} />
                        <InputField placeholder={"displayed device access code"} fieldId={4} finishEditingCallback={accessCodeCallback} />
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexxlBPadding]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                        <Text style={[Fonts.detailExtraBold, Fonts.textCenter]}>WARNING!</Text>
                        <Text style={[Fonts.detail, Fonts.textCenter]}>changing your device password will make all previosuly stored data forever inaccessible!</Text>
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
