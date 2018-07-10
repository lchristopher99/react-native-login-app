import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, AsyncStorage } from 'react-native';

// imported helper files/components
import Auth from '../auth';
import SubmitCredsBtn from '../components/misc/submitCreds';
import UserInput from '../components/login/userInput';

export default class LoginScreen extends Component {
  state = {
    isHidden: false
  }

  setLoader = async () => {
    try {
      this.setState({ isHidden: true });

      let submittedForm = this.submittedForm.getValue();
      let submittedHost = this.submittedHost.getValue();

      let loginForm = {
        submittedForm,
        submittedHost
      }

      await AsyncStorage.setItem('#loginFormKey', JSON.stringify(loginForm));

      Auth()
        .then(res => {
          if (res == true) {
            this.props.navigation.navigate('SignedIn');
          } else {
            this.setState({ isHidden: false })
          }
        })
    } catch (error) {
      alert(error);
    }
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
        <UserInput
          hide={this.state.isHidden}
          componentStyle={styles.userFormContainer}
          activityStyle={styles.activity}
          form={ref => (this.submittedForm = ref)}
          host={ref => (this.submittedHost = ref)}
        />
        <SubmitCredsBtn
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
