import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// custom components
import HamburgerMenu from './hamburgerMenu';

export default (props) => {
  return (
    <View style={styles.hamburgerContainer}>
      <View style={styles.hamburger}>
        <HamburgerMenu/>

        <View style={styles.hamburgerHome}>
          <Text style={styles.headerText}>{props.title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hamburgerContainer: {
    height: 80,
    justifyContent: 'flex-end',
    backgroundColor: '#154576'
  },
  hamburger: {
    flexDirection: 'row',
    left: 5,
    alignSelf: 'flex-start'
  },
  hamburgerHome: {
    alignSelf: 'center',
    left: '25%'
  },
  headerText: {
    color: '#ABC72E',
    fontSize: 20
  }
});