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

  activateCross = () => {
    this.setState({active: !this.state.active});
    if (this.state.active) {
      this.props.navigate.closeDrawer();
    } else {
      this.props.navigate.openDrawer();
    }
  }

  render() {
    return (
      <Hamburger
        active={this.state.active}
        type='cross'
        onPress={this.activateCross}
      />
    )
  }
}
