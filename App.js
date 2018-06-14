import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import SubmitCredsBtn from './components/login/submitCreds';
import UserInputForm, { getUserCreds } from './components/login/userInput';
import LoginErrModal from './components/login/loginErrModal';

export default class App extends Component {
  onModalActivated() {
    this.errorModal.setModalVisible(true); 
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
        <UserInputForm/>
        <SubmitCredsBtn
          onGetCreds={this.onModalActivated.bind(this)} // this is the exported arrow function from userInput.js
        />
        <LoginErrModal 
          ref={ref => (this.errorModal = ref)}
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
