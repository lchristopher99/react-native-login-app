import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

// custom components
import SubmitPayPeriod from '../components/misc/submitCreds';

export default class YesterdayScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pay period dates will go here</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Canvas R&D: Database Development</Text>
          <Text style={styles.text}>Total Hours: {"\n"}</Text>
          <SubmitPayPeriod 
            onSubmit={() => alert('Schwifty')}
            title='Submit' 
          />
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
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 17
  }
})