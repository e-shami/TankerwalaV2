import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './menuDrawer/HomeScreen';
import MenuDrawerScreen from './MenuDrawerScreen'; 
import CustomerSupport from './menuDrawer/CustomerSupport';
import {StyleSheet, Dimensions} from 'react-native';


const MenuDrawer = createDrawerNavigator();
const MainScreen = () => {
  const { width } = Dimensions.get('window');
  return (
    <MenuDrawer.Navigator drawerContent={props => <MenuDrawerScreen {...props} />}
    screenOptions={{ headerShown: false,
      drawerStyle: { width: Dimensions.get('window').width * 0.85, }}}>
      <MenuDrawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MenuDrawer.Screen
        name='CustomerSupport'
        component={CustomerSupport}
      />

    </MenuDrawer.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    width: Dimensions.get('window').width * 0.7, // Adjust the width value as per your requirement
  },
});
