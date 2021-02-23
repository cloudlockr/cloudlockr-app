import React from 'react'
import { View, TextInput, Image } from 'react-native'
import { useTheme } from '@/Theme'

const InputField = (props) => {
  const { Layout, Gutters, Common, Fonts } = useTheme()

  height = parseInt(props.height)
  placeholder = props.placeholder
  iconSrc = props.iconSrc

  const [value, onChangeText] = React.useState(placeholder)

  return (
    <View style={[Layout.row, Layout.alignItemsCenter, Common.textInput]}>
      <View style={[Gutters.tinyxlLMargin]}>
        <Image style={{height: height - 18, width: height - 18}} source={iconSrc} resizeMode={'contain'} />
      </View>
      <View style={[Layout.fill, Gutters.smallLPadding]} >
        <TextInput
            onChangeText={text => onChangeText(text)}
            value={value}
            selectTextOnFocus
            style={[Fonts.textRegular, {height: height}]}
        />
      </View>
    </View>
  )
}

export default InputField
