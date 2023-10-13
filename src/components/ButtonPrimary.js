import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ButtonPrimary = ({text, handlePress}) => {
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
    backgroundColor: '#00D0D7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // give the button a 3d look
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7,
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'white',
  },
})


export default ButtonPrimary

