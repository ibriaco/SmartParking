import React from "react";
import { StyleSheet } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";

import Navigation from "./navigation/index.js";
import { Block } from "./components";
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import FlashMessage from "react-native-flash-message";

import * as Font from 'expo-font';


const initialState = {
  allAreas: {
    latitude: 0,
    longitude: 0
  },
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
  currentCity: "",
  showRoute: false,
  darkTheme: false,
  isModalVisible: false,
  userData: {

  },
  mapRef: null
}
const reducer = (state = initialState, action) => {
  switch(action.type){
    case "UPDATE_MAP_REF": 
      return {
        ...state,
        mapRef: action.param};
    case "UPDATE_USER_DATA": 
      return {
        ...state,
        userData: action.param};
    case "UPDATE_MODAL_VISIBLE": 
      return {
        ...state,
        isModalVisible: action.param};
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
    case "UPDATE_ALL_AREAS": 
      return {
        ...state,
        allAreas: action.param};
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
    isLoadingComplete: false,
    isFontLoadingComplete: false
  };

  loadFonts = async () => {

    return Font.loadAsync({
  
    // Load a font `Montserrat` from a static resource
    'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Helvetica-Bold': require('./assets/fonts/Helvetica-Bold-Font.ttf'),
  });
}
  

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isFontLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
         
          startAsync={this.loadFonts}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isFontLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store = { store }>
      <Block white>
        <Navigation />
        <FlashMessage position="top" titleStyle={{fontFamily: 'Helvetica'}} textStyle={{fontFamily: 'Montserrat'}}/> 
      </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});


