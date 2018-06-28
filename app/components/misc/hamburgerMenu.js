import React, { Component } from 'react';

// library components
import Hamburger from 'react-native-hamburger';

export default class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }
  

  render() {
    return (
      <Hamburger
        active={this.state.active}
        type='cross'
        onPress={() => this.setState({active: !this.state.active}, console.log('drawer'))}
      />
    )
  }
}