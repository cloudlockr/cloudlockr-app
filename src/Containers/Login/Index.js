import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
} from 'react-native'
import { Brand, InputField, HorizontalLine, Button } from '@/Components'
import { useSelector, useDispatch } from 'react-redux'
import RemoveField from '@/Store/Fields/RemoveField'
import { useFocusEffect } from '@react-navigation/native';

// Forces a view update (which allows for the login button visibility to be updated)
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const LoginContainer = () => {
    const { Common, Gutters, Layout, Images, Colors } = useTheme();
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();

    // Enable the login button only after each of the fields have been entered
    // TODO: a bit buggy after you log out and try to log back in. Button highlights before password is entered
    var loginButtonEnabled;
    var fields = useSelector((state) => state.fields).fields;
    if (fields['1'] !== undefined && fields['2'] !== undefined) {
        loginButtonEnabled = true;
    }
    else {
        loginButtonEnabled = false;
    }

    // Remove any stored credential data when the view loads from the store
    useFocusEffect(
        React.useCallback(() => {
            dispatch(RemoveField.action({ id: '1' }));
            dispatch(RemoveField.action({ id: '2' }));

            return () => {
                // Nothing to do when screen is unfocused
            };
        }, [])
    );

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <View style={[Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding, Gutters.largexxlVPadding]}> 
                <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
                    <Brand />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='email' iconSrc={Images.userIcon} fieldId='1' callback={forceUpdate} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField placeholder='password' iconSrc={Images.keyIcon} fieldId='2' hideInput={true} callback={forceUpdate} />
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
