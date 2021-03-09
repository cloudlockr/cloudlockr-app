import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native'
import { useSelector } from 'react-redux'
import { InputField, Button } from '@/Components'
import { useTheme } from '@/Theme'

const DownloadDetail = () => {
    const { Layout, Fonts, Gutters, Colors } = useTheme();

    var downloadInfo = useSelector((state) => state.dashboard).downloadInfo;

    const [passwordEntered, setPasswordEntered] = useState(false);
    const [accessCodeEntered, setAccessCodeEntered] = useState(false);
    const [buttonsEnabled, setButtonsEnabled] = useState(false); 

    const passwordCallback = () => {
        setPasswordEntered(true);

        if (accessCodeEntered) {
            setButtonsEnabled(true);
        }   
    }
    
    const accessCodeCallback = () => {
        setAccessCodeEntered(true);

        if (passwordEntered) {
            setButtonsEnabled(true);
        }
    }

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>access {downloadInfo.fileName}</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 190}]}>
                <InputField placeholder={"device password"} hideInput={true} fieldId={3} useLightInput={true} finishEditingCallback={passwordCallback} />
                <InputField placeholder={"displayed device access code"} fieldId={4} useLightInput={true} finishEditingCallback={accessCodeCallback} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"download"} color={Colors.secondary} style={[Gutters.regularRPadding, {flex: 2}]} setEnabled={buttonsEnabled} />
                    <Button title={"delete"} color={Colors.red} style={{flex: 1}} setEnabled={buttonsEnabled} />
                </View>
            </View>
        </View>
    );
}

export default DownloadDetail;
