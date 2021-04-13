import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useTheme } from "@/Theme";
import { navigate } from "@/Navigators/Root";

const BasicHeader = (props) => {
  const { Layout, Common, Fonts, Gutters, Images } = useTheme();

  var title = props.title;
  var previousView = props.previousView;

  return (
    <View
      style={[
        Layout.row,
        Layout.rowHCenter,
        Common.backgroundSecondary,
        Common.fullShadow,
        { height: 65 },
      ]}
    >
      <View style={[Gutters.regularLPadding]}>
        <TouchableOpacity onPress={() => navigate(previousView, {})}>
          <Image
            style={{ height: 28, width: 28 }}
            source={Images.leftArrowIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          Gutters.regularLPadding,
          Layout.rowHCenter,
          { paddingBottom: 2 },
        ]}
      >
        <Text style={[Fonts.titleLarge, Fonts.textCenter]}>{title}</Text>
      </View>
    </View>
  );
};

export default BasicHeader;
