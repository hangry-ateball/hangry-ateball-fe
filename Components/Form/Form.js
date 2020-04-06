import React, { useState } from 'react'
import { StyleSheet, View, Modal, Text, Picker, Button } from 'react-native'

const Form = ({visible, setShowForm, setShowResult}) => {
  const [restaurantType, setRestaurantType] = useState('')
  const [travelType, setTravelType] = useState('')
  const [cost, setCost] = useState('')

  const restaurantHandler = (type) => {
    setRestaurantType(type)
  }

  const travelHandler = (type) => {
    setTravelType(type)
  }

  const costHandler = (cost) => {
    setCost(cost)
  }

  const modalHandler = () => {
    setShowForm(false)
    setShowResult(true)
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.formContainer}>
        <View style={styles.pickerContainer}>
          <Text>Type</Text>
          <Picker
            itemStyle={{height: 44}}
            selectedValue={restaurantType}
            onValueChange={restaurantHandler}
          >
            <Picker.Item label="Italian" value="Italian"/>
            <Picker.Item label="Mexican" value="Mexican"/>
            <Picker.Item label="American" value="American"/>
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text>Travel</Text>
          <Picker
            itemStyle={{height: 44}}
            selectedValue={travelType}
            // onValueChange={formInputHandler}
          >
            <Picker.Item label="Walk" value="walk"/>
            <Picker.Item label="Drive" value="drive"/>
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Text>Cost</Text>
          <Picker
            itemStyle={{height: 44}}
            selectedValue={cost}
            // onValueChange={formInputHandler}
          >
            <Picker.Item label="$" value="1"/>
            <Picker.Item label="$$" value="2"/>
            <Picker.Item label="$$$" value="3"/>
            <Picker.Item label="$$$$" value="4"/>
          </Picker>
        </View>
      <View style={styles.shakeBtn}>
        <Button 
          color='darkblue' 
          title="Shake It" 
          onPress={modalHandler}
        />
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