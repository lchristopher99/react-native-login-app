import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';

const fetchlocation = props => {
  return (
    <View style={styles.container}>
      <Button
        title="Get Location"
        onPress={props.onGetLocation}
        icon={{name: 'location-arrow', type: 'font-awesome'}}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    zIndex: 1,
    alignItems: 'center',
    top: 100
  }
});

export default fetchlocation;
