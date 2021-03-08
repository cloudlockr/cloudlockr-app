import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Keyboard,
} from 'react-native'
import { InputField, Button } from '@/Components'
import { useSelector, useDispatch } from 'react-redux'
import RemoveField from '@/Store/Fields/RemoveField'
import { navigate } from '@/Navigators/Root'
import { useFocusEffect } from '@react-navigation/native';

// Forces a view update (which allows for the login button visibility to be updated)
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const RegisterContainer = () => {
    const { Common, Gutters, Layout, Images, Colors, Fonts } = useTheme();
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();

    const [emailEntered, setEmailEntered] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [registerButtonEnabled, setRegisterButtonEnabled] = useState(false); 

    // Remove any stored credential data when the view loads from the store
    useFocusEffect(
        React.useCallback(() => {
            dispatch(RemoveField.action({ id: '1' }));
            dispatch(RemoveField.action({ id: '2' }));

            setEmailEntered(false);
            setPasswordEntered(false);
            setRegisterButtonEnabled(false);

            return () => {
                // Nothing to do when screen is unfocused
            };
        }, [])
    );

    const backClick = () => {
        Keyboard.dismiss();
        navigate("Main", {});
    }

    const emailCallback = () => {
        setEmailEntered(true);

        if (passwordEntered) {
            setRegisterButtonEnabled(true);
        }   
    }
    
    const passwordCallback = () => {
        setPasswordEntered(true);

        if (emailEntered) {
            setRegisterButtonEnabled(true);
        }
    }

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <View style={[Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding]}> 
                <View style={[Gutters.regularxlTPadding, {height: 30, width: 30}]}>
                    <TouchableOpacity onPress={backClick}>
                        <Image style={{height: 22, width: 22}} source={Images.xIcon} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={[Layout.justifyContentCenter, Layout.fill]}>
                    <View style={[Layout.column, Layout.alignItemsCenter, Gutters.regularxlBPadding]}>
                            <Text style={[Fonts.listFileNameLighter, Fonts.textCenter]}>enter your details</Text>
                        </View>
                    <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                        <InputField placeholder='email' iconSrc={Images.userIcon} fieldId='1' finishEditingCallback={emailCallback} />
                    </View>
                    <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                        <InputField placeholder='password' iconSrc={Images.keyIcon} fieldId='2' hideInput={true} finishEditingCallback={passwordCallback} />
                    </View>
                    <View style={[Layout.rowCenter]}>
                        <Button title='register' color={Colors.secondaryGreen} destParams={{}} newViewId={"Dashboard"} setEnabled={registerButtonEnabled} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RegisterContainer;
