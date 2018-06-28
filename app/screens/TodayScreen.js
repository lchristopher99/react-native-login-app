import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

// custom components
import ScreenHeader from '../components/misc/header';

export default class TodayScreen extends Component {
  render() {
    return (    
      <View style={styles.container}>
        <ScreenHeader title='Today'/>

        <View style={styles.textContainer}>
          <Text style={styles.text}>Welcome Today!</Text>
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