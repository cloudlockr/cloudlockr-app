import React, { useState } from "react";
import { View, TextInput, Image, Keyboard } from "react-native";
import { useTheme } from "@/Theme";
import { useFocusEffect } from "@react-navigation/native";

const InputField = (props) => {
  const { Layout, Gutters, Common, Fonts } = useTheme();

  const height = props.height !== undefined ? props.height : 50;
  const placeholder = props.placeholder;
  const textInputStyle =
    props.useLightInput !== undefined && props.useLightInput
      ? Common.textInputLight
      : Common.textInputDark;
  const iconSrc = props.iconSrc;
  const hideInput = props.hideInput !== undefined ? props.hideInput : false;
  const finishEditingCallback = props.finishEditingCallback;
  const enabled = props.enabled !== undefined ? props.enabled : true;
  const minLength = props.minLength !== undefined ? props.minLength : 0;

  // Store field value in Redux store so it can be accessed by other components by fieldId
  const finishEditing = () => {
    // Remove the keyboard listener
    Keyboard.removeAllListeners("keyboardDidHide");

    // Check / set if the finished has already been processed
    if (isFinished) return;

    setFinished(true);

    var isValid = value.length >= minLength;

    if (value.length < minLength) {
      onChangeText("Requires " + minLength + "+ Characters!");
      setEdited(false);
    } else if (value.length === 0) {
      // Restore the placeholders if no data was entered
      onChangeText(placeholder);
      setEdited(false);
      return;
    }

    if (finishEditingCallback.length == 2) {
      finishEditingCallback(value, isValid);
    } else {
      finishEditingCallback(value);
    }
  };

  const editField = (newValue) => {
    // Create a listener if the first edit on the text field
    if (!isEdited) {
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    }

    onChangeText(newValue);
    setEdited(true);
    setFinished(false);
  };

  const resetField = () => {
    onChangeText(placeholder);
    setEdited(false);
    setFinished(false);
  };

  const _keyboardDidHide = () => {
    finishEditing();
  };

  const [value, onChangeText] = useState(placeholder);
  const [isEdited, setEdited] = useState(false);
  const [isFinished, setFinished] = useState(false);

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
      {iconSrc !== undefined && (
        <View style={[Gutters.tinyxlLMargin]}>
          <Image
            style={{ height: height - 18, width: height - 18 }}
            source={iconSrc}
            resizeMode={"contain"}
          />
        </View>
      )}
      <View style={[Layout.fill, Gutters.smallLPadding]}>
        <TextInput
          onFocus={() => editField("")}
          onChangeText={(text) => editField(text)}
          onEndEditing={() => finishEditing()}
          value={value}
          editable={enabled}
          selectTextOnFocus
          returnKeyType={"done"}
          secureTextEntry={hideInput && isEdited}
          style={[Fonts.inputField, { height: height }]}
        />
      </View>
    </View>
  );
};

export default InputField;
