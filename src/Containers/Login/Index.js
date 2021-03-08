import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
} from 'react-native'
import { Brand, InputField, HorizontalLine, Button } from '@/Components'
import { useDispatch } from 'react-redux'
import RemoveField from '@/Store/Fields/RemoveField'
import { useFocusEffect } from '@react-navigation/native';

const LoginContainer = () => {
    const { Common, Gutters, Layout, Images, Colors } = useTheme();
    const dispatch = useDispatch();

    const [emailEntered, setEmailEntered] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [loginButtonEnabled, setLoginButtonEnabled] = useState(false); 

    // Remove any stored credential data when the view loads from the store
    useFocusEffect(
        React.useCallback(() => {
            dispatch(RemoveField.action({ id: '1' }));
            dispatch(RemoveField.action({ id: '2' }));

            setEmailEntered(false);
            setPasswordEntered(false);
            setLoginButtonEnabled(false);

            return () => {
                // Nothing to do when screen is unfocused
            };
        }, [])
    );

    const emailCallback = () => {
        setEmailEntered(true);

        if (passwordEntered) {
            setLoginButtonEnabled(true);
        }   
    }
    
    const passwordCallback = () => {
        setPasswordEntered(true);

        if (emailEntered) {
            setLoginButtonEnabled(true);
        }
    }

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <View style={[Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding, Gutters.largexxlVPadding]}> 
                <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
                    <Brand />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='email' iconSrc={Images.userIcon} fieldId='1' finishEditingCallback={emailCallback} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='password' iconSrc={Images.keyIcon} fieldId='2' hideInput={true} finishEditingCallback={passwordCallback} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <Button title='log in' color={Colors.secondaryGreen} destParams={{}} newViewId={"Dashboard"} setEnabled={loginButtonEnabled} />
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
