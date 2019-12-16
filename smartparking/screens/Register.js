import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, UIManager, KeyboardAvoidingView } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'
import {Input} from 'galio-framework'
import Icon from 'react-native-vector-icons/FontAwesome';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class Register extends Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <ScrollView flex={1} >
      <ImageBackground source={require('../assets/background.png')} style={styles.container}>
        <View style={styles.title}>
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold', paddingBottom: heightPercentageToDP(2) }}>
            Register
          </Text>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Create a new account
          </Text>
        </View>
        <View style={styles.middle}>
          <View style={styles.inputBox}>
            <Input label="Name" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
            <Input label="Surname" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
            <Input label="Email Address" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
            <Input label="Password" iconColor="#BDBDBD"  labelStyle={{ color: '#212121', opacity: 0.5 }} password viewPass></Input>
            <Button
              title="Sign Up" 
              type="solid"
              buttonStyle={{ paddingHorizontal: widthPercentageToDP(18), paddingVertical: heightPercentageToDP(2), borderRadius: 25, backgroundColor: '#009688' }}
              titleStyle={{ color: '#fff' }}
            />
            
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Already have an account?</Text><Button type="clear" title="Sign in" titleStyle={{ color: '#212121', fontWeight: 'bold', fontSize: 18 }} onPress = {()=>this.props.navigation.navigate('Login')}/>
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
    paddingVertical: heightPercentageToDP(3)
  },
  title: {
    height: HEIGHT / 5,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  middle: {
    height: HEIGHT * (3 / 5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: HEIGHT * (19 / 30) - 50,
    width: WIDTH - 70,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  bottom: {
    height: HEIGHT / 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icons: {
    justifyContent: 'space-between',
  }
})





























































































































































/*import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

export default class WelcomeScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.up}>
          <Icon
            name = "chevron-left"
            size = {widthPercentageToDP(5)}
            color = "#009688"
          />
          <Text style =
                      {{
                        fontFamily: 'sans-serif',
                        fontSize: widthPercentageToDP(10),
                        fontWeight: '700',
                        color: '#000000',
                      }}>Login</Text>
        <Text style =
                      {{
                        fontFamily: 'sans-serif',
                        fontSize: widthPercentageToDP(5),
                        fontWeight: 'normal',
                        color: '#009688',
                      }}>Please login to continue.</Text>
        </View>

        <View style={styles.bot}>
          <Input rightIcon={
            <Icon name ="envelope"
                  color = "#A9A9A9A9"
                  size = {widthPercentageToDP(5)}

            />
          } labelStyle = {{fontFamily:'sans-serif', fontWeight:'normal', fontSize: widthPercentageToDP(4), color:'#009688'}} label = "Your Email Address" placeholder="email@address.com"></Input>
          <Input rightIcon={
            <Icon name ="lock"
                  color = "#A9A9A9A9"
                  size = {widthPercentageToDP(6)}

            />
          } labelStyle = {{fontFamily:'sans-serif',  fontWeight:'normal', fontSize: widthPercentageToDP(4), color:'#009688'}} label = "Password" placeholder="Password"></Input>
          <Button
          title="Login"
          buttonStyle = {{backgroundColor: '#009688', paddingHorizontal: widthPercentageToDP(10), padding:heightPercentageToDP(1), borderRadius: widthPercentageToDP(2)}}
        />
        </View>


      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    marginHorizontal: widthPercentageToDP(10),
    marginVertical: heightPercentageToDP(10)
  },
  up: {
    flex: 0.6,
    flexDirection: 'column',
    backgroundColor: '#ffff',
    justifyContent: 'flex-start',
    //alignItems: 'center'
  },
  mid: {
    flex: 0.5,
    justifyContent: 'space-evenly',
  },
  bot: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around'
  }


})*/
