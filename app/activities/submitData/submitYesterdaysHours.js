import { AsyncStorage } from 'react-native';

export const _submitYesterdaysHours = async () => {
  try {
    let userCreds = await AsyncStorage.getItem('#authKey');
    let submittedForm = await AsyncStorage.getItem('#yesterdayFormKey')  
    let unparsedYesterdaysData = await AsyncStorage.getItem('#yesterdaysDataKey')

    let parsedCreds = JSON.parse(userCreds);
    let yesterdaysData = JSON.parse(unparsedYesterdaysData)
    let parsedYesterdayForm = JSON.parse(submittedForm);

    return new Promise((resolve) => {
      let parsedHost = parsedCreds.hostname;
      let userAuth = parsedCreds.isAuth;
      if (userAuth) {
        let idslin = yesterdaysData.data.timecard_items[0].idslin_personnel;
        let url = 'https://' + parsedHost + '.lojix.com/mobile/mobile_api';
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p: 'saveYesterdaysHours',
            comment: parsedYesterdayForm.comments,
            timecard_items: [{
              idslin_personnel: idslin,
              time: {
                hours: parsedYesterdayForm.hours
              },
              missed_time: parsedYesterdayForm.comments
            }]
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