/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from "react-native";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors, FontFamily }) {
  return StyleSheet.create({
    textSmall: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.small,
      color: Colors.text,
      letterSpacing: 1.085,
    },
    textRegular: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular,
      color: Colors.text,
      letterSpacing: 1.085,
    },
    listDetails: {
      fontFamily: FontFamily.regular,
      fontSize: 14,
      fontWeight: "300",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    listFileName: {
      fontFamily: FontFamily.regular,
      fontSize: 25,
      fontWeight: "400",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    listFileNameLighter: {
      fontFamily: FontFamily.light,
      fontSize: 25,
      fontWeight: "300",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    detailFileName: {
      fontFamily: FontFamily.bold,
      fontSize: 25,
      fontWeight: "500",
      color: Colors.primary,
      letterSpacing: 1.085,
    },
    detailDarkFileName: {
      fontFamily: FontFamily.bold,
      fontSize: 25,
      fontWeight: "500",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    smallerDetailLessBoldWhite: {
      fontFamily: FontFamily.regular,
      fontSize: 18,
      fontWeight: "400",
      color: Colors.primary,
      letterSpacing: 1.085,
    },
    titleExtraDarkWhite: {
      fontFamily: FontFamily.bold,
      fontSize: 25,
      fontWeight: "700",
      color: Colors.primary,
      letterSpacing: 1.085,
    },
    inputField: {
      fontFamily: FontFamily.regular,
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 1.085,
    },
    detailExtraBold: {
      fontFamily: FontFamily.bold,
      fontSize: 20,
      fontWeight: "500",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    detailBold: {
      fontFamily: FontFamily.regular,
      fontSize: 20,
      fontWeight: "400",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    detail: {
      fontFamily: FontFamily.light,
      fontSize: 20,
      fontWeight: "300",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    detailWhite: {
      fontFamily: FontFamily.light,
      fontSize: 20,
      fontWeight: "300",
      color: Colors.primary,
      letterSpacing: 1.085,
    },
    textRegularBoldPrimary: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular,
      color: Colors.primary,
      fontWeight: "bold",
      letterSpacing: 1.085,
    },
    textRegularBold: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular,
      color: Colors.text,
      fontWeight: "bold",
      letterSpacing: 1.085,
    },
    textLarge: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.large,
      color: Colors.text,
      letterSpacing: 1.085,
    },
    titleSmall: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.small * 2,
      fontWeight: "bold",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    titleRegular: {
      fontFamily: FontFamily.regular,
      fontSize: FontSize.regular * 2,
      fontWeight: "bold",
      color: Colors.text,
      letterSpacing: 1.085,
    },
    titleLarge: {
      fontFamily: FontFamily.light,
      fontSize: FontSize.large * 0.9,
      fontWeight: "300",
      color: Colors.primary,
      letterSpacing: 1.085,
    },
    textCenter: {
      textAlign: "center",
    },
    textJustify: {
      textAlign: "justify",
    },
    textLeft: {
      textAlign: "left",
    },
    textRight: {
      textAlign: "right",
    },
  });
}
