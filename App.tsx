import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/AppNavigator'
import { initializeFirebase } from './backend/Firebase'

const App = () => {
  
  //initializing database
  initializeFirebase();
  
  return (
    <AppNavigator />
  )
}

export default App