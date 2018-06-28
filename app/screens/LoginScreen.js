import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import SubmitCredsBtn from '../components/login/submitCreds';
import InputVerification from '../components/login/inputVerification';

// import LoginErrModal from '../components/login/loginErrModal';

export default class LoginScreen extends Component {
  render() {
    return (
      <ScrollView 
        scrollEnabled={false}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.container}>
        <Image
          resizeMode='center' source={require('../images/lojixLogo.png')}
        />
        <InputVerification
          ref={ref => (this.inputVerification = ref)}
        />
        <SubmitCredsBtn
          //onGetCreds={() => this.errorModal.setModalVisible(true)} // error modal uses this handler
          onGetCreds={
            () => this.inputVerification.userVerification()
              .then(() => this.props.navigation.navigate('SignedIn'))
          }
        />
      </ScrollView>
    );
  }
}

export const loginScreen = new LoginScreen();


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    paddingBottom: 150
  }
});
