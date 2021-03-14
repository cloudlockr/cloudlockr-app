import React, { useState } from 'react';
import {
    Text,
    View
} from 'react-native'
import { InputField, Button } from '@/Components'
import { useTheme } from '@/Theme'
import { SelectFileService } from '@/Services/FileSystem'

const UploadDetail = (props) => {
    const { Layout, Fonts, Gutters, Colors } = useTheme();

    const [nameEntered, setNameEntered] = useState(false);
    const [fileSelected, setFileSelected] = useState(false);
    const [password, setPassword] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false); 

    const [fileSelectorTitle, setFileSelectorTitle] = useState("select file"); 

    const requestCallback = props.requestCallback;

    const fileNameCallback = () => {
        setNameEntered(true);
        if (fileSelected && password !== '' && accessCode !== '')
            setButtonEnabled(true);
    }

    const fileSelectorCallback = async () => {
        // Select a file from the file system
        var fileMetadata = await SelectFileService();

        // Update the UI if a file has been successfully selected
        if (fileMetadata !== undefined) {
            setFileSelectorTitle(fileMetadata.name);
            setFileSelected(true);
            
            if (nameEntered && password !== '' && accessCode !== '')
                setButtonEnabled(true);
        }
    }

    const passwordCallback = (returnedPassword) => {
        setPassword(returnedPassword);
        if (nameEntered && fileSelected && accessCode !== '')
            setButtonEnabled(true);
    }
    
    const accessCodeCallback = (returnedCode) => {
        setAccessCode(returnedCode);
        if (nameEntered && fileSelected && password !== '')
            setButtonEnabled(true);
    }

    const uploadCallback = () => {
        requestCallback('upload', accessCode, password, undefined);
    }

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>upload new file</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 320}]}>
                <InputField placeholder={"file name"} fieldId={3} useLightInput finishEditingCallback={fileNameCallback} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={fileSelectorTitle} useInputFieldStyle style={Layout.fill} clickCallback={fileSelectorCallback} />
                </View>
                <InputField placeholder={"device password"} hideInput useLightInput finishEditingCallback={passwordCallback} returnValue persist={false} />
                <InputField placeholder={"displayed device access code"} useLightInput finishEditingCallback={accessCodeCallback} returnValue persits={false} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"upload file"} color={Colors.secondary} style={Layout.fill} setEnabled={buttonEnabled} clickCallback={uploadCallback} />
                </View>
            </View>
        </View>
    );
}

export default UploadDetail;
