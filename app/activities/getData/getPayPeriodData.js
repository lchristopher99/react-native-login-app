import { AsyncStorage } from 'react-native';

export const _getPayPeriodData = async () => {
  try {
    let auth = await AsyncStorage.getItem('#authKey');
    let parsedAuth = JSON.parse(auth);

    return new Promise((resolve) => {
      let parsedHost = parsedAuth.hostname;
      let userAuth = parsedAuth.isAuth;
      if (userAuth) {
        let url = 'https://' + parsedHost + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'getPayPeriodSummeryData'
          }),
        })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.is_auth) {
              console.log(parsedRes);
              AsyncStorage.setItem('#payPeriodDataKey', JSON.stringify(parsedRes));
              resolve(true);
            } else {
              alert('An error occurred while fetching data.');
            }
          })
          .catch(error => alert(error));
      }
    })
  } catch (error) {
    alert('Failed to retrieve data.')
  }
}