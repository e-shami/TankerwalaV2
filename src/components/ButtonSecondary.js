import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ButtonSecondary = ({text, handlePress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button}
      onPress={handlePress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00D0D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: 'white',
  },
})


export default ButtonSecondary;

