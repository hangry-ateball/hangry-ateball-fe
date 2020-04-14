import { AsyncStorage } from 'react-native';

export const fetchPreviousRestaurants = async () => {
  try {
    let previousRestaurants = await AsyncStorage.getItem('previous');
    if (previousRestaurants === null) { 
      return []; 
    }
    return parsePreviousRestaurants(previousRestaurants);
  } catch (error) {
    console.log('Error fetching previous restaurants', error);
  }
}

const parsePreviousRestaurants = (previousRestaurants) => {
  return JSON.parse(previousRestaurants).filter((restaurant, i) => {
    return JSON.parse(previousRestaurants).map(restaurant => restaurant.name).indexOf(restaurant.name) === i
  })
}

export const mergePreviousRestaurants = (previousRestaurants, restaurant) => {
  return [...previousRestaurants, {name: restaurant.name, rating: restaurant.rating, price: restaurant.price}];
}

export const savePreviousRestaurants = (previousRestaurants) => {
  AsyncStorage.setItem('previous', JSON.stringify(previousRestaurants));
}