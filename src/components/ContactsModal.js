import React, { useState, useEffect } from 'react'
import ContactCard from './ContactCard'
import { View, TextInput, StyleSheet, Modal, ScrollView } from 'react-native'
import { searchContacts } from '../contactsHelper'

const ContactsModal = (props) =>{
  const [inMemoryContacts, setInMemoryContacts] = useState([])
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    setInMemoryContacts(props.getContacts())
    setContacts(inMemoryContacts._55)
  }, [])  

  const closeModalHandler = () => {
    props.closeModal()
    setContacts(inMemoryContacts._55)
  }

  const appendCards = contactList => {
    return contactList.map(contact => <ContactCard 
      key={contact.id} 
      name={contact.name} 
      phoneNumber={contact.phoneNumbers ? contact.phoneNumbers[0].number : ""}
      digits={contact.phoneNumbers ? '1' + contact.phoneNumbers[0].digits : ""}
      message={props.message}
      closeModal={closeModalHandler}
    />)
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.contactsContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={styles.input}
          onChangeText={value => searchContacts(value, inMemoryContacts, setContacts)}
        />
        <ScrollView style={styles.scrollView}>
          {contacts ? appendCards(contacts) : inMemoryContacts._55 ? appendCards(inMemoryContacts._55) : null}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%'
  },
  input: {
    backgroundColor: '#2f363c',
    height: 60,
    fontSize: 24,
    padding: 20,
    color: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d90a0',
    width: '100%'
  },
  scrollView: {
    flex: 1, 
    width: '100%', 
    backgroundColor: '#000065'
  }
});

export default ContactsModal
