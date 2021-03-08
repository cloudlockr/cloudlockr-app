import React from 'react';
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

    return (
        <View style={[Layout.column, Layout.alignItemsCenter, Gutters.largexlHPadding]} >
            <Text style={[Fonts.detailFileName, Gutters.regularxlVPadding]}>access {downloadInfo.fileName}</Text>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 190}]}>
                <InputField placeholder={"device password"} hideInput={true} fieldId={3} useLightInput={true} />
                <InputField placeholder={"displayed device access code"} fieldId={4} useLightInput={true} />
                <View style={[Layout.row, Layout.alignItemsCenter]}>
                    <Button title={"download"} color={Colors.secondary} style={[Gutters.regularRPadding, {flex: 2}]} />
                    <Button title={"delete"} color={Colors.red} style={{flex: 1}} />
                </View>
            </View>
        </View>
    );
}

export default DownloadDetail;
