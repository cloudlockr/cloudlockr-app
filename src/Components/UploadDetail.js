import React from 'react';
import {
    Text,
    View
} from 'react-native'
import { InputField, Button } from '@/Components'
import { useTheme } from '@/Theme'

const UploadDetail = () => {
    const { Layout, Common, Fonts, Images, Gutters, Colors } = useTheme();

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>upload new file</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 320}]}>
                <InputField placeholder={"file name"} fieldId={3} useLightInput={true} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"select file"} useInputFieldStyle={true} style={Layout.fill} />
                </View>
                <InputField placeholder={"device password"} hideInput={true} fieldId={5} useLightInput={true} />
                <InputField placeholder={"displayed device access code"} fieldId={6} useLightInput={true} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"upload file"} color={Colors.secondary} style={Layout.fill} />
                </View>
            </View>
        </View>
    );
}

export default UploadDetail;