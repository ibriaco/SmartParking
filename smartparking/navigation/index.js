
import React from "react";
import { Image, View, Text } from "react-native";
import * as firebase from 'firebase';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { FontAwesome5 } from 'react-native-vector-icons';

import SplashScreen from "../screens/SplashScreen";
import Parkings from "../screens/Parkings";
import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomePage from "../screens/HomePage";
import Profile from "../screens/Profile";
import Filter from "../screens/Filter";
import ParkingsContainer from "../screens/ParkingsContainer";
import Payment from "../screens/Payment";
import CardPage from "../screens/CardPage";
import Reports from "../screens/Reports";
import Details from "../screens/Details";
import PurchaseProduct from "../screens/PurchaseProduct";
import Paypal from "../screens/Paypal";

import { theme } from "../constants";
import { SearchBar, ThemeConsumer } from "react-native-elements";
import { zoomOut, zoomIn, fromRight, fromLeft, fadeIn, fadeOut } from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


var firebaseConfig = {
  apiKey: "AIzaSyDrUppJZiKvyUvcLUau9iUsDKcZJIGLZuQ",
  authDomain: "smartparking-19214.firebaseapp.com",
  databaseURL: "https://smartparking-19214.firebaseio.com",
  projectId: "smartparking-19214",
  storageBucket: "smartparking-19214.appspot.com",
  messagingSenderId: "663247712461",
  appId: "1:663247712461:web:6e8d3ad439233bdb4a7984",
  measurementId: "G-L5G3YNNYH4"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

//firebase.analytics();


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  
  return zoomOut();
}

const screens = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Purchase: {
      screen: PurchaseProduct,
      navigationOptions: {
        header: null
      }
    },
    Paypal: {
      screen: Paypal,
      navigationOptions: {
        header: null
      }
    },
    ParkingsContainer: {
      screen: ParkingsContainer,
      navigationOptions: {
        header: null,
      }
    },
    Parkings: {
      screen: Parkings,
      navigationOptions: {
        header: null,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {        
        header: null
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerTitleStyle: {
          textAlign: "center",
          flex: 1,
          fontSize: 26,
          fontWeight: 'bold',
        },
        headerRight: (<View />)
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
    Filter: {
      screen: Filter,
      navigationOptions: {
        header: null
      }
    },
    CardPage: {
      screen: CardPage,
      navigationOptions: {
        header: null
      }
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        header: null
      }
    },
    Reports: {
      screen: Reports,
      navigationOptions: {
        header: null
      }
    },    
    Details: {
      screen: Details,
      navigationOptions: {
        header: null
      }
    },
    
    Home: {
      screen: HomePage,
      navigationOptions: {
        header: null
      }

    },

  },

  {
    transitionConfig: (screens) => handleCustomTransition(screens),
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: "#fff", // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Icon name="chevron-left" color="#000" size={32} />,
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
