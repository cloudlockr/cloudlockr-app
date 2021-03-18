import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native'
import { useSelector } from 'react-redux'
import { InputField, Button } from '@/Components'
import { useTheme } from '@/Theme'

const DownloadDetail = (props) => {
    const { Layout, Fonts, Gutters, Colors } = useTheme();

    const requestCallback = props.requestCallback;

    var downloadInfo = useSelector((state) => state.fileTransfer).details;

    const [password, setPassword] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [buttonsEnabled, setButtonsEnabled] = useState(false); 

    const passwordCallback = (returnedPassword) => {
        setPassword(returnedPassword);
        if (accessCode !== '')
            setButtonsEnabled(true);
    }
    
    const accessCodeCallback = (returnedCode) => {
        setAccessCode(returnedCode);
        if (password !== '')
            setButtonsEnabled(true);
    }

    const downloadCallback = () => {
        requestCallback('download', accessCode, password, downloadInfo.id);
    }

    const deleteCallback = () => {
        requestCallback('delete', accessCode, password, downloadInfo.id);
    }

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>access {downloadInfo.fileName}</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 190}]}>
                <InputField placeholder={"device password"} hideInput useLightInput finishEditingCallback={passwordCallback} />
                <InputField placeholder={"displayed device access code"} useLightInput finishEditingCallback={accessCodeCallback} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"download"} color={Colors.secondary} style={[Gutters.regularRPadding, {flex: 2}]} setEnabled={buttonsEnabled} clickCallback={downloadCallback} />
                    <Button title={"delete"} color={Colors.red} style={{flex: 1}} setEnabled={buttonsEnabled} clickCallback={deleteCallback} />
                </View>
            </View>
        </View>
    );
}

export default DownloadDetail;
