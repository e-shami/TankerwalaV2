import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigationState, useFocusEffect} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Usage} from '../bottomTab';
import {Menu} from '../../components';

const BottomTab = createBottomTabNavigator();
const HomeScreen = ({navigation}) => {
  const tabIcons = {color: 'black', size: 40};

  const [subTitle, setSubTitle] = useState('Smart Water Monitoring');
  const navigationState = useNavigationState(state => state);
  const [isHomeActive, setIsHomeActive] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const activeRoute = navigationState.routes[navigationState.index];
      const activeChildRoute =
        activeRoute?.state?.routes[activeRoute?.state?.index];
      const activeRouteName = activeChildRoute?.name;

      if (activeRouteName === 'Home') {
        setSubTitle('Smart Water Monitoring');
        setIsHomeActive(true);
      } else if (activeRouteName === 'Usage') {
        setSubTitle('Water usage analytics');
        setIsHomeActive(false);
      }
    }, [navigationState]),
  );

  const homeStyle = isHomeActive? styles.activeLabelStyle : styles.labelStyle;
  const usageStyle = isHomeActive? styles.labelStyle : styles.activeLabelStyle;
  return (
    <>
      <View>
        <Menu title="Tankerwala" navigation={navigation} subTitle={subTitle} />
      </View>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 60,
            elevation: 0,
            shadowOpacity: 5,
            padding:0,
            backgroundColor: 'rgba(0, 170, 165, 0.2)',
          },
          tabBarActiveTintColor: '#00767D',
          tabBarInactiveTintColor: 'rgba(0, 95, 100, 0.55)',
        }}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: homeStyle,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="water-sync"
                color={color}
                size={tabIcons.size}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Usage"
          component={Usage}
          options={{
            headerShown: false,
            tabBarLabel: 'Usage History',
            tabBarLabelStyle: usageStyle,
            tabBarIcon: ({color}) => (
              <Ionicons
                name="analytics-sharp"
                color={color}
                size={tabIcons.size}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
  },
  activeLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});