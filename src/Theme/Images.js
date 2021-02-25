/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function () {
  return {
    logo: require('@/Assets/Images/CloudLockr.png'),
    keyIcon: require('@/Assets/Images/key-icon.png'),
    userIcon: require('@/Assets/Images/user-icon.png'),
    settingsIcon: require('@/Assets/Images/settings-icon.png'),
    uploadIcon: require('@/Assets/Images/upload-icon.png'),
  }
}
