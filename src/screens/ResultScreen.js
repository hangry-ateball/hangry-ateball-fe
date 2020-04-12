import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, Button, Image, ScrollView, ActivityIndicator } from 'react-native'
import openMap from 'react-native-open-maps';

const ResultScreen = ({route}) => {
  const { userLocation } = route.params;
  const { restaurantType } = route.params;
  const { cost } = route.params;
  const isCancelled = useRef(false);
  const [fetchFailed, setFetchFail] = useState(false);
  const [restaurant, setRestaurant] = useState({});

  const fetchRestaurant = async (userLocation, restaurantType, price) => {
    if(restaurantType && price) {
      return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}&price=${price}`) 
        .then(response => response.json())
        .then(data => {
          if (!isCancelled.current) {
            setRestaurant(data.data.attributes)
            setLoader(false)
          }
        })
        .catch(error => setFetchFail(true))
    } else if (restaurantType) {
      return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}`) 
        .then(response => setRestaurant(response.json()))
        .catch(error => setFetchFail(true))
    } else if (price) {
      return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&price=${price}`) 
        .then(response => setRestaurant(response.json()))
        .catch(error => setFetchFail(true))
    } else {
      return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`) 
        .then(response => setRestaurant(response.json()))
        .catch(error => setFetchFail(true))
    }  
  }

  useEffect(() => {
    fetchRestaurant(userLocation, restaurantType, cost)
    return () => {
      isCancelled.current = true;
    };
  }, [])

  const goToRestaurant = () => {
    openMap({ provider: Platform.OS === 'ios' ? 'apple':'google', start: 'my location', travelType: 'walk', end: `${restaurant.name}`  });
  }

  return (
      <View style={styles.resultContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{restaurant.name}</Text>
        </View>
        <View>
          <Text>Rating: {restaurant.rating}</Text>
          <Text>{restaurant.phone}</Text>
          <Text>{restaurant.location}</Text>
        </View>
        <Button
          onPress={goToRestaurant}
          title='Lets go'
        />
        <ScrollView 
          showsHorizontalScrollIndicator={false} 
          horizontal={true} 
          style={{width: '100%'}}
        >
          <View style={styles.imgContainer}>
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
          </View>
        </ScrollView>
        <View>
          <Text>Explore Menu</Text>
          <Text>http://www.casabonitadenver.com/</Text>
        </View>
        <View>
          <View style={styles.shareBtn}>
            <Button title="Send to Friends"/>
          </View>
          <View style={styles.shakeAgainBtn}>
            <Button color='darkblue' title="Shake "/>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    alignSelf: 'center'
  },
  title: {
    fontSize: 36,
    padding: 20,
  },
  imgContainer: {
    flexDirection: 'row', 
    borderTopWidth: 2, 
    borderBottomWidth: 2, 
    marginVertical: 40, 
    paddingVertical: 10
  },
  restaurantImg: {
    margin: 10, 
    width: 118, 
    height: 100,
    resizeMode : 'stretch' 
  },
  shareBtn: {
    paddingTop: 30,
    margin: 20,
  },
  shakeAgainBtn: {
    margin: 20,
  }
})

export default ResultScreen