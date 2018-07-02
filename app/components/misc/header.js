import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default (props) => {
  return <Text style={styles.headerText}>{props.navigate.routeName}</Text>;
}

const styles = StyleSheet.create({
  headerText: {
    color: '#ABC72E',
    fontSize: 20
  }
});