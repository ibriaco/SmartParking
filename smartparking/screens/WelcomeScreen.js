import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, UIManager } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class WelcomeScreen extends Component {

  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.container}>

        <View style={styles.title}>
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold', }}>
            SmartParking
          </Text>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Simplify your life.
          </Text>
        </View>
        <View style={styles.middle}>
        </View>
        <View style={styles.bottom}>
          <Button
            title="Get Started"
            type="solid"
            buttonStyle={{ paddingHorizontal: widthPercentageToDP(16), paddingVertical: heightPercentageToDP(2), borderRadius: 25, backgroundColor: '#ffffff' }}
            titleStyle={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <Button
            title="Terms of Service"
            type="clear"
            buttonStyle={{ paddingHorizontal: widthPercentageToDP(18), paddingVertical: heightPercentageToDP(2), }}
            titleStyle={{ color: '#ffff', fontSize: 18 }}
          />
        </View>


      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: heightPercentageToDP(5),
  },
  title: {
    height: HEIGHT / 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    height: HEIGHT * (15 / 30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: HEIGHT / 6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})


