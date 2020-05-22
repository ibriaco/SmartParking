import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, StyleSheet, View, Animated, Image } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { theme, mocks } from "../constants";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
    }

  }

    render() {
      const { navigation } = this.props;

        return (
          <View style={styles.container}>
            <View style={styles.container2}>
            <Animatable.Image animation="fadeInRight" duration={2000} delay={0} source={require('../assets/logo/logoP.png')} style={styles.logo} />

            <Animatable.Image animation="fadeIn" duration={1500} delay={900} source={require('../assets/logo/logoText.png')} style={styles.image} onAnimationEnd={() => this.props.navigation.navigate("Welcome")}/>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center'
    },
    container2: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center'
    },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },
    image: {
      width: 280,
      height: 280,
      resizeMode: 'contain',
    },
  });
