import React, {Component} from 'react';
import { View } from 'react-native';


export default class CredsAPI extends Component {
  constructor(props) {
    super(props);
    this.credsApiFunction = this.credsApiFunction.bind(this);
  }

  state ={
    credsArray: []
  }


  credsApiFunction() {
    console.log('Success!')

    // API responsible for verifying user VVV
    let url = 'https://login-project-8fb27.firebaseio.com/creds.json';

    fetch(url)
      .then((res) => res.json())
      .then((parsedRes) => {
        const userCreds = [];
        for (const key in parsedRes) {
          userCreds.push({
            username: parsedRes[key].username,
            password: parsedRes[key].password,
            id: key
          });
        }
        this.setState({
          credsArray: userCreds
        })
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(this.state.credsArray)

    //if (submittedForm == credsArray)
  }

  render() {
    return (
      <View/>
    )
  }
}

