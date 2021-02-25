import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Theme'
import { navigate } from '@/Navigators/Root'

const BasicHeader = (props) => {
  const { Layout, Common, Fonts } = useTheme()

  return (
    <View style={[Layout.fill]}>
    </View>
  )
}

export default BasicHeader
