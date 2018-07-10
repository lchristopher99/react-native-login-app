import { AsyncStorage } from 'react-native';

export const _submitPayPeriod = async () => {
  try {
    let userCreds = await AsyncStorage.getItem('#authKey');
    let parsedCreds = JSON.parse(userCreds);

    return new Promise((resolve) => {
      let parsedHost = parsedCreds.hostname;
      let userAuth = parsedCreds.isAuth;
      if (userAuth) {
        let url = 'https://' + parsedHost + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'submitPayPeriod'
          }),
        })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.is_auth) {
              //console.log(parsedRes)
              if (parsedRes.error) {
                alert(parsedRes.error_message);
                resolve(false);
              } else {
                resolve(true);
              }
            } else {
              alert('An error occured while fetching data.');
            }
          })
          .catch(error => alert(error));
      }
    })
  } catch (error) {
    alert('Failed to retrieve data.')
  }
}