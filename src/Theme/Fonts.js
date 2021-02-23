/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ FontSize, Colors, FontFamily }) {
  return StyleSheet.create({
    textSmall: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.small,
      color: Colors.text,
    },
    textRegular: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.regular,
      color: Colors.text,
    },
    textLarge: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.large,
      color: Colors.text,
    },
    titleSmall: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleLarge: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}
