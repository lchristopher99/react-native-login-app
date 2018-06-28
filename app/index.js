import React, { Component } from 'react';

// stackNav
import { createRootNavigator } from './router';

export default class App extends Component {
  state = {
    signedIn: false
  };

  render() {
    const { signedIn } = this.state;

    const Login = createRootNavigator(signedIn)
    return <Login/>;
  };
}

export const app = new App();