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
    listDetails: {
      fontFamily: FontFamily.primary,
      fontSize: 14,
      fontWeight: '300',
      color: Colors.text,
    },
    listFileName: {
      fontFamily: FontFamily.primary,
      fontSize: 25,
      fontWeight: '400',
      color: Colors.text,
    },
    listFileNameLighter: {
      fontFamily: FontFamily.primary,
      fontSize: 25,
      fontWeight: '300',
      color: Colors.text,
    },
    detailFileName: {
      fontFamily: FontFamily.primary,
      fontSize: 25,
      fontWeight: '500',
      color: Colors.primary,
    },
    detailDarkFileName: {
      fontFamily: FontFamily.primary,
      fontSize: 25,
      fontWeight: '500',
      color: Colors.text,
    },
    smallerDetailLessBoldWhite: {
      fontFamily: FontFamily.primary,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.primary,
    },
    titleExtraDarkWhite: {
      fontFamily: FontFamily.primary,
      fontSize: 25,
      fontWeight: '700',
      color: Colors.primary,
    },
    inputField: {
      fontFamily: FontFamily.primary,
      fontSize: 16,
      fontWeight: '400',
    },
    detailExtraBold: {
      fontFamily: FontFamily.primary,
      fontSize: 20,
      fontWeight: '500',
      color: Colors.text,
    },
    detailBold: {
      fontFamily: FontFamily.primary,
      fontSize: 20,
      fontWeight: '400',
      color: Colors.text,
    },
    detail: {
      fontFamily: FontFamily.primary,
      fontSize: 20,
      fontWeight: '300',
      color: Colors.text,
    },
    detailWhite: {
      fontFamily: FontFamily.primary,
      fontSize: 20,
      fontWeight: '300',
      color: Colors.primary,
    },
    textRegularBoldPrimary: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.regular,
      color: Colors.primary,
      fontWeight: 'bold',
    },
    textRegularBold: {
      fontFamily: FontFamily.primary,
      fontSize: FontSize.regular,
      color: Colors.text,
      fontWeight: 'bold',
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
      fontSize: FontSize.large * 0.90,
      fontWeight: '300',
      color: Colors.primary,
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
