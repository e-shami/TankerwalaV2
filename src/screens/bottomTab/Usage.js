import { View, Text } from 'react-native'
import React from 'react'
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

const Usage = () => {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{fontSize:24, fontWeight:600}}>Your water usage analytics</Text>
    </View>
  )
}

export default Usage