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
            console.log('Success! User verified!'); // navigation to next page on this call
            resolve(true);
          } else {
            console.log('Username/Password does not match database.');
          }
        } else {
          console.log('Username/Password does not match database.');
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
          }).catch(error => console.log(error + '. You probably included an invalid character in the hostname, try again.'))
    
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
              console.log('Connection to DB failed.')
            }
          }).catch(error => console.log(error + '. You probably included an invalid character in the hostname, try again.'))
        } else {
          console.log('Incorrect hostname.')
        }
      };
      
      const getUserCreds = () => { // handles form verification errors
        let userCreds = this.userInputForm.submittedForm.getValue();
        let userHost = this.userInputForm.submittedHost.getValue();
    
        if (userCreds !== null && userHost !== null) { 
          responseMessage();
        } else if (userCreds == null && userHost == null) {
            console.log('Username or password not entered.'),
            console.log('Hostname not entered.')
        } else if (userCreds == null) {
          console.log('Username or password not entered.')
        } else {
          console.log('Hostname not entered.')
        }
      };
    
      getUserCreds(); 
      // after this function is called, functions flow backwards ^^^. 
      // ie. getUserCreds, responseMessage, credsApiVerify...
    })
  };

  render() {
    return (
      <UserInputForm
        ref={ref => (this.userInputForm = ref)}
      />
    )
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
  //         console.log('Success!')
  //       } else {
  //         console.log('Incorrect hostname.')
  //       }
  //     })
  // }