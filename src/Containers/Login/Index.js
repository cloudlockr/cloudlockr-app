import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
} from 'react-native'
import { Brand, InputField, HorizontalLine, Button, ErrorAlert } from '@/Components'
import { useDispatch } from 'react-redux'
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
        const loginResult = await PostLoginService(email, password, dispatch);
        setSpinnerVisible(false);
        
        if (loginResult[0]) {
            navigate("Dashboard", {});
        } else {
            ErrorAlert("Login Error", loginResult[1]);
        }
    }

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <Spinner visible={spinnerVisible} />
            <View style={[Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding, Gutters.largexxlVPadding]}> 
                <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
                    <Brand />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='email' iconSrc={Images.userIcon} fieldId='1' finishEditingCallback={emailCallback} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='password' iconSrc={Images.keyIcon} fieldId='2' hideInput finishEditingCallback={passwordCallback} />
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
