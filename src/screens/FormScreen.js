import React, { useState } from 'react'
import { StyleSheet, View, Text, Picker, Button, TextInput } from 'react-native'

const FormScreen = ({ navigation }) => {
  const [restaurantType, setRestaurantType] = useState(null)
  const [travelType, setTravelType] = useState('')
  const [cost, setCost] = useState(null)
  const [userLocation, setUserLocation] = useState({})
  const [enteredAddress, setEnteredAddress] = useState(null)

  const findUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
      }
    );
  };
  findUserCoordinates()

  const renderManualInput = () => {
    return (
      <View style={styles.pickerContainer}>
        <Text>Your Current Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder='ex. 1234 Hangry St. Ateball, HA' 
          onChangeText={addressInputHandler}
          value={enteredAddress}   
        />
      </View>
    )
  }

  const restaurantHandler = (type) => {
    setRestaurantType(type)
  }

  const travelHandler = (type) => {
    setTravelType(type)
  }

  const costHandler = (cost) => {
    setCost(cost)
  }

  const addressInputHandler = (enteredAddress) => {
    setEnteredAddress(enteredAddress)
  }

  return (
    <View style={styles.formContainer}>
      {Object.keys(userLocation).length === 0 ? renderManualInput() : null}
        <View style={styles.pickerContainer}>
          <Text>Type</Text>
          <Picker
            itemStyle={{height: 44}}
            selectedValue={restaurantType}
            testID="Type"
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
            testID="Travel"
            onValueChange={travelHandler}
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
            testID="Cost"
            onValueChange={costHandler}
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
          onPress={() => navigation.navigate('Result', {
            userLocation: userLocation,
            enteredAddress: enteredAddress,
            restaurantType: restaurantType,
            cost: cost,
            travelType: travelType,
          })}
        />
        </View>
        <View style={styles.luckyBtn}>
        <Button 
          color='green' 
          title="Feeling Lucky"
          onPress={() => navigation.navigate('Result', {
            userLocation: userLocation,
            enteredAddress: enteredAddress,
            travelType: travelType,
          })}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pickerContainer: {
    paddingTop: 40,
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    marginVertical: 5,
    padding: 10
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

export default FormScreen