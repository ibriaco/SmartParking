import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native'
import {AntDesign, Entypo, FontAwesome} from "@expo/vector-icons";


export default class DrawerButton extends Component {
    animation = new Animated.Value(0)

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 5
        }).start();

        this.open = !this.open;
    };

    render() {
        const rotation = {
            transform : [
                {
                  rotate: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })  
                }
            ]
        };

        return (
            <View style = {[styles.container, this.props.style]}>

                <TouchableWithoutFeedback>
                    <Animated.View style = {[styles.button, styles.secondary]}>
                        <AntDesign name = "heart" size = {20} color = "#0DB665"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style = {[styles.button, styles.secondary]}>
                        <Entypo name = "thumbs-up" size = {20} color = "#0DB665"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style = {[styles.button, styles.secondary]}>
                        <Entypo name = "location-pin" size = {20} color = "#0DB665"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress = {this.toggleMenu}>
                    <Animated.View style = {[styles.button, styles.menu, rotation]}>
                        <FontAwesome name = "bars" size = {26} color = "#000"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute"
    },
    button:{
        position: "absolute",
        top: 30,
        //bottom: 20,
        //right: 150,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 18,
        shadowColor: "#FFF",
        shadowOpacity: 0.3,
        shadowOffset: {height: 10}
    },
    menu:{
        backgroundColor:"rgba(255,255,255,1)"
    },
    secondary:{
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        //backgroundColor: "#FFF"
    }
})
