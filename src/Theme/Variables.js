/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: "rgba(0,0,0,0)",
  inputBackground: "#FFFFFF",
  white: "#ffffff",
  text: "#212529",
  secondary: "#509FA8",
  secondaryGreen: "#B3C38B",
  red: "#C70000",
  primary: "#F9F9F9",
  darkGrey: "#DFDFDF",
  lightGrey: "#F5F5F5",
  success: "#28a745",
  error: "#dc3545",
};

export const NavigationColors = {
  primary: Colors.primary,
  secondary: Colors.secondary,
};

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 32,
};

/**
 * FontFamily
 */
export const FontFamily = {
  light: "Roboto-Light",
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
  blaak: "Roboto-Black",
};

/**
 * Metrics Sizes
 */
const tiny = 5;
const tinyxl = 7;
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const regularxl = tiny * 5; // 25
const large = regular * 2; // 30
const largexl = regular * 3; // 45
const largexxl = 80;
const largexxxl = 100;
export const MetricsSizes = {
  tiny,
  tinyxl,
  small,
  regular,
  regularxl,
  large,
  largexl,
  largexxl,
  largexxxl,
};
