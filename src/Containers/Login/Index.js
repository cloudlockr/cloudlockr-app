import { useTheme } from "@/Theme";
import React, { useState } from "react";
import { View, PermissionsAndroid, Alert } from "react-native";
import {
  Brand,
  InputField,
  HorizontalLine,
  Button,
  ErrorAlert,
} from "@/Components";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { PostLoginService } from "@/Services/Server";
import { navigate } from "@/Navigators/Root";
import Spinner from "react-native-loading-spinner-overlay";
import { SetIntention } from "@/Store/Intention";

const LoginContainer = () => {
  const { Common, Gutters, Layout, Images, Colors } = useTheme();
  const dispatch = useDispatch();

  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [loginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkPermissions = async () => {
    try {
      var writePermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      var readPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      var fineLocationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      var coarseLocationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      );
      if (
        writePermission &&
        readPermission &&
        fineLocationPermission &&
        coarseLocationPermission
      )
        return;

      requestAlert();
    } catch (err) {
      ErrorAlert(err);
    }
  };

  const requestPermissions = async () => {
    try {
      const permissionsGranted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        permissionsGranted["android.permission.WRITE_EXTERNAL_STORAGE"] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        permissionsGranted["android.permission.READ_EXTERNAL_STORAGE"] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        permissionsGranted["android.permission.ACCESS_FINE_LOCATION"] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        permissionsGranted["android.permission.ACCESS_COARSE_LOCATION"] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (
          permissionsGranted["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          permissionsGranted["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          permissionsGranted["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          permissionsGranted["android.permission.ACCESS_COARSE_LOCATION"] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            "Device data and location permissions are required",
            "You selected to never ask permissions again. Without device data access permission, CloudLockr's main functionality of data upload and download is not possible. " +
              "Please allow this permission in your phone's settings.",
            [{ text: "Okay" }],
            { cancelable: true }
          );
          return;
        }

        requestAlert();
      }
    } catch (err) {
      ErrorAlert(err);
    }
  };

  const requestAlert = () => {
    Alert.alert(
      "Device data and location permissions are required",
      "Data upload and download require CloudLockr to access your phone's storage",
      [{ text: "Okay", onPress: requestPermissions }],
      { cancelable: false }
    );
  };

  // Remove any stored credential data when the view loads from the store
  useFocusEffect(
    React.useCallback(() => {
      setEmail("");
      setPassword("");
      setSpinnerVisible(false);
      setLoginButtonEnabled(false);

      checkPermissions();

      // Reset the reminder warning trigger
      dispatch(SetIntention.action({ id: "showDeviceWarning", value: true }));

      return () => {
        // Nothing to do here
      };
    }, [])
  );

  const emailCallback = (enteredEmail) => {
    setEmail(enteredEmail);
    if (password !== "") setLoginButtonEnabled(true);
  };

  const passwordCallback = (enteredPassword) => {
    setPassword(enteredPassword);
    if (email !== "") setLoginButtonEnabled(true);
  };

  const loginCallback = async () => {
    setSpinnerVisible(true);
    try {
      await PostLoginService(email, password, dispatch);
      setSpinnerVisible(false);
      navigate("Dashboard", {});
    } catch (err) {
      setSpinnerVisible(false);
      ErrorAlert("Error while logging in", err);
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
          Gutters.largexxlVPadding,
        ]}
      >
        <View style={[Layout.rowCenter, Gutters.largexxlBPadding]}>
          <Brand />
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
            fieldId="2"
            hideInput
            finishEditingCallback={passwordCallback}
          />
        </View>
        <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
          <Button
            title="Log in"
            color={Colors.secondaryGreen}
            clickCallback={loginCallback}
            setEnabled={loginButtonEnabled}
          />
        </View>
        <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
          <HorizontalLine />
        </View>
        <View style={[Layout.rowCenter, Gutters.regularxlBPadding]}>
          <Button
            title="Register"
            color={Colors.secondaryGreen}
            destParams={{}}
            newViewId={"Registration"}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginContainer;
