import { useTheme } from "@/Theme";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { BasicHeader, Button, ErrorAlert } from "@/Components";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBondedService } from "@/Services/Device";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { navigate } from "@/Navigators/Root";

const SettingsDeviceConnectionContainer = () => {
  const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

  const intentionId = useSelector((state) => state.intention).intention
    .settingsDeviceConnection;
  const [deviceConnected, setDeviceConnected] = useState(
    "-- Checking Status --"
  );

  // Check if the device is bonded on view load
  useFocusEffect(
    React.useCallback(() => {
      const checkBonded = async () => {
        try {
          await CheckBondedService();
          setDeviceConnected("Connected");
        } catch (err) {
          setDeviceConnected("Not Connected");
          ErrorAlert("Error Checking Connection Status", err);
        }
      };

      checkBonded();

      return () => {
        // Hide the toasts when the user navigates away from the view
        Toast.hide();
      };
    }, [])
  );

  const continueCallback = () => {
    if (intentionId === 1) {
      navigate("SettingsDevicePassword", {});
    } else if (intentionId === 2) {
      navigate("SettingsDeviceWifi", {});
    } else {
      // Should never reach here
      throw "Unknown intentionId!";
    }
  };

  return (
    <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
      <BasicHeader title={"MyDevice"} previousView={"Settings"} />
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
            { height: 220 },
          ]}
        >
          <View style={[Layout.column, Layout.alignItemsCenter]}>
            <Text style={[Fonts.listFileName, Fonts.textCenter]}>
              Connect to your CloudLockr device via Bluetooth to proceed with
              configuration
            </Text>
          </View>
          <View style={[Layout.column, Layout.alignItemsCenter]}>
            <Text style={Fonts.detailBold}>CloudLockr Device Status:</Text>
            <Text style={Fonts.detail}>{deviceConnected}</Text>
          </View>
        </View>
        {deviceConnected === "Not Connected" && (
          <Text
            style={[Fonts.detailBold, Fonts.textCenter, { color: Colors.red }]}
          >
            Device must be connected to proceed!
          </Text>
        )}
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.largexxlBPadding,
          ]}
        >
          <Button
            title={"Continue"}
            clickCallback={continueCallback}
            color={Colors.secondaryGreen}
            style={Layout.fill}
            setEnabled={deviceConnected === "Connected"}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsDeviceConnectionContainer;
