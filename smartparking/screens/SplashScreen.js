import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, StyleSheet, View, Animated, Image } from 'react-native'
import LottieView from 'lottie-react-native';

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
        return (
          <View style={styles.container}>
          <Image style={styles.image} source={require('../assets/animations/title.gif')} />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38BC7C',
      flexDirection: 'column',
      alignItems: 'center'
    },
    titleLeft: {
      fontFamily: 'sans-serif',
      fontSize: wp(13),
      fontWeight: 'bold',
      color: '#212121'
    },
    titleRight: {
      fontFamily: 'sans-serif',
      fontSize: wp(13),
      fontWeight: 'bold',
      color: '#009688'
  
    },
    subtitle: {
      fontFamily: 'sans-serif',
      fontSize: wp(6),
      fontWeight: 'normal',
      color: '#BDBDBD',
    },
    logo: {
      flex: 10,
      padding: hp(10),
      alignItems: 'center',
      //justifyContent: 'flex-start'
    },
    buttons: {
      flex: 0.35,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      borderRadius: hp(2),
      padding: hp(4.5)
    },
    image: {
      width: 300,
      height: 200,
      
    }
  });
