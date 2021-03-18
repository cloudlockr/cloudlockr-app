import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { BasicHeader, Button, HorizontalLine } from '@/Components'
import SetIntention from '@/Store/Intention/SetIntention'
import { navigate } from '@/Navigators/Root'
import { useSelector, useDispatch } from 'react-redux'

const SettingsContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();
    const dispatch = useDispatch();

    const devicePasswordCallback = () => {
        dispatch(SetIntention.action({ id: "settingsDeviceConnection", value: 1 }));
        navigate("SettingsDeviceConnection", {});
    }
    const deviceWifiCallback = () => {
        dispatch(SetIntention.action({ id: "settingsDeviceConnection", value: 2 }));
        navigate("SettingsDeviceConnection", {});
    }
    const logOutCallback = () => {
        navigate("Main", {});
    }

    var userEmail = useSelector((state) => state.user).email;

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <BasicHeader title={"MySettings"} previousView={"Dashboard"} />
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <View style={[Gutters.largexxlBMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 150}]}>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.listFileName}>hello,</Text>
                        <Text style={Fonts.listFileNameLighter}>{userEmail}</Text>
                    </View>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
                        <Text style={Fonts.detail}>Configured and Connected</Text>
                    </View>
                </View>
                <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 220}]}>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device password"} clickCallback={devicePasswordCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"device wifi settings"} clickCallback={deviceWifiCallback} color={Colors.secondaryGreen} style={Layout.fill} />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <HorizontalLine />
                    </View>
                    <View style={[Layout.row, Layout.alignItemsCenter]}>
                        <Button title={"log out"} clickCallback={logOutCallback} color={Colors.secondary} style={Layout.fill} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SettingsContainer;
