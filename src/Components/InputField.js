import React, { useState } from 'react'
import { View, TextInput, Image } from 'react-native'
import { useTheme } from '@/Theme'
import SetField from '@/Store/Fields/SetField'
import { useDispatch } from 'react-redux'

const InputField = (props) => {
  const { Layout, Gutters, Common, Fonts } = useTheme();
  const dispatch = useDispatch();

  const height = props.height !== undefined ? props.height : 50;
  const placeholder = props.placeholder;
  const textInputStyle = props.useLightInput !== undefined && props.useLightInput ? Common.textInputLight : Common.textInputDark;
  const iconSrc = props.iconSrc;
  const fieldId = props.fieldId;
  const hideInput = props.hideInput !== undefined ? props.hideInput : false;
  const callback = props.callback;

  // Store field value in Redux store so it can be accessed by other components by fieldId
  const setField = (id, value) => {
    dispatch(SetField.action({ id: id, value: value }));
  }

  const [value, onChangeText] = useState(placeholder);

  return (
    <View style={[Layout.row, Layout.alignItemsCenter, textInputStyle]}>
      {iconSrc !== undefined && 
        <View style={[Gutters.tinyxlLMargin]}>
          <Image style={{height: height - 18, width: height - 18}} source={iconSrc} resizeMode={'contain'} />
        </View>
      }
      <View style={[Layout.fill, Gutters.smallLPadding]} >
        <TextInput
            onChangeText={text => {
              onChangeText(text);
              setField(fieldId, value);
              if (callback !== undefined) callback();
            }}
            value={value}
            onFocus= {() => onChangeText('')}
            selectTextOnFocus
            returnKeyType={'done'}
            secureTextEntry={hideInput && value !== placeholder}
            style={[Fonts.inputField, {height: height}]}
        />
      </View>
    </View>
  )
}

export default InputField;
