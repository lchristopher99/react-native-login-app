import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

// library components
import t from 'tcomb-form-native';

export default class UserInput extends Component {
  render() {
    let { hide, componentStyle, activityStyle, form, host } = this.props;
    if (!hide) {
      return (
        <View style={componentStyle}>
          <Form
            ref={form}
            options={options}
            type={User}
          />
          <Form
            ref={host}
            options={options}
            type={Host}
          />
        </View>
      )
    } else {
      return (
        <ActivityIndicator
          style={activityStyle}
          animating={true}
          size='large'
          color='green'
        />
      )
    }
  };
}

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String
});

const Host = t.struct({
  hostname: t.String
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
}