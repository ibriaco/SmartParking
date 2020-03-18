
import React from "react";
import { Image, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import SplashScreen from "../screens/SplashScreen";

import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomePage from "../screens/HomePage";
import Profile from "../screens/Profile";
import Filter from "../screens/Filter";

import { theme } from "../constants";
import { Button } from "../components";
import { SearchBar, ThemeConsumer } from "react-native-elements";
import SearchHeader from "../components/SearchHeader";



const screens = createStackNavigator(
  {
    Splash:{
      screen: SplashScreen,
      navigationOptions:{
        header: null
      }
    },
    Welcome:{
      screen: WelcomeScreen,
      navigationOptions:{
        header: null
      }
    },
    Login:{
      screen: Login,
      navigationOptions: {
        title: 'Login',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontSize: 26,
          fontWeight: 'bold'
        },
        headerRight: (<View />)
      },
    },
    Register:{
      screen: Register,
      navigationOptions: {
        title: 'Sign Up',
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontSize: 26,
          fontWeight: 'bold',
        },
        headerRight: (<View />)
      },
    },
    Profile:{
      screen: Profile,
      navigationOptions: {
        header: <SearchBar
          containerStyle = {{marginTop: 40, backgroundColor: theme.colors.white}}
          style = {{marginTop: 400, paddingTop: 400}}
        />,
      },
      headerStyle: {
        height: theme.sizes.base * 6,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
    },
    Filter:{
      screen: Filter,
      navigationOptions: {
        header: null
      }
    },
    Home:{
      screen: HomePage,
      navigationOptions: {
        header: null
      },
      
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 6,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")}/>,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base,
        paddingRight: theme.sizes.base
      },
    }
  }
);

export default createAppContainer(screens);
