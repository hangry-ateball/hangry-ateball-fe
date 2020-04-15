import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { StyleSheet, View, Text, Picker, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { categoryList } from '../categoryList'

const FormScreen = ({ navigation }) => {
  const [restaurantType, setRestaurantType] = useState(null)
  const [travelType, setTravelType] = useState('')
  const [cost, setCost] = useState(null)
  const [userLocation, setUserLocation] = useState({})
  const [enteredAddress, setEnteredAddress] = useState("")
  const { control, handleSubmit, errors } = useForm()

  const findUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
      }
    );
  };
  findUserCoordinates()

  const renderCategories = categoryList => {
    return categoryList.map(category => 
      <Picker.Item 
        key={category.value} 
        label={category.name} 
        value={category.value}
      />)
  }

  const renderManualInput = () => {
    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Your Current Address</Text>
        <Controller 
          as={TextInput}
          control={control}
          name='enteredAddress' 
          rules={{ required: true }}
          style={styles.input} 
          placeholder='ex. 1234 Hangry St. Denver, CO' 
          onChangeText={enteredAddress => setEnteredAddress(enteredAddress)}
          value={enteredAddress}   
        />
        {errors.enteredAddress && <Text>Without Location Access on, address is required.</Text>}
      </View>
    )
  }

  return (
    <View style={styles.formContainer}>
      {Object.keys(userLocation).length === 0 ? renderManualInput() : null}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type</Text>
        <Picker
          color='white'
          itemStyle={{height: 88, color: 'white'}}
          style={{height: 88, color: 'white', borderColor: 'white'}}
          selectedValue={restaurantType}
          onValueChange={type => setRestaurantType(type)}
          testID="Type"
        >
          <Picker.Item label="Any" value=""/>
          {renderCategories(categoryList)}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Cost</Text>
        <Picker
          itemStyle={{height: 88, color: 'white'}}
          style={{height: 88, color: 'white'}}
          selectedValue={cost}
          onValueChange={cost => setCost(cost)}
          testID="Cost"
        >
          <Picker.Item label="Any" value=""/>
          <Picker.Item label="$" value="1"/>
          <Picker.Item label="$$" value="2"/>
          <Picker.Item label="$$$" value="3"/>
          <Picker.Item label="$$$$" value="4"/>
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Travel</Text>
        <Picker
          itemStyle={{height: 88, color: 'white'}}
          style={{height: 88, color: 'white'}}
          selectedValue={travelType}
          onValueChange={type => setTravelType(type)}
          testID="Travel"
        >
          <Picker.Item label="Walk" value="walk"/>
          <Picker.Item label="Drive" value="drive"/>
        </Picker>
      </View>
      <View style={styles.shakeBtn}>
        <Button 
          mode='contained'
          color='white' 
          onPress={handleSubmit(() => navigation.navigate('Result', {
            userLocation: userLocation,
            enteredAddress: enteredAddress,
            restaurantType: restaurantType,
            cost: cost,
            travelType: travelType,
          }))}
        >
          <Text style={{color: "#000065"}}>Shake It</Text>
        </Button>
      </View>
      <View style={styles.luckyBtn}>
        <Button 
          mode='contained'
          color='#f9e000' 
          onPress={handleSubmit(() => navigation.navigate('Result', {
            userLocation: userLocation,
            enteredAddress: enteredAddress,
            travelType: travelType,
          }))}
        >
          <Text style={{color: "#000065"}}>Feeling Lucky?!</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000065',
    color: 'white'
  },
  pickerContainer: {
    paddingTop: 40,
    width: '80%'
  },
  label: {
    color: 'white'
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
    color: '#fff'
  },
  luckyBtn: {
    width: '80%',
    margin: 20,
  }
})

export default FormScreen