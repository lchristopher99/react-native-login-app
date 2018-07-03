import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

// custom components
import LateHours from '../components/yesterdayScreen/lateHours';

export default class YesterdayScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{yesterdaysDate}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Canvas R&D: Database Development</Text>
          <Text>SLIN: 2018 R&D Labor</Text>
          <Text>190.75{"\n"}</Text>
          <LateHours/>
        </View>
      </View>
    )
  }
};

const date = new Date().getDate() - 1;
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const yesterdaysDate = month + '/' + date + '/' + year;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff'
  },
  textContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 17
  }
})