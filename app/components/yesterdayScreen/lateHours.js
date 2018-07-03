import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// imported libraries
import t from 'tcomb-form-native';

// custom components
import SubmitHours from '../../components/misc/submitCreds';

export default class LateHours extends Component {
  state = {
    animate: false,
    isHidden: false
  };

  logLateHours = () => {
    let hours = this.refs.userHours.getValue();
    if (hours) { // connects to DB and posts hours
      this.setState({ animate: true });
      console.log(hours);
      let url = 'https://login-project-8fb27.firebaseio.com/lateHours.json'

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(hours)
      }).then(res => {
        if (res.ok) {
          alert('Hours saved!');
        } else {
          alert('An error occured. Status: ' + res.status)
        }
      }).then(() => this.setState({ animate: false }))
        .catch(() => console.log('An error occurred. Check logLateHours.'))
    }
  };

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
            hide={this.state.isHidden}
            onSubmit={this.logLateHours}
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
