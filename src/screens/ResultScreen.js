import React from 'react'
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native'
import openMap from 'react-native-open-maps';

const ResultScreen = () => {
  const goToRestaurant = () => {
    openMap({ provider: Platform.OS === 'ios' ? 'apple':'google', start: 'my location', travelType: 'walk', end: 'Casa Bonita'  });
  }
  return (
      <View style={styles.resultContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title} accessibilityLabel="title">Casa Bonita</Text>
        </View>
        <View>
          <Text>Rating ⭐️⭐️⭐️⭐️⭐️</Text>
          <Text dataDetectorType='phoneNumber'>303-420-6969</Text>
        </View>
        <Button
          onPress={goToRestaurant}
          title="6969 Burrito Way" 
          accessibilityRole='button'
        />
        <ScrollView 
          showsHorizontalScrollIndicator={false} 
          horizontal={true} 
          style={{width: '100%'}}
        >
          <View style={styles.imgContainer}>
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
            <Image
              style={styles.restaurantImg} 
              source={{ uri: 'https://theknow.denverpost.com/wp-content/uploads/2018/12/BZ28CASABONITA1HC_4877.jpg'}}
            />
          </View>
        </ScrollView>
        <View>
          <Text>Explore Menu</Text>
          <Text>http://www.casabonitadenver.com/</Text>
        </View>
        <View>
          <View style={styles.shareBtn}>
            <Button title="Send to Friends"/>
          </View>
          <View style={styles.shakeAgainBtn}>
            <Button color='darkblue' title="Shake "/>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 50,
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