import React from 'react';
import { View, StyleSheet } from 'react-native';

import t from 'tcomb-form-native';

export const UserInput = () => { 	

	const Form = t.form.Form;

	const User = t.struct({
		username: t.String,
		password: t.String, 
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