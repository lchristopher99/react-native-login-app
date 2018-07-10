import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView } from "react-native";

// custom components
import SubmitPeriod from '../components/misc/submitCreds';
import HiddenView from '../components/payPeriodScreen/submittedTimecardMessage';

// imported functions
import { _getPayPeriodData } from "../activities/getData/getPayPeriodData";
import { _submitPayPeriod } from '../activities/submitData/submitPayPeriod';

export default class PayPeriodScreen extends Component {
  state = {
    PayPeriodStart: null,
    PayPeriodEnd: null,
    ChargeCodeName: null,
    TotalHours: null,
    isHidden: null,
    isSubmitted: null,
    activityTitle: null,
    timecardMessage: null
  }

  _handlePeriodSubmit = () => {
    this.setState({
      activityTitle: 'Submitting Pay Period...',
      isHidden: true
    })
    _submitPayPeriod()
      .then(res => {
        if (res) {
          this.setState({
            isHidden: false,
            isSubmitted: true,
            timecardMessage: 'Pay Period Submitted!'
          });
        }
      })
  }

  componentWillMount() {
    this.setState({
      activityTitle: 'Loading Pay Period Data...',
      isHidden: true
    })
    _getPayPeriodData()
      .then(res => {
        if (res) {
          setDataState = async () => {
            let unparsedPayPeriodData = await AsyncStorage.getItem('#payPeriodDataKey');
            let payPeriodData = JSON.parse(unparsedPayPeriodData)

            this.setState({
              PayPeriodStart: payPeriodData.data.start_readable,
              PayPeriodEnd: payPeriodData.data.end_readable,
              ChargeCodeName: payPeriodData.data.charge_codes[0].charge_code_name,
              TotalHours: payPeriodData.data.charge_codes[0].total_hours,
              isHidden: false
            });

            let isSubmitted = payPeriodData.data.is_submitted;

            if (isSubmitted) {
              this.setState({
                timecardMessage: 'Pay Period Submitted!',
                isSubmitted: true
              })
            }
          }
          setDataState();
          console.log(AsyncStorage.getAllKeys());
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
            <SubmitPeriod
              hideSubmit={this.state.isSubmitted}
              title='Submit Pay Period'
              onSubmit={this._handlePeriodSubmit}
            />
            <HiddenView 
              hidden={!this.state.isSubmitted}
              message={this.state.timecardMessage} 
            />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View>
          <Text style={styles.activityText}>{this.state.activityTitle}</Text>
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
    height: '15%',
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