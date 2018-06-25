import React, { Component } from 'react';
import { createRootNavigator } from './router';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  render() {
    const { signedIn } = this.state;

    const Login = createRootNavigator(signedIn)
    return <Login/>;
  }
}