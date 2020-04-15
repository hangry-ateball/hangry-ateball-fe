import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { fetchRestaurants } from '../asyncStorageHelper'

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

  loadFavoriteRestaurants = async () => {
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {isLoading ? <ActivityIndicator size='large' color='blue'/> 
          : 
          <ScrollView showsVerticalScrollIndicator={false}>
            {favorites.length === 0 
              ? 
              <View style={styles.noFavorites}>
                  <Text style={{fontSize: 25}}>You don't have any favorites 🥺</Text>
              </View>
              :
              favorites.reverse().map(restaurant => {
                return <View style={styles.favorites}>
                          <View style={styles.name}>
                            <Text style={styles.text}>{restaurant.name.length > 11 ? restaurant.name.slice(0, 11) + '...':restaurant.name}</Text>
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
  favorites: {
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

export default FavTab;