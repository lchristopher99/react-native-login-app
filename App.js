import React, {Component} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';

import SubmitCredsBtn from './components/login/submitCreds';
import UserCredsState, {getUserCreds} from './components/login/userInput';
import {UserInput} from './components/login/userInput1';
// import LoginErrModal from './components/login/loginErrModal';
import CredsAPI from './components/API/credsAPI';

export default class App extends Component {
  onGetUserCreds() {
    this.credsAPI.credsApiFunction();
  }

  // onModalActivated() { // This local function calls the function within LoginErrModal to toggle visible
  //   this.errorModal.setModalVisible(true); // this handler is identified by the ref errorModal set within the component
  // }

  onGetUserCredsState() {
    this.userCredsState.getUserCreds();
  }

  render() {
    return (
      <ScrollView 
				scrollEnabled={false}
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='on-drag'
				contentContainerStyle={styles.container}>
        <Image 
          resizeMode='center' source={require('./images/lojixLogo.png')} 
        />
        <UserInput/>
        <UserCredsState
          ref={ref => (this.userCredsState = ref)}
        />
        <SubmitCredsBtn
          //onGetCreds={this.onModalActivated.bind(this)} // error modal uses this handler
          //onGetCreds={this.onGetUserCreds.bind(this)} // credsAPI uses this handler
          //onGetCreds={getUserCreds} // this is the exported arrow function from userInput.js
          onGetCreds={this.onGetUserCredsState.bind(this)}
        />
        {/* <LoginErrModal // fix this modal to appear for 404 and form errors
          ref={ref => (this.errorModal = ref)} // This component is an exported class from loginErrModal
        />  */}
        <CredsAPI
          ref={ref => (this.credsAPI = ref)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		flex: 1,
		bottom: 50
	}
});
