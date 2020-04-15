import React, { useState, useEffect, useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import { fetchRestaurants, unFavoriteRestaurant } from '../asyncStorageHelper'

const FavTab = () => {
  const [isLoading, setLoader] = useState(true);
  const [favorites, setFavorites] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => [setRefreshing(false), loadFavoriteRestaurants()]);
  }, [refreshing]);

  const loadFavoriteRestaurants = async () => {
    try {
      let allFavorites = await fetchRestaurants('favorite');
      setFavorites(allFavorites)
      setLoader(false)
      return allFavorites
    } catch (error) {
      console.log('Error fetching favorites', error);
    }
  }

  useEffect(() => {
    loadFavoriteRestaurants()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#ffffff'/>}
      >
        {isLoading ? <ActivityIndicator size='large' color='#ffffff'/> 
          : 
          <ScrollView showsVerticalScrollIndicator={false}>
            {favorites.length === 0 
              ? 
              <View style={styles.noFavorites}>
                  <Text testID='noFavoritesMsg' style={{fontSize: 25, color: 'white'}}>You don't have any favorites 🥺</Text>
              </View>
              :
              favorites.reverse().map(restaurant => {
                return <View testID='favoriteRestaurant' style={styles.favorites}>
                          <View style={styles.name}>
                            <Text style={styles.text}>{restaurant.name.length > 9 ? restaurant.name.slice(0, 9) + '...':restaurant.name}</Text>
                          </View>
                          <View style={styles.ratingContainer}> 
                            <Text style={styles.text}>{restaurant.rating}</Text>
                            <Icon color='#f9e000' size={30} name={'star'}/>
                          </View>
                          <View style={styles.priceContainer}> 
                            <Text style={styles.text}>{restaurant.price}</Text>
                          </View>
                          <View style={styles.icon}>
                            <TouchableOpacity style={styles.icon} onPress={(() => [unFavoriteRestaurant({name: restaurant.name}), setTimeout(() => loadFavoriteRestaurants(), 500)])} >
                              <Icon
                                style={[{ height: 35, width: 35 }]} 
                                color='red'
                                size={30} 
                                name={'alpha-x-circle-outline'} 
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
            })}
          </ScrollView>
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  noFavorites: {
    paddingTop: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000065'
  },
  title: {
    color: '#f9e000',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: '15%',
    paddingBottom: '5%',
  },
  name: {
    alignItems: 'flex-start',
    width: 155,
    height: 35,
  },
  ratingContainer: {
    width: 65, 
    height: 35, 
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  priceContainer: {
    paddingLeft: 1.5,
    width: 65, 
    height: 35, 
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  icon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 40,
    height: 35,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000065',
  },
  price: {
    fontWeight: 'bold',
    color: 'lightgreen',
  },
  favorites: {
    justifyContent: 'center',
    flex: 1, 
    flexDirection: 'row', 
    width: '100%', 
    alignSelf: 'center',
    marginVertical: 5,
    backgroundColor: 'gray',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  }
})

export default FavTab;