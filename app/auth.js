import { AsyncStorage } from 'react-native';

export default Auth = () => { // LoginFormVerify
  return new Promise((resolve) => {
    const _storeData = async () => {
      try {
        let unparsedLoginForm = await AsyncStorage.getItem('#loginFormKey');
        let loginForm = JSON.parse(unparsedLoginForm);

        let isAuth = true;
        let hostname = loginForm.submittedHost.hostname;

        let auth = {
          isAuth,
          hostname
        };

        await AsyncStorage.setItem('#authKey', JSON.stringify(auth));
        
        resolve(true);
      } catch (error) {
        alert('Error storing data.')
      }
    };

    const verifyUser = async () => {
      try {
        let unparsedLoginForm = await AsyncStorage.getItem('#loginFormKey');
        let loginForm = JSON.parse(unparsedLoginForm);

        let url = 'https://' + loginForm.submittedHost.hostname + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'login',
            username: loginForm.submittedForm.username,
            password: loginForm.submittedForm.password
          }),
        })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.is_auth) {
              // console.log(parsedRes)
              _storeData();
            } else {
              resolve(false);
              alert('Username/Password does not match database.');
            }
          })
          .catch(err => {
            alert('Incorrect Hostname. ' + err);
            resolve(false);
          });
      } catch (error) {
        alert(error);
      }
    };

    const formValidate = async () => { // handles empty form errors
      let unparsedLoginForm = await AsyncStorage.getItem('#loginFormKey');
      let loginForm = JSON.parse(unparsedLoginForm);
      try {
        if (loginForm.submittedForm !== null && loginForm.submittedHost !== null) {
          verifyUser();
        } else if (loginForm.submittedForm == null && loginForm.submittedHost == null) {
          alert('Username or password not entered. Hostname not entered.');
          resolve(false);
        } else if (loginForm.submittedForm == null) {
          alert('Username or password not entered.')
          resolve(false);
        } else {
          alert('Hostname not entered.')
          resolve(false);
        }
      } catch (error) {
        alert(error);
      }
    };

    formValidate();
  })
};