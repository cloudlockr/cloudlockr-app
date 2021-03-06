import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useTheme } from "@/Theme";
import { navigate } from "@/Navigators/Root";

const DashboardHeader = (props) => {
  const { Layout, Common, Fonts, Images, Gutters } = useTheme();

  // Callback action functions
  const uploadCallback = () => {
    props.uploadCallback();
  };
  const settingsCallback = () => {
    navigate("Settings", {});
  };

  return (
    <View
      style={[
        Layout.row,
        Layout.rowHCenter,
        Common.backgroundSecondary,
        Layout.justifyContentBetween,
        Common.fullShadow,
        { height: 65 },
      ]}
    >
      <View style={[Gutters.largeLPadding]}>
        <Text style={[Fonts.titleLarge, Fonts.textCenter]}>MyLockr</Text>
      </View>
      <View style={[Layout.row, Gutters.largeRPadding]}>
        <TouchableOpacity onPress={() => uploadCallback()}>
          <Image
            style={{ height: 32, width: 32 }}
            source={Images.uploadIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <View style={[{ width: 16 }]} />
        <TouchableOpacity onPress={() => settingsCallback()}>
          <Image
            style={{ height: 32, width: 32 }}
            source={Images.settingsIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;
