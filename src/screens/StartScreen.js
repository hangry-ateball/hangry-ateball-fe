import React from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.eightBall} source={require('../../assets/ate-ball-home.png')}/>
      <View style={styles.startBtn}>
        <Button
          title="Get Shakin'"
          onPress={() => navigation.navigate('Form')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  startBtn: {
    width: '80%',
  },  
  eightBall: {
    width: 350,
    resizeMode: 'contain'
  }
});


export default StartScreen;