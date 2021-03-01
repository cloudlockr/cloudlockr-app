import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { navigate } from '@/Navigators/Root'

const Button = (props) => {
  const { Layout, Common, Fonts } = useTheme();

  const title = props.title;
  const color = props.color;
  const destParams = props.destParams;
  const newViewId = props.newViewId;
  const style = props.style;
  const setEnabled = props.setEnabled !== undefined ? props.setEnabled : true;

  const changeView = (newViewId, destParams) => {
    navigate(newViewId, destParams);
  }

  return (
    <View style={[Layout.fill, style]}>
      <TouchableOpacity
        style={[Layout.center, Common.rounded, {backgroundColor: color, height: 50, opacity: setEnabled ? 1 : 0.7}]}
        onPress={() => changeView(newViewId, destParams)}
        disabled={!setEnabled}
      >
        <Text style={[Fonts.textRegularBoldPrimary, Fonts.textCenter]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Button;
