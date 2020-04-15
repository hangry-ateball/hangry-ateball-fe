import * as Contacts from 'expo-contacts';

export const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      const contacts = data;
      return contacts
    }
  }
}

export const searchContacts = (value, inMemoryContacts, setContacts) => {
  const filteredContacts = inMemoryContacts._55.filter(contact => {
    let contactLowercase = (
      contact.firstName +
      ' ' +
      contact.lastName
    ).toLowerCase();

    let searchTermLowercase = value.toLowerCase();

    return contactLowercase.indexOf(searchTermLowercase) > -1;
  });
  setContacts(filteredContacts)
};