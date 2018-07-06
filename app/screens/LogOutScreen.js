import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

const navigateAction = NavigationActions.navigate({
  routeName: 'SignedOut',
  action: NavigationActions.navigate({ routeName: 'SignedOut' }),
});


export default class LogOutScreen extends Component { 
  _handleLogout = () => {
    //AsyncStorage.clear();
    this.props.navigation.dispatch(navigateAction);
    //console.log(AsyncStorage.getAllKeys());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Button
            title='LogOut'
            onPress={this._handleLogout}
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