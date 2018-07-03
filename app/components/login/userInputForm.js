import React, { Component } from 'react';
import { View } from 'react-native';

// library components
import t from 'tcomb-form-native';

export default class UserInputForm extends Component {
  render() {
    return (
      <View>
        <Form
          ref={a => this.submittedForm = a}
          options={options}
          type={User} 
        />
        <Form
          ref={b => this.submittedHost = b}
          options={options}
          type={Host}
        />
      </View>
    );
  }
}

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
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