import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Button } from 'react-native-paper'

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.eightBall} source={require('../../assets/logo.png')}/>
      <View style={styles.startBtn}>
        <Button
          mode="contained"
          color='#f9e000'
          onPress={() => navigation.navigate('Form')}
        >
          <Text style={{color: "#000065"}}>Get Shakin'</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000065'
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