import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, Button, Image, ScrollView, ActivityIndicator } from 'react-native'
import openMap from 'react-native-open-maps';

const ResultScreen = ({route}) => {
  const { userLocation } = route.params;
  const { enteredAddress } = route.params;
  const { restaurantType } = route.params;
  const { cost } = route.params;
  const { travelType } = route.params;
  const isCancelled = useRef(false);
  const [fetchFailed, setFetchFail] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [restaurant, setRestaurant] = useState({});

  const fetchRestaurant = (userLocation, restaurantType, price) => {
    const url = `https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
    const checkIfCancelled = (data) => {
      if (!isCancelled.current) {
        setRestaurant(data.data.attributes)
        setLoader(false)
      }
    }
    const decideFetch = async () => {
      return restaurantType && price ? await fetch(`${url}&categories=${restaurantType}&price=${price}`) 
      : restaurantType ? await fetch(`${url}&categories=${restaurantType}`) 
      : price ? await fetch(`${url}&price=${price}`) 
      : await fetch(url) 
    }
    decideFetch().then(response => response.json())
      .then(data => checkIfCancelled(data))
      .catch(error => [setFetchFail(true), setLoader(false)])
  }

  useEffect(() => {
    fetchRestaurant(userLocation, restaurantType, cost)
    return () => {
      isCancelled.current = true;
    };
  }, [])

  const goToRestaurant = () => {
    openMap({ provider: Platform.OS === 'ios' ? 'apple':'google', start: 'my location', travelType: {travelType}, end: `${restaurant.name}`  });
  }

  return (
    <View style={styles.resultContainer}>
      {isLoading ? <ActivityIndicator size='large' color='blue'/> : fetchFailed ? 
        <View style={{alignItems: 'center', paddingTop: '50%'}}>
          <Text style={styles.errorText}>😰Uh Oh😰</Text>
          <Text style={styles.errorText}>Something went wrong...</Text>
          <Text style={styles.errorText}>Please try again!</Text>
        </View>
        :
        <>
          <View style={styles.titleView}>
            <Text style={styles.title}>{restaurant.name}</Text>
          </View>
          <View>
            <Text>{restaurant.price}</Text>
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
              {
                restaurant.photos.map((photo, i) => {
                return <Image
                          key={'img' + i}
                          style={styles.restaurantImg} 
                          source={{ uri: photo }}
                        />
                })
              }
            </View>
          </ScrollView>
          <View>
            <View style={styles.shareBtn}>
              <Button title="Send to Friends"/>
            </View>
            <View style={styles.shakeAgainBtn}>
              <Button color='darkblue' title="Shake "/>
            </View>
          </View>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
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