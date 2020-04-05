import React, { useState } from 'react';
import Form from './Components/Form/Form'
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default App = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hangry Ateball</Text>
      </View>
      <Image style={styles.eightBall} source={require('./assets/ate-ball-home.png')}/>
      <View style={styles.startBtn}>
        <Button onPress={() => setShowForm(true)} title="Get Started"/>
        <Form visible={showForm} />
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
  },
  startBtn: {
    width: '80%',
  },  
  eightBall: {
    width: 350,
    resizeMode: 'contain'
  }
});
