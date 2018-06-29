import React, { Component } from 'react';

// stackNav
import { rootNav } from './router';

const TopLevelNav = rootNav;

export default class App extends Component {
  render() {
    return (
      <TopLevelNav/>
    )
  };
}
