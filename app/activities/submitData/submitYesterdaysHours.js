import { AsyncStorage } from 'react-native';

export const _submitYesterdaysHours = async () => {
  try {
    let userHost = await AsyncStorage.getItem('#hostKey');
    let userAuth = await AsyncStorage.getItem('#authKey');
    let submittedForm = await AsyncStorage.getItem('#yesterdayFormKey')  
    let unparsedIdslin = await AsyncStorage.getItem('#idslinKey') 

    let idslin = JSON.parse(unparsedIdslin)    
    let parsedYesterdayForm = JSON.parse(submittedForm);
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