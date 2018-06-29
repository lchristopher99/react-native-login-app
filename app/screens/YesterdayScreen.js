import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

// custom components
import ScreenHeader from '../components/misc/header'

export default class YesterdayScreen extends Component {
  render() {
    return (    
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Welcome Yesterday!</Text>
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