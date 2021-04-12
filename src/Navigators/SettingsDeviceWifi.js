import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsDeviceWifiContainer } from "@/Containers";

const Stack = createStackNavigator();

// @refresh reset
const SettingsDeviceWifiNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsDeviceWifi"
        component={SettingsDeviceWifiContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsDeviceWifiNavigator;
