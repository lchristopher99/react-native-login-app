import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";

// custom components
import UserHours from '../components/todayScreen/userHours';

export default class TodayScreen extends Component {
  state = {
    chargeCodeName: null,
    chargeCodeTitle: null,
    balance: null
  }

  _retrieveData = async () => {
    try {
      const userData = await AsyncStorage.getItem('#userDataKey');
      const parsedUser = JSON.parse(userData);

      if (parsedUser !== null) {
        console.log(parsedUser)

        const charge_code_name = parsedUser.todaysData.timecard_items[0].charge_code_name;
        const charge_code_title = parsedUser.todaysData.timecard_items[0].charge_code_title;
        const dbBalance = parsedUser.todaysData.timecard_items[0].balance

        if(charge_code_title.length > 19) charge_code_title = charge_code_title.substring(0,19);

        this.setState({chargeCodeName: charge_code_name});
        this.setState({chargeCodeTitle: charge_code_title});
        this.setState({balance: dbBalance});

        //console.log(AsyncStorage.getAllKeys())
      }
     } catch (error) {
      alert('Error retrieving data.')
    }
  }

  componentWillMount() {
    this._retrieveData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{todaysDate}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.chargeCodeName}</Text>
          <Text>{this.state.chargeCodeTitle}</Text>
          <Text>{this.state.balance}{"\n"}</Text>
          <UserHours />
        </View>
      </View>
    )
  }
};

const date = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const todaysDate = month + '/' + date + '/' + year;


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