import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, UIManager, KeyboardAvoidingView } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import {Button} from 'react-native-elements'
import {Input} from 'galio-framework'
import Icon from 'react-native-vector-icons/FontAwesome';

/* NEED TO SET NAVIGATION ON THE FOLLOWING:
- Sign in --> redirects to home page
- Login with Facebook/Google --> redirects to Facebook/Google and then into home page
- Sign up --> redirects to Register page
*/
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
export default class WelcomeScreen extends Component {

  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <ScrollView scrollEnabled={false}>
      <ImageBackground source={require('../assets/background.png')} style={styles.container}>

        <View style={styles.title}>
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold', paddingBottom: heightPercentageToDP(2) }}>
            Login
          </Text>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Access your account
          </Text>
        </View>
        <View style = {styles.middle}>
          <View style = {styles.inputBox}>
            <Input label="Email Address"></Input>
            <Input label ="Password" iconColor="#BDBDBD" password viewPass></Input>
            <Button
              title="Sign In"
              type="solid"
              buttonStyle = {{ paddingHorizontal: widthPercentageToDP(18), paddingVertical: heightPercentageToDP(2), borderRadius: 25, backgroundColor: '#009688'}}
              titleStyle = {{color: '#fff'}}
              onPress = {()=>this.props.navigation.navigate('Home')}
            />
            <View style = {{justifyContent: 'center'}}>
            <Button
                title = "  Login with Google"
                type = "clear"
                titleStyle = {{color: '#009688'}}
                icon = {
                  <Icon
                    name = "google-plus-square"
                    size = {30}
                    color = "#db4a39"
                  />
                }
              />
             <Button
                title = " Login with Facebook"
                type = "clear"
                titleStyle = {{color: '#009688'}}
                icon = {
                  <Icon
                    name = "facebook-square"
                    size = {30}
                    color = "#3b5998"
                  />
                }
              />
            </View>
          </View>
        </View>
        <View style = {styles.bottom}>
          <Text style = {{fontSize: 18, color: '#fff'}}>Don't have an account?</Text>  
          <Button title="Sign Up" type="clear" titleStyle = {{color: '#212121', fontWeight: 'bold', fontSize: 18}}
            onPress = {()=>this.props.navigation.navigate('Register')}
          />
        </View>

      </ImageBackground>
      </ScrollView>
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  middle: {
    height: HEIGHT * (3/5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    height: HEIGHT * (19/30) - 50,
    width: WIDTH - 70,
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff', 
    
  },
  bottom: {
    height: HEIGHT / 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: heightPercentageToDP(5)
  },
  icons: {
    justifyContent: 'space-between',
  }
})