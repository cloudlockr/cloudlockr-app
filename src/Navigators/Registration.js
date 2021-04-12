import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationContainer } from "@/Containers";

const Stack = createStackNavigator();

// @refresh reset
const RegistrationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={RegistrationContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RegistrationNavigator;
