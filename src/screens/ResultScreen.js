import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Linking, Animated } from 'react-native'
import { fetchRestaurants, addFavoriteRestaurant, unFavoriteRestaurant, updatePreviousRestaurants } from './asyncStorageHelper'
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
  const [favorite, setFavorite] = useState(false);
  const [shake] = useState(new Animated.Value(0));

  const checkFavoriteStatus = async () => {
    try {
      let favorites = await fetchRestaurants('favorite');
      favorites.forEach(favRestaurant => {
        if(favRestaurant.name === restaurant.name) {
          return setFavorite(true)
        }
      })
    } catch {
      console.log('Error checking favorites', error);
    }
  }

  const fetchRestaurant = (userLocation, restaurantType, price) => {
    const url = `https://hangry-ateball-api.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
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

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shake, { toValue: 20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -20, duration: 25, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 25, useNativeDriver: true }),
    ]).start();
  }

  useEffect(() => {
    startShake()
    fetchRestaurant(userLocation, restaurantType, cost)
    return () => {
      isCancelled.current = true;
    }
  }, [])

  const goToRestaurant = () => {
    openMap({ provider: Platform.OS === 'ios' ? 'apple':'google', start: 'my location', travelType: `${travelType}`, end: `${restaurant.name}`  });
  }

  const favoriteToggle = () => {
    setFavorite(favorite ? false:true)
    if(!favorite) {
      addFavoriteRestaurant(restaurant)
    } else {
      unFavoriteRestaurant(restaurant)
    }
  }

  if(restaurant.name) {
    updatePreviousRestaurants(restaurant)
    setTimeout(() => checkFavoriteStatus(), 1)
  }

  return (
    <View style={styles.resultContainer}>
      {isLoading ? 
      <Animated.Image source={require('../../assets/magic-loader-img.png')}
        resizeMode='contain'
        style={{ transform: [{translateX: shake}] }}
      />
      : 
      fetchFailed ? 
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>😰Uh Oh😰</Text>
          <Text style={styles.errorText}>Something went wrong...</Text>
          <Text style={styles.errorText}>Please try again!</Text>
        </View>
        :
        <View style={styles.content}>
          <View style={styles.favContainer}>
            <TouchableOpacity style={styles.favTouch} onPress={() => favoriteToggle()}>
              <Image style={styles.favIcon} source={favorite ? require('../../assets/favorite.png'):require('../../assets/unfavorite.png')}/>
            </TouchableOpacity>
          </View>
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
              return <View style={styles.shadow}>
                        <Image
                          key={'img' + i}
                          style={styles.restaurantImg} 
                          source={{ uri: photo }}
                        />
                      </View>
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
  favIcon: {
    height: 70,
    width: 40
  },
  favTouch: {
    height: 70,
    width: 40,
  },
  favContainer: {
    paddingRight: 10,
    alignSelf: 'flex-end',
    height: '0%',
  },
  errorContainer: {
    alignItems: 'center', 
    paddingTop: '50%'
  },
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white'
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
    marginTop: 10,
    width: '80%'
  },
  shareBtn: {
    paddingTop: 10,
    margin: 20,
    width: '80%'
  },
})

export default ResultScreen