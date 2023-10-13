import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Menu = ({navigation, title, subTitle}) => {
  return (
    <View style={styles.background}>
        <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <AntDesign name="menu-fold" size={40} color="#00767D" />
      </TouchableOpacity>

      <View style={{marginLeft: 35}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>
          {subTitle}
        </Text>
      </View>
    </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0, 95, 100, 0.1)',
        height: 90,
        justifyContent: 'center',
    },
  container: {
    flexDirection: 'row',
    margin: 15,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: '#00767D',
  },
  subTitle: {
    paddingTop: 5,
    marginHorizontal: 30,
    fontWeight: 400,
    fontSize: 16,
    color: 'rgba(0, 95, 100, 0.75)',
  }
});