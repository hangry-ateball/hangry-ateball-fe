import { AsyncStorage } from 'react-native';

export const fetchRestaurants = async (key) => {
  try {
    let restaurants = await AsyncStorage.getItem(key);
    if (restaurants === null) { 
      return []; 
    }
    return parseRestaurants(restaurants);
  } catch (error) {
    console.log('Error fetching previous restaurants', error);
  }
}

export const mergeRestaurants = (favoriteRestaurants, restaurant) => {
  return [...favoriteRestaurants, {name: restaurant.name, rating: restaurant.rating, price: restaurant.price}]
}

export const saveRestaurants = (previousRestaurants, key) => {
  AsyncStorage.setItem(key, JSON.stringify(previousRestaurants));
}

const parseRestaurants = (restaurants) => {
  return JSON.parse(restaurants).filter((restaurant, i) => {
    return JSON.parse(restaurants).map(restaurant => restaurant.name).indexOf(restaurant.name) === i
  })
}

export const updatePreviousRestaurants = async (restaurant) => {
  try {
    let previous = await fetchRestaurants('previous');
    previous = mergeRestaurants(previous, restaurant);
    saveRestaurants(previous, 'previous');
  } catch (error) {
    console.log('Error fetching Previous', error);
  }
}

export const addFavoriteRestaurant = async (restaurant) => {
  try {
    let favorites = await fetchRestaurants('favorite');
    favorites = mergeRestaurants(favorites, restaurant)
    saveRestaurants(favorites, 'favorite');
  } catch (error) {
    console.log('Error fetching favorites', error);
  }
}

export const removeFavoriteRestaurant = (favoriteRestaurants, unfavoritedRestaurant) => {
  return favoriteRestaurants.filter(restaurant => {
    return restaurant.name !== unfavoritedRestaurant.name
  });
}

export const unFavoriteRestaurant = async (restaurant) => {
  try {
    let favorites = await fetchRestaurants('favorite')
    favorites = removeFavoriteRestaurant(favorites, restaurant)
    saveRestaurants(favorites, 'favorite')
  } catch (error) {
    console.log('Error fetching favorites', error);
  }
}