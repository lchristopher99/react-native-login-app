import React from 'react';
import { createStackNavigator, createDrawerNavigator, NavigationActions } from 'react-navigation';

// custom components
import { Icon } from 'react-native-elements';
import HamburgerMenu from './components/misc/hamburgerMenu';

// screens
import LoginScreen from './screens/LoginScreen';
import TodayScreen from './screens/TodayScreen';
import YesterdayScreen from './screens/YesterdayScreen';
import PayPeriodScreen from './screens/PayPeriodScreen';
import LogOutScreen from './screens/LogOutScreen';

export const DrawerNav = createDrawerNavigator({
  Today: {
    screen: TodayScreen,
    navigationOptions: {
      drawerIcon: () => <Icon name='home' size={24} color='#000' />
    }
  },
  Yesterday: {
    screen: YesterdayScreen,
    navigationOptions: {
      drawerIcon: () => <Icon name='today' size={24} color='#000' />
    }
  },
  PayPeriod: {
    screen: PayPeriodScreen,
    navigationOptions: {
      drawerIcon: () => <Icon name='attach-money' size={24} color='#000' />,
      title: 'Pay Period'
    }
  },
  LogOut: {
    screen: LogOutScreen, 
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
      activeTintColor: '#ABC72E',
      onItemPress: () => console.log('item pressed!')
    }
  }
);

export const rootNav = createStackNavigator({
  SignedOut: {
    screen: createStackNavigator({
      Login: {
        screen: LoginScreen
      }
    }, { headerMode: 'none' })
  },
  SignedIn: {
    screen: createStackNavigator({
      Drawer: {
        screen: DrawerNav,
        navigationOptions: ({ navigation }) => ({
          title: 'LOJIX',
          headerTintColor: '#ABC72E',
          headerStyle: { backgroundColor: '#154576' },
          headerLeft: <HamburgerMenu navigate={navigation} />
        })
      }
    })
  }
},
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'SignedIn'
  }
);