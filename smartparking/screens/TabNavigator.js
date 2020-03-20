import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../components/Button";

const TabNavigator = createBottomTabNavigator(
    {
        Map: {
            screen: () => null,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
            }
        },
        List: {
            screen: () => null,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="heartbeat" size={24} color="#CDCCCE" />
            }
        },
        Add: {
            screen: () => null,
            navigationOptions: {
                tabBarIcon: <Button />
            }
        },
        Filter: {
            screen: () => null,
            navigationOptions: {
                tabBarIcon: () => <FontAwesome5 name="band-aid" size={24} color="#CDCCCE" />
            }
        },
        Profile: {
            screen: () => null,
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

export default createAppContainer(TabNavigator);