import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, AsyncStorage, View } from 'react-native';

// imported helper files/components
import Auth from '../auth';
import SubmitCredsBtn from '../components/misc/submitCreds';
import UserInput from '../components/login/userInput';
import SuccessMessage from '../components/misc/successMessage';

export default class LoginScreen extends Component {
  state = {
    isHidden: false,
    errModal: true,
    errModalMessage: null
  }

  setLoader = async () => {
    try {
      this.setState({ errModal: true, isHidden: true });

      let submittedForm = this.submittedForm.getValue();
      let submittedHost = this.submittedHost.getValue();

      let loginForm = {
        submittedForm,
        submittedHost
      }

      await AsyncStorage.setItem('#loginFormKey', JSON.stringify(loginForm));

      Auth()
        .then(res => { // form verification
          if (res == true) {
            this.props.navigation.navigate('SignedIn');
          } else if (res == 'user&pass') {
            this.setState({
              isHidden: false,
              errModal: false,
              errModalMessage: 'Username or password not entered. Hostname not entered.'
            })
          } else if (res == 'user/pass') {
            this.setState({
              isHidden: false,
              errModal: false,
              errModalMessage: 'Username or password not entered.'
            })
          } else if (res == 'host') {
            this.setState({
              isHidden: false,
              errModal: false,
              errModalMessage: 'Hostname not entered.'
            })
          } else if (res == 'noMatch') {
            this.setState({
              isHidden: false,
              errModal: false,
              errModalMessage: 'Username/Password does not match database.'
            })
          } else if (res == 'incHost') {
            this.setState({
              isHidden: false,
              errModal: false,
              errModalMessage: 'Incorrect Hostname.'
            })
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
          hideSubmit={this.state.isHidden}
          title='Login'
          onSubmit={() => this.setLoader()}
        />

        <View style={styles.successMessageContainer}>
          <SuccessMessage
            name='x-circle'
            type='feather'
            color='red'
            hidden={this.state.errModal}
            message={this.state.errModalMessage}
            messageColor='red'
            messageSize={15}
          />
        </View>
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
  },
  userFormContainer: {
    width: '65%'
  },
  activity: {
    top: 40
  },
  successMessageContainer: {
    top: 35,
    alignItems: 'center'
  }
});
