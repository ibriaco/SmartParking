/*import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import Login from './screens/Login';
import Register from './screens/Register'
import Profile from './screens/Profile'
import HomePage from './screens/HomePage';
import WelcomeScreen from './screens/WelcomeScreen';

const RootStack = createStackNavigator(
  {
  Welcome: { screen: WelcomeScreen },
  Login: { screen: Login },
  Register: { screen: Register},
  Profile: { screen: Profile },
  Home: {screen: HomePage}  
  },
  {
  initialRouteName: 'Welcome',
  },
  );

const App = createAppContainer(
  createBottomTabNavigator(
    {
      Welcome: {screen: WelcomeScreen, 
      navigationOptions: {
        tabBarVisible: false,
      }},
      Login: { screen: Login, 
        navigationOptions: {
          tabBarVisible: false,
        } },
      Register: { screen: Register, 
        navigationOptions: {
          tabBarVisible: false,
        }},
      Profile: { screen: Profile },
      Home: {screen: HomePage} 
    },
)
);

export default App;*/

import React from "react";
import { StyleSheet } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation/index.js";
import { Block } from "./components";
import { Provider } from 'react-redux';

import configureStore from './store/store';

const store = configureStore()

// import all used images
const images = [
  require("./assets/icons/back.png"),
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store = { store }>
      <Block white>
        <Navigation />
      </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});


