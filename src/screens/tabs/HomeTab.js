import React,{ useState } from 'react';
import Form from '../../components/Form/Form'
import ResultPage from '../../components/ResultPage/ResultPage'
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const HomeTab = () => {
  const [showForm, setShowForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  return (
    <View style={styles.container}>
      <Image style={styles.eightBall} source={require('../../../assets/ate-ball-home.png')}/>
      <View style={styles.startBtn}>
        <Button onPress={() => setShowForm(true)} title="Get Started"/>
        <Form visible={showForm} setShowForm={setShowForm} setShowResult={setShowResult}/>
        <ResultPage visible={showResult}/>
      </View>
    </View>
  )
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


export default HomeTab;