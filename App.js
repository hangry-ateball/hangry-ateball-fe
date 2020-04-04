import React from 'react';
import { StyleSheet, Text, View, Header } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hangry Ateball</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    alignSelf: 'center'
  }
});
