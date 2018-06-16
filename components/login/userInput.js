import React, {Component} from 'react';
import {View} from 'react-native';
import {UserInput} from './userInput1';

//export const userCreds; // exports let var above so as to use it in verification process located in credsAPI

export default class UserCredsState extends Component {
  state = {
    UserCreds: null
  };

  onGetUserInputForm() {
    this.userInput.submittedForm.getValue();
  }

  onGetUserInputHost() {
    this.userInput.submittedHost.getValue();
  }

  getUserCreds = () => {
    let userCreds = this.onGetUserInputForm.bind(this);
    let userHost = this.onGetUserInputHost.bind(this);
  
    if (userCreds !== null && userHost !== null) { // exported modal function will be placed within this error log nested if statement
      // getUserCredsAPI()
      // this.setState(
      //   {UserCreds: this.onGetUserInputForm.bind(this)},
      //   () => console.log(this.state.UserCreds) // used callback to only return state once UserCreds has been updated
      // )

      console.log(this.onGetUserInputForm.bind(this)) // I LEFT OFF HERE...Message logs despite conditional
    } else if (userCreds == null && userHost == null) {
      console.log('Username or password not entered.'),
      console.log('Hostname not entered.')
    } else if (userCreds == null) {
      console.log('Username or password not entered.')
    } else {
      console.log('Hostname not entered.')
    }
  };

  getUserCredsAPI = () => {
    let userHost = this.onGetUserInputHost.bind(this);
    let parsedHost = JSON.stringify(userHost.hostname);
    let parsedHostname = parsedHost.replace(/["]/g, '');
    let url = 'https://' + parsedHostname + '.firebaseio.com/creds.json'
    console.log(url);
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.onGetUserInputForm.bind(this))
    })
    .then(res => console.log(res)) 
    .catch(err => console.log(err)); 
    // add error if 404 is recieved from incorrect hostname
  }

  render() {
    return (
      <HiddenView hide>
        <UserInput
          ref={ref => (this.userInput = ref)}
        />
      </HiddenView>
    )
  };
}

const HiddenView = (props) => { // hides the above view so as to avoid rendering twice
  const {hide} = props;
  if (hide) {
    return null;
  }
};