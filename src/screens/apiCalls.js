export const getRestaurantData = (userLocation, restaurantType, price) => {
  if(restaurantType && cost) {
    return fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}&price=${price}`) 
      .then(response => response.json())
  } else if (restaurantType) {
    return fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}`) 
      .then(response => response.json())
  } else if (price) {
    return fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&price=${price}`) 
      .then(response => response.json())
  } else {
    return fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`) 
      .then(response => response.json())
  }  
}