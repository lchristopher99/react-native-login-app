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
              resolve('noMatch');
            }
          })
          .catch(() => {
            resolve('incHost');
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
          resolve('user&pass');
        } else if (loginForm.submittedForm == null) {
          resolve('user/pass');
        } else {
          resolve('host');
        }
      } catch (error) {
        alert(error);
      }
    };

    formValidate();
  })
};