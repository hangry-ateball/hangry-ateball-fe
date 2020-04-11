export const getRestaurantData = async (userLocation, restaurantType, price) => {
  console.log(userLocation, restaurantType, price, 'params');
  if(restaurantType && price) {
    return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}&price=${price}`) 
      .then(response => response.json())
      .catch(error => console.log('error fetching'))
  } else if (restaurantType) {
    return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&categories=${restaurantType}`) 
      .then(response => response.json())
  } else if (price) {
    return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&price=${price}`) 
      .then(response => response.json())
  } else {
    return await fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/recommendations?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`) 
      .then(response => response.json())
  }  
}