import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {auth} from '../../backend/Firebase';
import {Text, Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';

const MenuDrawerScreen = ({props, navigation}) => {
  const [greetingTime, setGreetingTime] = useState('');
  const route = useRoute();
  const activeRouteName = getFocusedRouteNameFromRoute(route);

  useEffect(() => {
    // get the time of the day, based on local device time, as morning, afternoon, evening, night
    const time = new Date();
    const hour = time.getHours();
    if (hour < 12) {
      setGreetingTime('morning');
    } else if (hour < 17) {
      setGreetingTime('afternoon');
    } else if (hour < 20) {
      setGreetingTime('evening');
    } else {
      setGreetingTime('night');
    }
  }, []);

  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  const handleItemPress = route => {
    navigation.navigate(route);
  };

  const renderCustomItemList = () => {
    const items = [
      {
        label: 'Home',
        routeName: 'HomeScreen',
        onPress: () => {
          handleItemPress('HomeScreen');
        },
        icon: (
          <AntDesign
            name="home"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },
      {
        label: 'Order History',
        routeName: 'OrderHistory',
        onPress: () => {},
        icon: (
          <Octicons
            name="history"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'Chats',
        routeName: 'Chats',
        onPress: () => {},
        icon: (
          <Ionicons
            name="chatbox-ellipses-outline"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'Favorites',
        routeName: 'Favorites',
        onPress: () => {},
        icon: (
          <MaterialIcons
            name="favorite-border"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'Become a Driver',
        routeName: 'BecomeADriver',
        onPress: () => {},
        icon: (
          <MaterialCommunityIcons
            name="truck-outline"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'Settings',
        routeName: 'Settings',
        onPress: () => {},
        icon: (
          <Feather
            name="settings"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'Customer Support',
        routeName: 'CustomerSupport',
        onPress: () => {
          handleItemPress('CustomerSupport');
        },
        icon: (
          <AntDesign
            name="customerservice"
            size={25}
            color="#00767D"
            style={styles.icon}
          />
        ),
      },

      {
        label: 'About',
        routeName: 'About',
        onPress: () => {},
        icon: (
          <Feather name="info" size={25} color="#00767D" style={styles.icon} />
        ),
      },

      {
        label: 'Logout',
        onPress: handleSignout,
        icon: <AntDesign name="logout" size={25} color="#00767D" style={styles.icon} />
      }
    ];

    return items.map((item, index) => {
      const isActive = item.routeName === activeRouteName;
      const itemStyle = isActive ? styles.activeItem : styles.item;
      const itemLabelStyle = isActive
        ? styles.activeItemLabel
        : styles.itemLabel;

      return (
        <TouchableOpacity key={index} style={itemStyle} onPress={item.onPress}>
          <View style={styles.icon}>{item.icon}</View>
          <Text style={itemLabelStyle}>{item.label}</Text>
        </TouchableOpacity>
      );
    });
  };

  const socialLinks = [
    {
      name: 'facebook',
      url: 'https://www.facebook.com/tankerwala',
      icon: (
        <FontAwesome5Pro
          name="facebook-square"
          size={35}
          color="#00767D"
          style={styles.icon}
        />
      ),
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com/tankerwala/',
      icon: (
        <FontAwesome5Pro
          name="instagram"
          size={35}
          color="#00767D"
          style={styles.icon}
        />
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/tankerwala/',
      icon: (
        <FontAwesome5Pro
          name="linkedin"
          size={35}
          color="#00767D"
          style={styles.icon}
        />
      ),
    },
  ];

  const handleSocialPress = url => {
    Linking.openURL(url);
  };

  const renderSocialLinks = () => {
    return socialLinks.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.item}
        onPress={() => handleSocialPress(item.url)}>
        <View>{item.icon}</View>
      </TouchableOpacity>
    ));
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginTop: 10}}>
        <AntDesign
          name="close"
          size={40}
          color="#00767D"
          onPress={() => navigation.closeDrawer()}
        />
      </View>
      <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
        <View style={styles.container}>
          <Avatar.Image
            source={require('../assets/images/avatar.jpg')}
            size={150}
          />
          <Text style={styles.greeting}>
            Good {greetingTime}, {auth.currentUser.displayName}
          </Text>
        </View>
        {renderCustomItemList()}
      </View>
      <View style={styles.socialContainer}>{renderSocialLinks()}</View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  greeting: {
    fontSize: 20,
    fontWeight: 'medium',
    marginVertical: 15,
  },

  item: {
    flexDirection: 'row', // Add flexDirection to align icon and label horizontally
    alignItems: 'center', // Add alignItems to center the items vertically
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 5,
  },

  activeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 118, 125, 0.2)', // Customize the active item background color
  },

  icon: {
    marginRight: 10, // Add margin to create space between icon and label
  },

  itemLabel: {
    color: '#00767D',
    fontSize: 17,
    fontWeight: '500',
  },

  activeItemLabel: {
    color: '#00767D',
    fontSize: 17,
    fontWeight: 'bold',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default MenuDrawerScreen;
