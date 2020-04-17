import React, { useState, useEffect, useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import { fetchRestaurants, clearAllPrevious } from '../asyncStorageHelper'

const PrevTab = () => {
  const [isLoading, setLoader] = useState(true);
  const [previous, setPrevious] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => [setRefreshing(false), loadPreviousRestaurants()]);
  }, [refreshing]);

  const loadPreviousRestaurants = async () => {
    try {
      let allPrevious = await fetchRestaurants('previous');
      setPrevious(allPrevious)
      setLoader(false)
      return allPrevious
    } catch (error) {
      console.log('Error fetching Previous', error);
    }
  }

  useEffect(() => {
    loadPreviousRestaurants()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <View style={styles.spaceHolder}>
      </View>
        <View style={styles.title}>
          <Text style={{color: '#f9e000', fontSize: 40, fontWeight: 'bold'}} >Previous</Text>
        </View>
        <View style={styles.spaceHolder}>
          <TouchableOpacity style={styles.clearAllBtnTouch} onPress={() => [clearAllPrevious(), setTimeout(() => loadPreviousRestaurants(), 500)]}>
            <View style={styles.clearAllBtn}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Clear</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#ffffff'/>}
      >
        {isLoading ? <ActivityIndicator size='large' color='#ffffff'/> 
          : 
          <ScrollView showsVerticalScrollIndicator={false}>
            {previous.length === 0 
              ? 
              <View style={styles.noFavorites}>
                  <Text style={{fontSize: 25, color: 'white'}}>You don't have any previous 🥺</Text>
              </View>
              :
              previous.reverse().map(restaurant => {
                return <View key={restaurant.name} style={styles.previous}>
                          <View style={styles.name}>
                            <Text style={styles.text}>{restaurant.name.length > 10 ? restaurant.name.slice(0, 10) + '...':restaurant.name}</Text>
                          </View>
                          <View style={styles.ratingContainer}> 
                            <Text style={styles.text}>{restaurant.rating}</Text>
                            <Icon color='#f9e000' size={30} name={'star'}/>
                          </View>
                          <View style={styles.priceContainer}> 
                            <Text style={styles.text}>{restaurant.price}</Text>
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
  topBar: {
    width: '92%',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingTop: 50,
    flexDirection: 'row',
    height: '15%',
  },
  spaceHolder: {
    width: 80,
  },
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
    width: 175,
    alignItems: 'center',
  },
  name: {
    alignItems: 'flex-start',
    width: 175,
    height: 35,
  },
  ratingContainer: {
    width: 75, 
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
  previous: {
    justifyContent: 'center',
    flex: 1, 
    flexDirection: 'row', 
    width: '100%', 
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  clearAllBtn: {
    alignSelf: 'center',
    marginTop: 4,
    borderRadius: 4,
    backgroundColor: '#808080',
    height: 40,
    width: 70,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  clearAllBtnTouch: {
    height: 40,
    width: 75,
  }
})

export default PrevTab;