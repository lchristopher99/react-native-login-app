import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView } from "react-native";

// custom components
import LateHours from '../components/yesterdayScreen/lateHours';

// improted functions
import { _getYesterdaysData } from "../activities/getYesterdaysData";

export default class YesterdayScreen extends Component {
  state = {
    YesterdaysDate: null,
    ChargeCodeName: null,
    ChargeCodeTitle: null,
    Balance: null,
    isHidden: false
  }

  componentWillMount() {
    this.setState({ isHidden: true })
    _getYesterdaysData()
      .then(res => {
        if (res) {
          setDataState = async () => {
            this.setState({ isHidden: false })

            let unparsedYesterdaysData = await AsyncStorage.getItem('#yesterdaysData');
            let yesterdaysData = JSON.parse(unparsedYesterdaysData)

            AsyncStorage.setItem('#idslinKey', JSON.stringify(yesterdaysData.data.timecard_items[0].idslin_personnel));

            let charge_code_title = yesterdaysData.data.timecard_items[0].charge_code_title;
            if (charge_code_title.length > 19) charge_code_title = charge_code_title.substring(0, 19);

            this.setState({
              YesterdaysDate: yesterdaysData.data.date_readable,
              ChargeCodeName: yesterdaysData.data.timecard_items[0].charge_code_name,
              ChargeCodeTitle: charge_code_title,
              Balance: yesterdaysData.data.timecard_items[0].balance
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
          <Text style={styles.textDate}>{this.state.YesterdaysDate}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.ChargeCodeName}</Text>
            <Text>{this.state.ChargeCodeTitle}</Text>
            <Text>Balance: {this.state.Balance}{"\n"}</Text>
            <LateHours />
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View>
          <Text style={styles.activityText}>Loading Yesterdays Data...</Text>
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