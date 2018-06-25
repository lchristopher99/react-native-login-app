import React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';

import SubmitCredsBtn from '../components/login/submitCreds';
import InputVerification from '../components/login/inputVerification';

// import LoginErrModal from '../components/login/loginErrModal';
// import CredsAPI from '../components/API/credsAPI';

export default ({ navigation }) => {
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
        //onGetCreds={() => this.credsAPI.credsApiFunction()} // credsAPI uses this handler
        onGetCreds={() => {
          this.inputVerification.getUserCreds(() => navigation.navigate('SignedIn'))
        }}
      />
    </ScrollView>
  );
}


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
