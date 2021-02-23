import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import { Brand, InputField, HorizontalLine } from '@/Components'

const LoginContainer = () => {
    const { Common, Fonts, Gutters, Layout, Images } = useTheme()
    const dispatch = useDispatch()

    return (
        <View style={[Layout.fill, Layout.colCenter, Gutters.largeAPadding, Common.backgroundSecondary]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={[Layout.fullSize, Common.backgroundPrimary, Common.roundBox, Gutters.regularxlHPadding, Gutters.largexxxlVPadding]}> 
                <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
                    <Brand />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField height='50' placeholder='email' iconSrc={Images.userIcon} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <InputField height='50' placeholder='password' iconSrc={Images.keyIcon} />
                </View>
                <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
                    <HorizontalLine />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginContainer
