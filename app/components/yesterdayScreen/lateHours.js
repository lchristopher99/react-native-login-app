import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

// imported libraries
import t from 'tcomb-form-native';

// custom components
import SubmitHours from '../../components/misc/submitCreds';
import SuccessMessage from '../../components/misc/successMessage';

//imported functions
import { _submitYesterdaysHours } from '../../activities/submitData/submitYesterdaysHours';

export default class LateHours extends Component {
  state = {
    animate: false,
    messageHidden: true
  };

  _handleYesterdaysHours = async () => {
    try {
      let submittedForm = this.refs.userHours.getValue();

      await AsyncStorage.setItem('#yesterdayFormKey', JSON.stringify(submittedForm));

      if (submittedForm) {
        this.setState({
          animate: true
        }, () =>
            _submitYesterdaysHours()
              .then((res) => {
                if (res) {
                  this.setState({
                    animate: false,
                    messageHidden: false
                  });
                } else {
                  this.setState({ animate: false });
                }
              })
        )
      }
    } catch (error) {
      alert(error)
    }
  };

  render() {
    let { hidden } = this.props;
    if (!hidden) {
      return (
        <View>
          <Form
            ref='userHours'
            type={Hours}
            options={options}
          />

          <View style={styles.buttonContainer}>
            <SubmitHours
              title='Save'
              onSubmit={this._handleYesterdaysHours}
            />
          </View>

          <View style={styles.successMessageContainer}>
            <SuccessMessage
              name='ios-checkmark-circle-outline'
              type='ionicon'
              color='green'
              hidden={this.state.messageHidden}
              message='Hours Submitted!'
              messageColor='green'
              messageSize={15}
            />
          </View>

          <ActivityIndicator
            style={styles.activity}
            animating={this.state.animate}
            size='large'
            color='green'
          />
        </View>
      )
    } else {
      return (
        <SuccessMessage
          name='ios-checkmark-circle-outline'
          type='ionicon'
          color='green'
          hidden={!this.state.messageHidden}
          message='Your timecard has been submitted. See you next pay period!'
          messageColor='green'
          messageSize={15}
        />
      )
    }
  };
};



const Form = t.form.Form;

const Hours = t.struct({
  hours: t.Number,
  comments: t.String
});

var options = {
  auto: 'placeholders',
  fields: {
    hours: {
      error: 'A number must be entered.'
    },
    comments: {
      placeholder: 'Enter late reason here...',
      maxLength: 100
    }
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: '50%'
  },
  activity: {
    top: 40
  },
  successMessageContainer: {
    top: 35,
    alignSelf: 'center'
  }
});
