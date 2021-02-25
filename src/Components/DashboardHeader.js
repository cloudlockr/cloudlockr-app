import React from 'react'
import { View, TouchableHighlight, Text, Image } from 'react-native'
import { useTheme } from '@/Theme'

const DashboardHeader = (props) => {
  const { Layout, Common, Fonts, Images, Gutters } = useTheme()

  const uploadCallback = props.uploadCallback
  const settingsCallback = props.settingsCallback

  return (
    <View style={[Layout.row, Layout.rowHCenter, Common.backgroundSecondary, Layout.justifyContentBetween, {height: 65}]}>
        <View style={[Gutters.largeLPadding]}>
            <Text style={[Fonts.titleLarge, Fonts.textCenter]}>MyLockr</Text>
        </View>
        <View style={[Layout.row, Gutters.largeRPadding]}>
            <TouchableHighlight onPress={() => uploadCallback()}>
                <Image style={{height: 32, width: 32}} source={Images.uploadIcon} resizeMode={'contain'} />
            </TouchableHighlight>
            <View style={[{width: 16}]}/>
            <TouchableHighlight onPress={() => settingsCallback()}>
                <Image style={{height: 32, width: 32}} source={Images.settingsIcon} resizeMode={'contain'} />
            </TouchableHighlight>
        </View>
    </View>
  )
}

export default DashboardHeader
