import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// imported libraries
import { Icon } from 'react-native-elements';

export default HiddenView = props => {
  const { hidden, message } = props;
  if (hidden) {
    return null;
  }
  return (
    <View style={styles.submittedContainer}>
      <Icon
        type='ionicon'
        name='ios-checkmark-circle-outline'
        iconStyle={styles.iconStyle}
      />
      <Text style={styles.iconText}>{message}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  submittedContainer: {
    flexDirection: 'row'
  },
  iconStyle: {
    fontSize: 40,
    color: 'green',
    textAlign: 'center'
  },
  iconText: {
    fontSize: 15,
    color: 'green',
    textAlign: 'center',
    top: 10,
    left: 10
  }
});