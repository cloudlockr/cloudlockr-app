import React, { useState } from 'react'
import { View, TextInput, Image } from 'react-native'
import { useTheme } from '@/Theme'
import SetField from '@/Store/Fields/SetField'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';

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
  const finishEditing = () => {
    console.log('fieldId: ' + fieldId + '    value: ' + value);
    dispatch(SetField.action({ id: fieldId, value: value }));

    // Perform custom callback (if given)
    if (callback !== undefined) 
      callback();
  }

  const editField = (newValue) => {
    onChangeText(newValue);
    onEdit(true);
  }

  const resetField = () => {
    onChangeText(placeholder);
    onEdit(false);
  }

  const [value, onChangeText] = useState(placeholder);
  const [isEdited, onEdit] = useState(false)

  // Reset field values when view is unloaded
  useFocusEffect(
    React.useCallback(() => {
      // Reset field values when the screen is focused
      resetField();

      return () => {
        // Finish editing when the screen is unfocused (to ensure updated values are persisted to state)
        if (isEdited) {
          finishEditing();
        }
      };
    }, [])
  );

  return (
    <View style={[Layout.row, Layout.alignItemsCenter, textInputStyle]}>
      {iconSrc !== undefined && 
        <View style={[Gutters.tinyxlLMargin]}>
          <Image style={{height: height - 18, width: height - 18}} source={iconSrc} resizeMode={'contain'} />
        </View>
      }
      <View style={[Layout.fill, Gutters.smallLPadding]} >
        <TextInput
            onFocus= {() => editField('')}
            onChangeText={text => editField(text)}
            onEndEditing={() => finishEditing()}
            value={value}
            selectTextOnFocus
            returnKeyType={'done'}
            secureTextEntry={hideInput && isEdited}
            style={[Fonts.inputField, {height: height}]}
        />
      </View>
    </View>
  )
}

export default InputField;
