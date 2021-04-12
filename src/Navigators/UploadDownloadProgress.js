import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UploadDownloadProgressContainer } from "@/Containers";

const Stack = createStackNavigator();

// @refresh reset
const UploadDownloadProgressNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UploadDownloadProgress"
        component={UploadDownloadProgressContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UploadDownloadProgressNavigator;
