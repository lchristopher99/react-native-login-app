import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

// custom components
import UserInputForm from './userInputForm';

export default class InputVerification extends Component { // LoginFormVerify
  state = {
    hostnameState: null,
    userCredsState: null,
    parsedResponse: null
  }

  _storeData = async () => {
    try {
      let isAuth = this.state.parsedResponse.is_auth;
      let hostname = this.state.hostnameState.hostname;
      let dataUser = this.state.userCredsState.username;
      let dataPass = this.state.userCredsState.password;

      await AsyncStorage.setItem('#authKey', JSON.stringify(isAuth));
      await AsyncStorage.setItem('#hostKey', JSON.stringify(hostname));
      await AsyncStorage.setItem('#dataUser', JSON.stringify(dataUser));
      await AsyncStorage.setItem('#dataPass', JSON.stringify(dataPass));
    } catch (error) {
      alert('Error storing data.')
    }
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
            if (parsedRes.is_auth) {
              this.state.parsedResponse = parsedRes;
              this.setState({ animate: false });
              this._storeData();
              resolve(true);
            } else {
              this.setState({ animate: false });
              resolve(false);
              alert('Username/Password does not match database.');
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

export const inputVerification = new InputVerification();

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