import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

// imported libraries
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// imported functions
import { setRouteName } from "../router";

const navigateAction = NavigationActions.navigate({
  routeName: 'SignedOut',
  action: NavigationActions.navigate({ routeName: 'SignedOut' }),
});


export default class LogOutScreen extends Component { 
  state = {
    route_name: 'Log Out'
  }

  _handleLogout = () => this.props.navigation.dispatch(navigateAction);

  componentWillMount() {
    setRouteName(this.state.route_name);
  };
  

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