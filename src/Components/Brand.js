import React from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@/Theme'

const Brand = ({ height = 90, width = 260, mode = 'contain' }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <Image style={Layout.fullSize} source={Images.logo} resizeMode={mode} />
    </View>
  )
}

export default Brand
