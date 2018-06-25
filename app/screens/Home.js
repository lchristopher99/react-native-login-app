import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome home!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  text: {
    left: '25%',
    color: '#fff',
    fontSize: 24
  }
})