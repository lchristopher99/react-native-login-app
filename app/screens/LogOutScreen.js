import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-elements';


export default class LogOutScreen extends Component { // Add function that refreshes app to logout user?
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Button
            title='LogOut'
            onPress={() => console.log('logout')}
            buttonStyle={{
              top: 25,
              backgroundColor: 'green',
              width: 200,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
  textContainer: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 24
  }
})