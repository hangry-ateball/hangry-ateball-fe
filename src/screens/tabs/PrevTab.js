import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

const mockData = [
  {
    name: 'Outback ste...',
    price: '$$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
  {
    name: 'Casa Bonita',
    price: '$$$',
    rating: '4.5'
  },
  {
    name: 'Wendys',
    price: '$',
    rating: '2.1',
  },
  {
    name: 'McDonalds',
    price: '$',
    rating: '0.8',
  },
]

const PrevTab = () =>
  <View style={styles.container}>
      <Text style={styles.title}>Previous</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {mockData.length === 0 
        ? 
          <View style={styles.noPrevious}>
            <Text style={{fontSize: 25}}>You don't have any previous 🥺</Text>
          </View>
        :
        mockData.map(restaurant => {
          return <View style={styles.previous}>
                  <View style={styles.name}>
                    <Text style={styles.text}>{restaurant.name}</Text>
                  </View>
                  <View style={styles.info}> 
                    <Text style={styles.text}>⭐️{restaurant.rating}</Text> 
                  </View>
                  <View style={styles.info}> 
                    <Text style={styles.price}>{restaurant.price}</Text> 
                  </View>
                  </View>
        })}
      </ScrollView>
  </View>

const styles = StyleSheet.create({
  noPrevious: {
    paddingTop: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: '15%',
  },
  name: {
    alignItems: 'flex-start',
    width: 175,
    height: 35,
  },
  info: {
    width: 75, 
    height: 35, 
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'lightgreen',
  },
  previous: {
    justifyContent: 'center',
    flex: 1, 
    flexDirection: 'row', 
    width: '100%', 
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: 'gray',
    borderRadius: 4,
    padding: 10
  }
})

export default PrevTab;