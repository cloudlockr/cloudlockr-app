import React from "react";
import { View } from "react-native";
import { useTheme } from "@/Theme";

const HorizontalLine = () => {
  const { Layout, Gutters, Colors } = useTheme();

  return (
    <View
      style={[
        Layout.fill,
        Gutters.largexlHMargin,
        { borderBottomColor: Colors.darkGrey, borderBottomWidth: 2 },
      ]}
    />
  );
};

export default HorizontalLine;
