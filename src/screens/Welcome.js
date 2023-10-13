import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Welcome = ({navigation}) => {
  useEffect(() => {
    const moveToLoginScreen = async () => {
      navigation.replace('Login_Register');
    };

    setTimeout(() => {
      moveToLoginScreen();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome To TankerWala</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: '40%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Welcome;