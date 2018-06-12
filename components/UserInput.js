import React from 'react';
import { View, StyleSheet } from 'react-native';

import t from 'tcomb-form-native';

export const getUserCredsAPI = () => {
	fetch('https://login-project-8fb27.firebaseio.com/UserCreds.json', {
		method: 'POST',
		body: JSON.stringify(this.submittedForm.getValue())
	})
	.then(res => console.log(res)) 
	.catch(err => console.log(err)); 
}

const userinput = () => { 	

	const Form = t.form.Form;

	const User = t.struct({
		username: t.String,
		password: t.String, // need to obscure this text field
	});

	return (
		<View style={styles.container}>
			<Form 
				ref={c => this.submittedForm = c} // assigned a ref
				type={User} />
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%'
  },
});

export default userinput;
