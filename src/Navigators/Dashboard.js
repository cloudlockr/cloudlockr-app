import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardContainer } from "@/Containers";

const Stack = createStackNavigator();

// @refresh reset
const LoginNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
