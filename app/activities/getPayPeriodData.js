import { AsyncStorage } from 'react-native';

export const _getPayPeriodData = async () => {
  try {
    let userHost = await AsyncStorage.getItem('#hostKey');
    let userAuth = await AsyncStorage.getItem('#authKey');

    let parsedHost = JSON.parse(userHost);

    return new Promise((resolve) => {
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
              //console.log(parsedRes);
              AsyncStorage.setItem('#payPeriodData', JSON.stringify(parsedRes));
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