import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import Login from './screens/Login';
import Register from './screens/Register'
import Profile from './screens/Profile'
import HomePage from './screens/HomePage';
import WelcomeScreen from './screens/WelcomeScreen';

const RootStack = createStackNavigator(
  {
  Welcome: { screen: WelcomeScreen },
  Login: { screen: Login },
  Register: { screen: Register },
  Profile: { screen: Profile },
  Home: {screen: HomePage}  
  },
  {
  initialRouteName: 'Welcome',
  },
  );

const App = createAppContainer(RootStack);

export default App;

