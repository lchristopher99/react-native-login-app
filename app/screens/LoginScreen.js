import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';

// imported components
import SubmitCredsBtn from '../components/login/submitCreds';

// imported helper files
import InputVerification from '../components/login/inputVerification';


// import LoginErrModal from '../components/login/loginErrModal';

export default class LoginScreen extends Component {
  state = {
    animate: false,
    isHidden: false
  }

  setLoader = () => {
    this.inputVerification.userVerification()
      .then(res => {
        if (res == true) {
          this.setState({ animate: true });
          this.setState({ isHidden: true });
          setTimeout(() => {
            this.props.navigation.navigate('SignedIn');
            this.setState({ animate: false });
            this.setState({ isHidden: false });
          }, 1500);
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
          hide={this.state.isHidden}
          ref={ref => (this.inputVerification = ref)}
        />
        <SubmitCredsBtn           
          //onGetCreds={() => this.errorModal.setModalVisible(true)} // error modal uses this handler
          hide={this.state.isHidden}
          onGetCreds={this.setLoader}
        />
        <ActivityIndicator
          style={styles.activity}
          animating={this.state.animate}
          size='large'
          color='green'
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
  activity: {
    top: 40
  }
});
