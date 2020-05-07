
import React from "react";
import { Image, View } from "react-native";
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
import Test from "../screens/Test";
import Payment from "../screens/Payment";
import CardPage from "../screens/CardPage";
import Reports from "../screens/Reports";
import Details from "../screens/Details";
import VehicleSelection from "../screens/VehicleSelection"
import PaymentSelection from "../screens/PaymentSelection"

import { theme } from "../constants";
import { SearchBar, ThemeConsumer } from "react-native-elements";
import { zoomOut, zoomIn } from 'react-navigation-transitions';
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
    Test: {
      screen: Test,
      navigationOptions: {
        header: null,
      }
    },
    Login: {
      screen: Login,
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
      headerStyle: {
        height: theme.sizes.base * 6,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
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
    VehicleSelection: {
      screen: VehicleSelection,
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
    PaymentSelection: {
      screen: PaymentSelection,
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
    Home: {
      screen: createBottomTabNavigator({
        Home: {
          screen: HomePage,

          navigationOptions: {
            tabBarIcon: ({ focused }) => <FontAwesome5 name="map" size={28} color={focused ? "#000" : "#CDCCCE"} />
          }
        },
        
        Parkings: {
          screen: Parkings,
          navigationOptions: {
            tabBarIcon: ({ focused }) => <FontAwesome5 name="parking" size={28} color={focused ? "#000" : "#CDCCCE"} />
          }
        },

        Filter: {
          screen: Filter,
          navigationOptions: {
            tabBarIcon: ({ focused }) => <FontAwesome5 name="sliders-h" size={28} color={focused ? "#000" : "#CDCCCE"} />
          }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
              tabBarIcon: ({ focused }) => <FontAwesome5 name="user" size={28} color={focused ? "#000" : "#CDCCCE"} />,
              backgroundColor: "#03A696",
              height: theme.sizes.base * 6,
            }
          },
        
        Wallet: {
          screen: Payment,
          navigationOptions: {
          tabBarIcon: ({ focused }) => <FontAwesome5 name="credit-card" size={28} color={focused ? "#000" : "#CDCCCE"} />,
        }
        },

      },
        {
          tabBarOptions: {
            showLabel: false,
            elevation: 0,
            borderBottomColor: "#fff",
          }
        }
      ),
      navigationOptions: {
        header: null
      },

    },

  },

  {
    transitionConfig: () => zoomOut(),
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



const AppSwitchNavigator = createSwitchNavigator({
  Splash: { screen: screens },
  Dashboard: { screen: HomePage }
});


export default createAppContainer(screens);
