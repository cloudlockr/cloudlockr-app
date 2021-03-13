import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Alert,
} from 'react-native'
import { Brand, InputField, HorizontalLine, Button } from '@/Components'
import { useDispatch } from 'react-redux'
import RemoveField from '@/Store/Fields/RemoveField'
import { useFocusEffect } from '@react-navigation/native'
import { PostLoginService } from '@/Services/Server'
import { navigate } from '@/Navigators/Root'
import Spinner from 'react-native-loading-spinner-overlay'

const LoginContainer = () => {
    const { Common, Gutters, Layout, Images, Colors } = useTheme();
    const dispatch = useDispatch();

    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [loginButtonEnabled, setLoginButtonEnabled] = useState(false); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Remove any stored credential data when the view loads from the store
    useFocusEffect(
        React.useCallback(() => {
            dispatch(RemoveField.action({ id: '1' }));
            dispatch(RemoveField.action({ id: '2' }));

            setEmail('');
            setPassword('');
            setSpinnerVisible(false);
            setLoginButtonEnabled(false);

            return () => {
                // Nothing to do when screen is unfocused
            };
        }, [])
    );

    const emailCallback = (enteredEmail) => {
        setEmail(enteredEmail);
        if (password !== "")
            setLoginButtonEnabled(true);
    }
    
    const passwordCallback = (enteredPassword) => {
        setPassword(enteredPassword);
        if (email !== "")
            setLoginButtonEnabled(true);
    }

    const loginCallback = async () => {
        setSpinnerVisible(true);
        const loginResult = await PostLoginService(email, password);
        setSpinnerVisible(false);
        
        if (loginResult[0]) {
            navigate("Dashboard", {});
        } else {
            loginErrorAlert(loginResult[1]);
        }
    }

    const loginErrorAlert = (message) => {
        Alert.alert(
            "Login Error",
            message,
            [
                {
                text: "Cancel",
                style: "cancel"
                }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <Spinner visible={spinnerVisible} />
            <View style={[Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding, Gutters.largexxlVPadding]}> 
                <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
                    <Brand />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='email' iconSrc={Images.userIcon} fieldId='1' finishEditingCallback={emailCallback} returnValue={true} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='password' iconSrc={Images.keyIcon} fieldId='2' hideInput={true} finishEditingCallback={passwordCallback} returnValue={true} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <Button title='log in' color={Colors.secondaryGreen} clickCallback={loginCallback} setEnabled={loginButtonEnabled} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <HorizontalLine />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <Button title='register' color={Colors.secondaryGreen} destParams={{}} newViewId={"Registration"} />
                </View>
            </View>
        </View>
    )
}

export default LoginContainer;
