import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'react-native-paper'
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator, Linking, Alert } from 'react-native'
import { fetchPreviousRestaurants, mergePreviousRestaurants, savePreviousRestaurants } from './asyncStorageHelper'
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
  
  const fetchRestaurant = (userLocation, enteredAddress, restaurantType, price) => {
    let url;
    userLocation.latitude ?  
    url = `https://hangry-ateball-api.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
    : url = `https://hangry-ateball-api.herokuapp.com/api/v1/recommendations?address=${enteredAddress}`
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

  const updatePreviousRestaurants = async () => {
    try {
      let previous = await fetchPreviousRestaurants();
      previous = mergePreviousRestaurants(previous, restaurant);
      savePreviousRestaurants(previous);
    } catch (error) {
      console.log('Error fetching Previous', error);
    }
  }

  if(restaurant.name) {
    updatePreviousRestaurants()
  }

  return (
    <View style={styles.resultContainer}>
      {isLoading ? <ActivityIndicator size='large' color='blue'/> : fetchFailed ? 
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>😰Uh Oh😰</Text>
          <Text style={styles.errorText}>Something went wrong...</Text>
          <Text style={styles.errorText}>Please try again!</Text>
        </View>
        :
        <View style={styles.content}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{restaurant.name}</Text>
          </View>
          <View>
            <Text style={styles.details}>{restaurant.price}</Text>
            <Text style={styles.details}>Rating: {restaurant.rating}</Text>
            <Text style={styles.details} onPress={ () => Linking.openURL(`tel: + ${restaurant.phone}`)}>Call: {restaurant.display_phone}</Text>
            <Text style={styles.details}>{restaurant.location}</Text>
          </View>
          <View style={styles.imgContainer}>
            {
              restaurant.photos.map((photo, i) => {
              return <View style={styles.shadow}><Image
                        key={'img' + i}
                        style={styles.restaurantImg} 
                        source={{ uri: photo }}
                      /></View>
              })
            }
          </View>
          <View style={styles.btnContainer}>
            <View style={styles.letsGoBtn}>
              <Button
                mode='contained'
                color='#fff' 
                onPress={goToRestaurant}
              >
                <Text style={{color: "#000065"}}>Let's Go!</Text>
              </Button>
            </View>
            <View style={styles.shareBtn}>
              <Button
                mode='contained'
                color='#f9e000'
              >
                <Text style={{color: "#000065"}}>Send to Friends</Text>
              </Button>
            </View>
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center', 
    paddingTop: '50%'
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000065',
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%', 
    height: '100%'
  },
  titleView: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'white',
    marginVertical: 30,
    width: "70%"
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    paddingVertical: 10,
    color: 'white',
    fontWeight: "bold"
  },
  details: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: '10%'
  },
  imgContainer: {
    width: '100%',
    height: 140,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    marginVertical: 30, 
    paddingVertical: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2, 
  },
  restaurantImg: {
    margin: 5, 
    height: '90%',
    resizeMode: 'stretch',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2, 
    width: '34%'
  },
  btnContainer: {
    width: '100%', 
    height: '30%', 
    display: 'flex', 
    alignItems: 'center'
  },
  letsGoBtn: {
    marginTop: 20,
    width: '80%'
  },
  shareBtn: {
    paddingTop: 30,
    margin: 20,
    width: '80%'
  },
})

export default ResultScreen