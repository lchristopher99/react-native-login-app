import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

// screens
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';

export const SignedOut = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SignedIn = createStackNavigator({
  Home: {
    screen: Home
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
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
