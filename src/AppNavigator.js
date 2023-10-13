import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import Splash from './screens/Splash';
import { auth } from '../backend/Firebase';
import Login_Register from './screens/authentication/Login_Register';
import Welcome from './screens/Welcome';

const Stack = createStackNavigator();
const AppNavigator = () => {

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already signed in otherwise sign them in
    const checkLoginStatus = async () => {
      // Check if the user is signed in on app launch
      const user = auth.currentUser;

      if (user) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkLoginStatus();

    // Set up the authentication state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    // Clean up the observer when the component is unmounted
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 2000); // Wait for 2 seconds
    } 
  }, [isLoading]);  

  if (isSplashVisible) {
    return <Splash />;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? 
          <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown: false}}/>
          :
          <Stack.Group>

            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            <Stack.Screen name="Login_Register" component={Login_Register} options={{headerShown: false}} />
          </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
