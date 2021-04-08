import { useTheme } from "@/Theme";
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { BasicHeader, Button, InputField, ErrorAlert } from "@/Components";
import { navigate } from "@/Navigators/Root";
import { SetPasswordService } from "@/Services/Device";
import Spinner from "react-native-loading-spinner-overlay";

const SettingsDevicePasswordContainer = () => {
  const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

  const [password, setPassword] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState("processing");

  const confirmCallback = () => {
    // Show confirmation alert to ensure the user does not accidentally change password
    Alert.alert(
      "PASSWORD CHANGE WARNING",
      "Your password must be set to the same value when you upload and download data, otherwise the downloaded files will be invalid",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Accept & Continue", onPress: performPasswordChange },
      ],
      { cancelable: true }
    );
  };

  const performPasswordChange = async () => {
    setSpinnerVisible(true);
    try {
      await SetPasswordService(password);
      setSpinnerVisible(false);
      navigate("SettingsConfirmation", {});
    } catch (err) {
      setSpinnerVisible(false);
      ErrorAlert("Error while updating configuration", err);
    }
  };

  const passwordCallback = (enteredPassword, isValid) => {
    if (!isValid) {
      setButtonEnabled(false);
      setPassword("");
      return;
    }

    setPassword(enteredPassword);
    setButtonEnabled(true);
  };

  return (
    <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
      <Spinner
        visible={spinnerVisible}
        textContent={spinnerMessage}
        textStyle={{ color: Colors.white }}
      />
      <BasicHeader
        title={"Set Password"}
        previousView={"SettingsDeviceConnection"}
      />
      <View
        style={[
          Layout.column,
          Layout.center,
          Gutters.largexlHPadding,
          Layout.fill,
          Layout.justifyContentBetween,
        ]}
      >
        <View
          style={[
            Gutters.largexxlTMargin,
            Layout.column,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <View
            style={[
              Layout.column,
              Layout.alignItemsCenter,
              Gutters.regularxlBPadding,
            ]}
          >
            <Text style={[Fonts.listFileName, Fonts.textCenter]}>
              Enter your new device master password
            </Text>
          </View>
          <View
            style={[
              Layout.column,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
              { height: 180 },
            ]}
          >
            <InputField
              placeholder={"new device password"}
              hideInput
              finishEditingCallback={passwordCallback}
              minLength={4}
            />
          </View>
        </View>
        <View
          style={[
            Layout.column,
            Layout.alignItemsCenter,
            Gutters.largexxlBPadding,
          ]}
        >
          <View
            style={[
              Layout.column,
              Layout.alignItemsCenter,
              Gutters.regularxlBPadding,
            ]}
          >
            <Text
              style={[
                Fonts.detailExtraBold,
                Fonts.textCenter,
                { color: Colors.red },
              ]}
            >
              WARNING!
            </Text>
            <Text style={[Fonts.detail, Fonts.textCenter]}>
              Your password must be set to the same value when you upload and
              download data!
            </Text>
          </View>
          <View style={[Layout.row, Layout.alignItemsCenter]}>
            <Button
              title={"confirm configuration"}
              clickCallback={confirmCallback}
              setEnabled={buttonEnabled}
              color={Colors.red}
              style={Layout.fill}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsDevicePasswordContainer;
