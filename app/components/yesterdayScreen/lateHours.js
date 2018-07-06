import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

// imported libraries
import t from 'tcomb-form-native';

// custom components
import SubmitHours from '../../components/misc/submitCreds';

//imported functions
import { _submitYesterdaysHours } from '../../activities/submitData/submitYesterdaysHours';

export default class LateHours extends Component {
  constructor(props) {
    super(props);

    this.alertSuccess = this.alertSuccess.bind(this);
  }

  state = {
    animate: false,
    hours: null,
    comments: null
  };

  alertSuccess() {
    this.setState({ animate: false })
    alert('Hours Submitted!')
  }

  _handleYesterdaysHours = async () => {
    try {
      let submittedForm = this.refs.userHours.getValue();

      await AsyncStorage.setItem('#yesterdayFormKey', JSON.stringify(submittedForm));
  
      if (submittedForm) {
        this.setState({ 
          hours: submittedForm.hours,
          comments: submittedForm.comments,
          animate: true 
        }, () =>
          _submitYesterdaysHours()
            .then((res) => {
              if (res) {
                this.alertSuccess();
              } else {
                this.setState({ animate: false });
              }
            })
        )
      } else {
        //alert('No hours have been entered.')
      }
    } catch (error) {
      alert (error)
    }
  }

  render() {
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

        <ActivityIndicator
          style={styles.activity}
          animating={this.state.animate}
          size='large'
          color='green'
        />
      </View>
    )
  }
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
  }
});
