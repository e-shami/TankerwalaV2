import { View, Text } from 'react-native'
import React from 'react'
import {Menu} from '../../components'

const CustomerSupport = ({navigation}) => {
  return (
    <View>
      <Menu title="Customer Support" navigation={navigation}/>
    </View>
  )
}

export default CustomerSupport