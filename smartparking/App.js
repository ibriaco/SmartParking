import React from "react";
import { StyleSheet } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation/index.js";
import { Block } from "./components";
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import FlashMessage from "react-native-flash-message";


const initialState = {
  areas: {
    latitude: 0,
    longitude: 0
  },
  tappedArea: {
    latitude: 0,
    longitude: 0
  },
  userCoordinates:{
    latitude: 0,
    longitude: 0
  },
  currentCity: "Milan",
  showRoute: false,
  darkTheme: false
}
const reducer = (state = initialState, action) => {
  switch(action.type){
    case "UPDATE_DARK_THEME": 
      return {
        ...state,
        darkTheme: action.param};
    case "UPDATE_SHOW_ROUTE": 
      return {
        ...state,
        showRoute: action.param};
    case "UPDATE_CURRENT_CITY": 
      return {
        ...state,
        currentCity: action.param};
    case "UPDATE_COORDINATES": 
      return {
        ...state,
        userCoordinates: action.param};
    case "UPDATE_AREA": 
      return {
        ...state,
        areas: action.param};
    case "UPDATE_TAPPED_AREA": 
      return {
        ...state,
        tappedArea: action.param};

  }
  return state;
}

const store = createStore(reducer)

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
        <FlashMessage position="top" /> 
      </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});


