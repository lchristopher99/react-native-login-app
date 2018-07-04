import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";

// custom components
import SubmitPayPeriod from '../components/misc/submitCreds';

export default class YesterdayScreen extends Component {
  state = {
    chargeCodeName: null,
    totalHours: null
  }

  _retrieveData = async () => {
    try {
      const userData = await AsyncStorage.getItem('#userDataKey');
      const parsedUser = JSON.parse(userData);

      if (parsedUser !== null) {
        //console.log(parsedUser)

        const charge_code_name = parsedUser.todaysData.timecard_items[0].charge_code_name;
        const total_hours = parsedUser.todaysData.total_hours;

        this.setState({totalHours: total_hours});
        this.setState({chargeCodeName: charge_code_name});

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
        <Text style={styles.text}>Pay period dates will go here</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.state.chargeCodeName}</Text>
          <Text style={styles.text}>Total Hours: {this.state.totalHours}{"\n"}</Text>
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