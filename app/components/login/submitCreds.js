import React from 'react';
import { View } from 'react-native';

// library components
import { Button } from 'react-native-elements';

export default (props) => {
  return (
    <View>
      <Button
        title="Submit"
        onPress={props.onGetCreds}
        iconRight={{name: 'check', type: 'entypo'}}
        buttonStyle={{
					top: 25,
          backgroundColor: 'green',
          width: 200,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
					borderRadius: 5,
        }}
      />
    </View>
  );
}