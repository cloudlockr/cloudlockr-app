import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native'
import { InputField, Button } from '@/Components'
import { useTheme } from '@/Theme'

const UploadDetail = () => {
    const { Layout, Common, Fonts, Images, Gutters, Colors } = useTheme();

    const [nameEntered, setNameEntered] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [passwordEntered, setPasswordEntered] = useState(false);
    const [accessCodeEntered, setAccessCodeEntered] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false); 

    const [fileSelectorTitle, setFileSelectorTitle] = useState("select file"); 

    const fileNameCallback = () => {
        setNameEntered(true);
        if (fileSelected && passwordEntered && accessCodeEntered)
            setButtonEnabled(true);
    }

    const fileSelectorCallback = (fileName) => {
        // TODO: Remove else case once file selector is properly implemented
        if (fileName !== undefined)
            setFileSelectorTitle(fileName);
        else
            setFileSelectorTitle("testFile.pdf");

        setFileSelected(true);
        if (nameEntered && passwordEntered && accessCodeEntered)
            setButtonEnabled(true);
    }

    const passwordCallback = () => {
        setPasswordEntered(true);
        if (nameEntered && fileSelected && accessCodeEntered)
            setButtonEnabled(true);
    }
    
    const accessCodeCallback = () => {
        setAccessCodeEntered(true);
        if (nameEntered && fileSelected && passwordEntered)
            setButtonEnabled(true);
    }

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>upload new file</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 320}]}>
                <InputField placeholder={"file name"} fieldId={3} useLightInput={true} finishEditingCallback={fileNameCallback} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={fileSelectorTitle} useInputFieldStyle={true} style={Layout.fill} clickCallback={fileSelectorCallback} />
                </View>
                <InputField placeholder={"device password"} hideInput={true} fieldId={5} useLightInput={true} finishEditingCallback={passwordCallback} />
                <InputField placeholder={"displayed device access code"} fieldId={6} useLightInput={true} finishEditingCallback={accessCodeCallback} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"upload file"} color={Colors.secondary} style={Layout.fill} setEnabled={buttonEnabled} />
                </View>
            </View>
        </View>
    );
}

export default UploadDetail;