import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button, HorizontalLine } from '@/Components'

const SettingsContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MySettings"} previousView={"Dashboard"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <View style={[Gutters.largexxlBMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 150}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.listFileName}>hello,</Text>
                        <Text style={Fonts.listFileNameLighter}>frantzen.zane@gmail.com</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
                        <Text style={Fonts.detail}>Configured and Connected</Text>
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device password"} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device wifi settings"} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <HorizontalLine />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"log out"} color={Colors.secondary} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsContainer;
