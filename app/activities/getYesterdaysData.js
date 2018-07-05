import { AsyncStorage } from 'react-native';

export const _getYesterdaysData = async () => {
  try {
    let userHost = await AsyncStorage.getItem('#hostKey');
    let userAuth = await AsyncStorage.getItem('#authKey');
    let dataUser = await AsyncStorage.getItem('#dataUser');
    let dataPass = await AsyncStorage.getItem('#dataPass');

    let parsedAuth = JSON.parse(userAuth);
    let parsedHost = JSON.parse(userHost);
    let parsedUser = JSON.parse(dataUser);
    let parsedPass = JSON.parse(dataPass);

    return new Promise((resolve) => {
      if (parsedAuth) {
        let url = 'https://' + parsedHost + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'getYesterdaysData',
            username: parsedUser,
            password: parsedPass
          }),
        })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.is_auth) {
              //console.log(parsedRes);
              AsyncStorage.setItem('#yesterdaysData', JSON.stringify(parsedRes));
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