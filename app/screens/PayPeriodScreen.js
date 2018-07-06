import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView } from "react-native";

// custom components
import UserHours from '../components/todayScreen/userHours';

// improted functions
import { _getPayPeriodData } from "../activities/getPayPeriodData";

export default class PayPeriodScreen extends Component {
  state = {
    PayPeriodStart: null,
    PayPeriodEnd: null,
    ChargeCodeName: null,
    TotalHours: null,
    isHidden: false
  }

  componentWillMount() {
    this.setState({ isHidden: true })
    _getPayPeriodData()
      .then(res => {
        if (res) {
          setDataState = async () => {
            this.setState({ isHidden: false })
            let unparsedPayPeriodData = await AsyncStorage.getItem('#payPeriodData');
            let payPeriodData = JSON.parse(unparsedPayPeriodData)

            this.setState({
              PayPeriodStart: payPeriodData.data.start_readable,
              PayPeriodEnd: payPeriodData.data.end_readable,
              ChargeCodeName: payPeriodData.data.charge_codes[0].charge_code_name,
              TotalHours: payPeriodData.data.charge_codes[0].total_hours
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
        <ScrollView 
          scrollEnabled={false}
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.container}
        >
          <Text style={styles.textDate}>{this.state.PayPeriodStart} - {this.state.PayPeriodEnd}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.ChargeCodeName}</Text>
            <Text>Total Hours: {this.state.TotalHours}{"\n"}</Text>
            <UserHours />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View>
          <Text style={styles.activityText}>Loading Pay Period Data...</Text>
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
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 17
  },
  textDate: {
    paddingBottom: 90,
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