import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { sendSMS } from '../apiCalls'

const ContactCard = ({ name, phoneNumber, digits, message, closeModal}) => {
  return (
    <TouchableOpacity onPress={() => {
      sendSMS(digits, '18647778548', message)
      closeModal()
    }}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactNum}>{phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: { 
    minHeight: 70, 
    padding: 10, 
    borderBottomWidth: 1, 
    width: '100%', 
    backgroundColor: '#000065' 
  },
  contactName: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 26
  },
  contactNum: {
    color: '#fff', 
    fontWeight: 'bold'
  }
});

export default ContactCard