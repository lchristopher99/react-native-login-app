import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';

import SubmitCredsBtn from './components/submitCreds';
import UserInputForm, { getUserCredsAPI } from './components/userInput';

export default class App extends React.Component {

  render() {
    return (
			<ScrollView 
				scrollEnabled={false}
				keyboardShouldPersistTaps='handled'
				keyboardDismissMode='on-drag'
				contentContainerStyle={styles.container}>
				<Image resizeMode='center' source={require('./images/lojixLogo.png')} />
				<UserInputForm/>
				<SubmitCredsBtn
					onGetCreds={getUserCredsAPI} // this is the exported arrow function from UserInput.js
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
