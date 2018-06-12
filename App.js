import React from 'react';
import { StyleSheet, View } from 'react-native';

import FetchLocationBtn from './components/FetchLocation';

export default class App extends React.Component {

  state = {
    getLocationPressed: null,
    userLocation: null,
    otherUsersLocations: [] 
  }

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {

      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        },
        getLocationPressed: {
          isPressed: true
        }
      });

      fetch('https://testapp-206216.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res)) 
      .catch(err => console.log(err)); 
      
    }), err => console.log(err); 
  }

  otherUsersHandler = () => {
      fetch('https://testapp-206216.firebaseio.com/places.json')
      .then(res => res.json()) 
      .then(parsedRes => { 
        const otherUsersLocationsArray = []; 
        for (const key in parsedRes) { 
          otherUsersLocationsArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        this.setState({ 
          otherUsersLocations: otherUsersLocationsArray
        });
      })
      .catch(err => console.log(err)); 
  }

  render() {
    return (
      <View style={styles.container}>
        <FetchLocationBtn
          onGetLocation={this.getUserLocationHandler} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
});
