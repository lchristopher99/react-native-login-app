import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

// imported helper files/components
import InputVerification from '../components/login/inputVerification';
import SubmitCredsBtn from '../components/misc/submitCreds';

export default class LoginScreen extends Component {
  state = {
    isHidden: false
  }

  setLoader = () => {
    this.setState({ isHidden: true });
    this.inputVerification.loginAttempt()
      .then(res => {
        if (res == true) {
          this.props.navigation.navigate('SignedIn');
        } else {
          alert('An error occured. Check setLoader.')
        }
      })
  }

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
          hide={this.state.isHidden}
          componentStyle={styles.userFormContainer}
          activityStyle={styles.activity}
        />
        <SubmitCredsBtn
          //onGetCreds={() => this.errorModal.setModalVisible(true)} // error modal uses this handler
          hide={this.state.isHidden}
          title='Login'
          onSubmit={() => this.setLoader()}
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
    paddingBottom: 150
  },
  userFormContainer: {
    width: '65%'
  },
  activity: {
    top: 40
  }
});
