import React from 'react';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

// custom components
import { Icon } from 'react-native-elements';

// screens
import Login from './screens/LoginScreen';
import Today from './screens/TodayScreen';
import Yesterday from './screens/YesterdayScreen';
import PayPeriod from './screens/PayPeriodScreen';

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login
  }
}, 
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SignedIn = createDrawerNavigator({
  Today: {
    screen: Today,
    navigationOptions: {
      drawerIcon: () => <Icon name='home' size={24} color='#000' />
    }
  },
  Yesterday: {
    screen: Yesterday,
    navigationOptions: {
      drawerIcon: () => <Icon name='today' size={24} color='#000' />
    }
  },
  PayPeriod: {
    screen: PayPeriod,
    navigationOptions: {
      drawerIcon: () => <Icon name='attach-money' size={24} color='#000' />
    }
  },
  LogOut: {
    screen: SignedOut, // change this to onItemPress
    navigationOptions: {
      drawerIcon: () => <Icon name='logout' type='simple-line-icon' size={20} color='#000' />
    }
  }
}, 
  {
    drawerWidth: 300,
    contentOptions: {
      itemStyle: {
        right: 30
      },
      iconContainerStyle: {
        left: 25
      },
      activeTintColor: '#ABC72E'
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    { // if signedIn is true, return SignedIn, else return SignedOut
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
