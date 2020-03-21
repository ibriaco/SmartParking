
import React from "react";
import { Image, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { FontAwesome5 } from 'react-native-vector-icons';

import SplashScreen from "../screens/SplashScreen";

import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomePage from "../screens/HomePage";
import Profile from "../screens/Profile";
import Filter from "../screens/Filter";
import ActionButton from 'react-native-circular-action-menu';
import Icone from 'react-native-vector-icons/Ionicons';
import { theme } from "../constants";
import { Button } from "../components";
import { SearchBar, ThemeConsumer } from "react-native-elements";
import SearchHeader from "../components/SearchHeader";
import { zoomOut, zoomIn } from 'react-navigation-transitions';

const tab = createBottomTabNavigator(
  {
    Map: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />,

      },
      title: 'Login',
      headerTitleStyle: {
        textAlign: "center",
        flex: 1,
        fontSize: 26,
        fontWeight: 'bold'
      },
      headerRight: (<View />)
    },
    List: {
      screen: Filter,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="heartbeat" size={24} color="#CDCCCE" />
      }
    },
    Add: {
      screen: Login,
      navigationOptions: {
        tabBarIcon: <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icone name="android-create" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
            <Icone name="android-notifications-none" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
            <Icone name="android-done-all" />
          </ActionButton.Item>

        </ActionButton>
      }
    },
    Filter: {
      screen: () => Login,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="band-aid" size={24} color="#CDCCCE" />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

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
    Login: {
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
    Register: {
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
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: <SearchBar
          containerStyle={{ marginTop: 40, backgroundColor: theme.colors.white }}
          style={{ marginTop: 400, paddingTop: 400 }}
        />,
      },
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
    Home: {
      screen: createBottomTabNavigator({
        Home: {
          screen: HomePage,
          
          navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="home" size={24} color="#CDCCCE" />
        }
        },
        Filter: {
          screen: Filter,
          navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="band-aid" size={24} color="#CDCCCE" />
        }
        },
        Add: {
          screen: Login,
          navigationOptions: {
            tabBarIcon: <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                <Icone name="android-create" />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => { }}>
                <Icone name="android-notifications-none" />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
                <Icone name="android-done-all" />
              </ActionButton.Item>
    
            </ActionButton>
          }
        },
        List: {
          screen: Filter,
          navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="heartbeat" size={24} color="#CDCCCE" />
        }
        },
        Profile: {
          screen: Profile,
            
          navigationOptions: {
            tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />,
            
        }
        }
      },
      {
        tabBarOptions: {
          showLabel: false
      }
      }
      ),
      navigationOptions: {
        header: null
      },
      
    },
    
  },
  
{
  transitionConfig: () => zoomIn(),
    defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 6,
        backgroundColor: theme.colors.white, // or 'white
          borderBottomColor: "transparent",
            elevation: 0 // for android
    },
    headerBackImage: <Image source={require("../assets/icons/back.png")} />,
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
