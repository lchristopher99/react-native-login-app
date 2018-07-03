import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

// custom components
import UserInputForm from './userInputForm';

export default class InputVerification extends Component { // LoginFormVerify
  state = {
    hostnameState: null,
    userCredsState: null,
    is_auth: null,
    auth_error: null,
    name: null,
    timeDayData: null,
    animate: false
  }

  loginAttempt = () => {
    return new Promise((resolve) => {
      const verifyUser = () => {
        let url = 'https://' + this.state.hostnameState.hostname + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'login',
            username: this.state.userCredsState.username,
            password: this.state.userCredsState.password
          }),
        })
          .then(res => res.json())
          .then(parsedRes => {
            this.state.is_auth = parsedRes.is_auth;
            this.state.auth_error = parsedRes.auth_error;
            if (parsedRes.is_auth) {
              this.state.name = parsedRes.name;
              this.state.timeDayData = parsedRes.todaysData.date_readable_long;
              console.log(this.state);
              console.log(parsedRes);
              this.setState({ animate: false },
                resolve(true));
            } else {
              alert('Username/Password does not match database.')
            }
          })
          .catch(err => console.log(err));
      }

      const formValidate = () => { // handles form verification errors
        this.setState({ animate: true })

        let userCreds = this.userInputForm.submittedForm.getValue();
        let userHost = this.userInputForm.submittedHost.getValue();

        if (userCreds !== null && userHost !== null) {
          this.setState({ userCredsState: userCreds },
            this.setState({ hostnameState: userHost },
              () => verifyUser()
            )
          );
        } else if (userCreds == null && userHost == null) {
          alert('Username or password not entered. Hostname not entered.')
        } else if (userCreds == null) {
          alert('Username or password not entered.')
        } else {
          alert('Hostname not entered.')
        }
      };

      formValidate();
    })
  };

  render() {
    let { hide, componentStyle, activityStyle } = this.props;
    if (!hide) {
      return (
        <View style={componentStyle}>
          <UserInputForm
            ref={ref => (this.userInputForm = ref)}
          />
        </View>
      )
    } else {
      return (
        <ActivityIndicator
          style={activityStyle}
          animating={this.state.animate}
          size='large'
          color='green'
        />
      )
    }
  };
}

// getUserCredsAPI = () => { // connects to host and posts creds to DB
  //   let userHost = this.userInputForm.submittedHost.getValue();
  //   let parsedHost = JSON.stringify(userHost.hostname);
  //   let parsedHostname = parsedHost.replace(/["]/g, '');
  //   let url = 'https://' + parsedHostname + '.firebaseio.com/creds.json'

  //   fetch(url, {
  //     method: 'POST',
  //     body: JSON.stringify(this.userInputForm.submittedForm.getValue())
  //   }).then(res => {
  //       if (res.ok) {
  //         alert('Success!')
  //       } else {
  //         alert('Incorrect hostname.')
  //       }
  //     })
  // }