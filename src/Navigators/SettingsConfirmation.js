import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsConfirmationContainer } from "@/Containers";

const Stack = createStackNavigator();

// @refresh reset
const SettingsConfirmationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsConfirmation"
        component={SettingsConfirmationContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsConfirmationNavigator;
