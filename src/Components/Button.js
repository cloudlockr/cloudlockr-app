import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { navigate } from '@/Navigators/Root'

const Button = (props) => {
  const { Layout, Common, Fonts, Colors, Gutters } = useTheme();

  const useInputFieldStyle = props.useInputFieldStyle;
  const title = props.title;
  const color = props.color;
  const newViewId = props.newViewId;
  const style = props.style;
  const setEnabled = props.setEnabled !== undefined ? props.setEnabled : true;
  const clickCallback = props.clickCallback;

  const clickCallbackAction = () => {
    if (clickCallback !== undefined)
      clickCallback();
    else if (newViewId !== undefined)
      navigate(newViewId, {});
  }

  return (
    <View style={[style, Layout.fullSize]}>
      {!useInputFieldStyle &&
        <TouchableOpacity
          style={[Layout.center, Common.rounded, {backgroundColor: color, height: 50, opacity: setEnabled ? 1 : 0.7}]}
          onPress={() => clickCallbackAction()}
          disabled={!setEnabled}
        >
          <Text style={[Fonts.textRegularBoldPrimary, Fonts.textCenter]}>{title}</Text>
        </TouchableOpacity>
      }
      {useInputFieldStyle &&
        <TouchableOpacity
          style={[Gutters.regularLPadding, Layout.row, Layout.alignItemsCenter, Common.rounded, {backgroundColor: Colors.primary, height: 50, opacity: setEnabled ? 1 : 0.7}]}
          onPress={() => clickCallbackAction()}
          disabled={!setEnabled}
        >
          <Text style={[Fonts.inputField]}>{title}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default Button;
