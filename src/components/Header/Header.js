import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Hangry Ateball</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingTop: 40
  },
  title: {
    fontSize: 24,
    paddingBottom: 10,
    alignSelf: 'center'
  }
});

export default Header