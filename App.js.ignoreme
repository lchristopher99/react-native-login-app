import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import SubmitCredsBtn from './components/login/submitCreds';
import InputVerification from './components/login/inputVerification';
//import welcomeScreen from './screens/welcomeScreen';

// import LoginErrModal from './components/login/loginErrModal';
// import CredsAPI from './components/API/credsAPI';

export default class App extends Component {
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentContainerStyle={styles.container}>
        <Image
          resizeMode='center' source={require('./images/lojixLogo.png')}
        />
        <InputVerification
          ref={ref => (this.inputVerification = ref)}
        />
        <SubmitCredsBtn
          //onGetCreds={() => this.errorModal.setModalVisible(true)} // error modal uses this handler
          //onGetCreds={() => this.credsAPI.credsApiFunction()} // credsAPI uses this handler
          onGetCreds={() => this.inputVerification.getUserCreds()}
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
    bottom: 80
  }
});
