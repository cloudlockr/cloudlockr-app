/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from "react-native";

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors, ...args }) {
  return {
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundLightGrey: {
        backgroundColor: Colors.lightGrey,
      },
      backgroundDarkGrey: {
        backgroundColor: Colors.darkGrey,
      },
      backgroundWhite: {
        backgroundColor: Colors.white,
      },
      backgroundSecondary: {
        backgroundColor: Colors.secondary,
      },
      backgroundSecondaryGreen: {
        backgroundColor: Colors.secondaryGreen,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInputDark: {
        backgroundColor: Colors.darkGrey,
        color: Colors.text,
        borderRadius: 8,
      },
      textInputLight: {
        backgroundColor: Colors.primary,
        color: Colors.text,
        borderRadius: 8,
      },
      roundBox: {
        elevation: 10,
        shadowColor: "black",
        shadowRadius: 4,
        borderRadius: 8,
      },
      fullShadow: {
        elevation: 10,
        shadowColor: "black",
        shadowRadius: 4,
      },
      rounded: {
        borderRadius: 8,
      },
    }),
  };
}
