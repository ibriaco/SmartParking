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
            
            <Animatable.Image animation="bounceIn" duration={3000} delay={1000} source={require('../assets/icons/car_marker.png')} style={styles.logo} onAnimationEnd={()=>navigation.navigate("Welcome")}/>
            <Image style={styles.title} source={require('../assets/animations/title.gif')} />
          
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      flexDirection: 'column',
      alignItems: 'center'
    },
    logo: {
      width: 80,
      height: 80,
      position: 'absolute',
      top: 250
    },
    title: {
      width: 300,
      height: 200,
      position: 'absolute',
      top: 250,
      left: 50
    }
  });
