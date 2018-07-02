import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class TodayScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Canvas R&D: Database Development</Text>
          <Text>190.75</Text>
          
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
    fontSize: 17
  }
})