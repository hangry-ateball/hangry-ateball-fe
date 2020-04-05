import React from 'react'
import { StyleSheet, View, Modal, Text, Button, Image, ScrollView } from 'react-native'


const ResultPage = () => {
  return (
    <Modal visible={true}>
      <View style={styles.resultContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Casa Bonita</Text>
        </View>
        <View>
          <Text>Rating</Text>
          <Text>303-420-6969</Text>
          <Text>69639 Burrito Way - Open in Maps</Text>
        </View>
        {/* <FlatList 
          renderItem=
          
        /> */}
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
          {/* menu and site */}
        </View>
        <View>
          {/* buttons */}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
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
  }
})

export default ResultPage