import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage, ActivityIndicator } from "react-native";

// custom components
import UserHours from '../components/todayScreen/userHours';

// improted functions
import { _getTodaysData } from "../activities/getTodaysData";

export default class TodayScreen extends Component {
  state = {
    TodaysDate: null,
    ChargeCodeName: null,
    ChargeCodeTitle: null,
    Balance: null,
    isHidden: false
  }

  componentWillMount() {
    this.setState({ isHidden: true })
    _getTodaysData()
      .then(res => {
        if (res) {
          setDataState = async () => {
            this.setState({ isHidden: false })

            let unparsedTodaysData = await AsyncStorage.getItem('#todaysData');
            let todaysData = JSON.parse(unparsedTodaysData)

            let charge_code_title = todaysData.data.timecard_items[0].charge_code_title;
            if (charge_code_title.length > 19) charge_code_title = charge_code_title.substring(0, 19);

            this.setState({
              TodaysDate: todaysData.data.date_readable,
              ChargeCodeName: todaysData.data.timecard_items[0].charge_code_name,
              ChargeCodeTitle: charge_code_title,
              Balance: todaysData.data.timecard_items[0].balance
            });
          }
          setDataState();
          //console.log(AsyncStorage.getAllKeys());
        }
      })
  };

  render() {
    let hide = this.state.isHidden;
    if (!hide) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.TodaysDate}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.ChargeCodeName}</Text>
            <Text>{this.state.ChargeCodeTitle}</Text>
            <Text>Balance: {this.state.Balance}{"\n"}</Text>
            <UserHours />
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.activityText}>Loading Todays Data...</Text>
          <ActivityIndicator
            style={styles.activity}
            size='large'
            color='green'
          />
        </View>
      )
    }
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff'
  },
  textContainer: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 17
  },
  activity: {
    top: 40
  },
  activityText: {
    alignSelf: 'center',
    paddingTop: 35,
    fontSize: 17,
    color: 'green'
  }
})