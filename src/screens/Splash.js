import {View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {}, 2000); // Wait for 2 seconds
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Splash;
