import React from 'react';
import { View, StyleSheet } from 'react-native';

import t from 'tcomb-form-native';

export const getUserCreds = () => {
	let userCreds = submittedForm.getValue();
  let userHost = submittedHost.getValue();

  if (userCreds !== null && userHost !== null) { // exported modal function will be placed within this error log nested if statement
    getUserCredsAPI()
  } else if (userCreds == null && userHost == null) {
    console.log('Username or password not entered.'),
    console.log('Hostname not entered.')
	} else if (userCreds == null) {
    console.log('Username or password not entered.')
  } else {
    console.log('Hostname not entered.')
  }
}

const getUserCredsAPI = () => {
	let userHost = submittedHost.getValue();
	let parsedHost = JSON.stringify(userHost.hostname);
	let parsedHostname = parsedHost.replace(/["]/g, '');
	let url = 'https://' + parsedHostname + '.firebaseio.com/creds.json'
	console.log(url);
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(this.submittedForm.getValue())
	})
	.then(res => console.log(res)) 
	.catch(err => console.log(err)); 
	// add error if 404 is recieved from incorrect hostname
}



const userinput = () => { 	

	const Form = t.form.Form;

	const User = t.struct({
		username: t.String,
		password: t.String, // need to obscure this text field
	});

	const Host = t.struct({
		hostname: t.String
	});

	return (
		<View style={styles.container}>
			<Form 
				ref={a => this.submittedForm = a} // assigned a ref
				options={options}
				type={User} />
			<Form
				ref={b => this.submittedHost = b}
				type={Host}
			/>
		</View>
  );
}

const options = {
	fields: {
		password: {
			password: true,
			secureTextEntry: true
		}
	}
}

const styles = StyleSheet.create({
  container: {
    width: '70%'
  },
});

export default userinput;
