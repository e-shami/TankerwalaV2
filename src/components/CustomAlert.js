import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';


export const CustomAlert = ({ message }) => {
    const [isModalVisible, setModalVisible] = useState(true);
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    return (
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  
  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    closeButton: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });