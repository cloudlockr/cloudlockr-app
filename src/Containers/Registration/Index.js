import { useTheme } from "@/Theme";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Keyboard } from "react-native";
import { InputField, Button, ErrorAlert } from "@/Components";
import { useDispatch } from "react-redux";
import { navigate } from "@/Navigators/Root";
import { useFocusEffect } from "@react-navigation/native";
import { PostRegistrationService } from "@/Services/Server";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterContainer = () => {
  const { Common, Gutters, Layout, Images, Colors, Fonts } = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [registerButtonEnabled, setRegisterButtonEnabled] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  // Remove any stored credential data when the view loads from the store
  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setSpinnerVisible(false);
      setRegisterButtonEnabled(false);

      return () => {
        // Nothing to do when screen is unfocused
      };
    }, [])
  );

  const backClick = () => {
    Keyboard.dismiss();
    navigate("Main", {});
  };

  const emailCallback = (enteredEmail) => {
    setEmail(enteredEmail);
    if (password !== "" && passwordConfirm !== "")
      setRegisterButtonEnabled(true);
  };

  const passwordCallback = (enteredPassword) => {
    setPassword(enteredPassword);
    if (email !== "" && passwordConfirm !== "") setRegisterButtonEnabled(true);
  };

  const passwordConfirmCallback = (enteredPassword) => {
    setPasswordConfirm(enteredPassword);
    if (email !== "" && password !== "") setRegisterButtonEnabled(true);
  };

  const registerCallback = async () => {
    setSpinnerVisible(true);
    try {
      await PostRegistrationService(email, password, passwordConfirm, dispatch);
      setSpinnerVisible(false);
      navigate("Dashboard", {});
    } catch (err) {
      setSpinnerVisible(false);
      ErrorAlert("Error Registering", err);
    }
  };

  return (
    <View
      style={[
        Layout.fill,
        Layout.colCenter,
        Gutters.largeAPadding,
        Common.backgroundSecondary,
      ]}
    >
      <Spinner visible={spinnerVisible} />
      <View
        style={[
          Common.backgroundPrimary,
          Common.roundBox,
          Gutters.regularxlHPadding,
        ]}
      >
        <View style={[Gutters.regularxlTPadding, { height: 30, width: 30 }]}>
          <TouchableOpacity onPress={backClick}>
            <Image
              style={{ height: 22, width: 22 }}
              source={Images.xIcon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <View style={[Layout.justifyContentCenter, Layout.fill]}>
          <View
            style={[
              Layout.column,
              Layout.alignItemsCenter,
              Gutters.regularxlBPadding,
            ]}
          >
            <Text style={[Fonts.listFileNameLighter, Fonts.textCenter]}>
              Enter your details
            </Text>
          </View>
          <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
            <InputField
              placeholder="Email"
              iconSrc={Images.userIcon}
              fieldId="1"
              finishEditingCallback={emailCallback}
            />
          </View>
          <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
            <InputField
              placeholder="Password"
              iconSrc={Images.keyIcon}
              hideInput
              finishEditingCallback={passwordCallback}
            />
          </View>
          <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
            <InputField
              placeholder="Re-enter password"
              iconSrc={Images.keyIcon}
              hideInput
              finishEditingCallback={passwordConfirmCallback}
            />
          </View>
          <View style={[Layout.rowCenter]}>
            <Button
              title="Register"
              color={Colors.secondaryGreen}
              clickCallback={registerCallback}
              setEnabled={registerButtonEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterContainer;
