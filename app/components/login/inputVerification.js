import React, { Component } from 'react';

// custom components
import UserInputForm from './userInputForm';

export default class InputVerification extends Component { // LoginFormVerify
  userVerification = () => {
    return new Promise((resolve) => {
      state = {
        credsArray: [],
        userCredsState: null
      }
  
      const verifyUser = () => { // verifies user creds with creds on DB 
        let credsArrayUser = this.state.credsArray[0].username;
        let credsArrayPass = this.state.credsArray[0].password;
        let userCredsUser = this.state.userCredsState.username;
        let userCredsPass = this.state.userCredsState.password;
    
        if (credsArrayUser == userCredsUser) {
          if (credsArrayPass == userCredsPass) {
            setTimeout(() => {
              alert('Success! User verified!'); // navigation to next page on this call
            }, 1500);
            resolve(true);
          } else {
            alert('Username/Password does not match database.');
          }
        } else {
          alert('Username/Password does not match database.');
        }
      }

      const credsApiVerify = () => { // adds user credentials from DB to local array for later comparrison
        let url = 'https://login-project-8fb27.firebaseio.com/creds.json'
    
        fetch(url)
          .then(response => response.json())
          .then(parsedRes => {
            const userCredsObj = [];
            for (const key in parsedRes) {
              userCredsObj.push({
                username: parsedRes[key].username,
                password: parsedRes[key].password
              });
            }
            this.setState(
              {credsArray: userCredsObj},
              () => verifyUser()
            )
          }).catch(error => alert(error + '. You probably included an invalid character in the hostname, try again.'))
    
        const userCredsForm = this.userInputForm.submittedForm.getValue();
        this.setState({userCredsState: userCredsForm});
      };

      const responseMessage = () => { // handles response status logging
        let userHost = this.userInputForm.submittedHost.getValue();
        let parsedHost = JSON.stringify(userHost.hostname);
        if (parsedHost == '"Dev"') {
          let url = 'https://login-project-8fb27.firebaseio.com/creds.json'

          fetch(url)
          .then((res) => {
            if (res.ok) {
              console.log('Connection to DB succesful!')
              credsApiVerify()
            } else {
              alert('Connection to DB failed.')
            }
          }).catch(error => alert(error + '. You probably included an invalid character in the hostname, try again.'))
        } else {
          alert('Incorrect hostname.')
        }
      };
      
      const getUserCreds = () => { // handles form verification errors
        let userCreds = this.userInputForm.submittedForm.getValue();
        let userHost = this.userInputForm.submittedHost.getValue();
    
        if (userCreds !== null && userHost !== null) { 
          responseMessage();
        } else if (userCreds == null && userHost == null) {
            alert('Username or password not entered. Hostname not entered.')
        } else if (userCreds == null) {
          alert('Username or password not entered.')
        } else {
          alert('Hostname not entered.')
        }
      };
    
      getUserCreds(); 
      // after this function is called, functions flow backwards ^^^. 
      // ie. getUserCreds, responseMessage, credsApiVerify...
    })
  };

  render() {
    let { hide } = this.props;
    if (!hide) {
      return (
        <UserInputForm
          ref={ref => (this.userInputForm = ref)}
        />
      )
    } else {
      return null;
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