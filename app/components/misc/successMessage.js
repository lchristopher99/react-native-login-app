import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// imported libraries
import { Icon } from 'react-native-elements';

export default props => {
  const { hidden, message, type, name, color, messageColor, messageSize } = props;
  if (hidden) {
    return null;
  }
  return (
    <View style={styles.submittedContainer}>
      <Icon
        type={type}
        name={name}
        color={color}
        iconStyle={styles.iconStyle}
      />
      <Text style={{ color: messageColor, fontSize: messageSize }}>{message}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  submittedContainer: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center'
  },
  iconStyle: {
    fontSize: 40,
    textAlign: 'center',
    right: 10
  },
  iconText: {
    fontSize: 15
  }
});