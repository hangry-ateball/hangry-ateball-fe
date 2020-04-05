import React from 'react'
import { StyleSheet, View, Modal, Text, Picker, Button } from 'react-native'

const Form = ({visible}) => {
  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.formContainer}>
        <View style={styles.pickerContainer}>
          <Text>Type</Text>
          <Picker
            itemStyle={{height: 44}}
          >
            <Picker.Item label="Italian"/>
            <Picker.Item label="Mexican"/>
            <Picker.Item label="American"/>
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text>Travel</Text>
          <Picker
            itemStyle={{height: 44}}
          >
            <Picker.Item label="Walk"/>
            <Picker.Item label="Drive"/>
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text>Cost</Text>
          <Picker
            itemStyle={{height: 44}}
          >
            <Picker.Item label="$"/>
            <Picker.Item label="$$"/>
            <Picker.Item label="$$$"/>
            <Picker.Item label="$$$$"/>
          </Picker>
        </View>
      <View style={styles.shakeBtn}>
        <Button color='darkblue' title="Shake It"/>
      </View>
      <View style={styles.luckyBtn}>
        <Button color='green' title="Feeling Lucky"/>
      </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    width: '100%',
  },
  pickerContainer: {
    paddingTop: 40,
    width: '80%'
  },
  shakeBtn: {
    paddingTop: 30,
    width: '80%',
    margin: 20,
  },
  luckyBtn: {
    width: '80%',
    margin: 20,
  }
})

export default Form;