import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, UIManager, KeyboardAvoidingView } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Button, Header } from 'react-native-elements'
import { Input, NavBar } from 'galio-framework'
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderBackButton } from 'react-navigation-stack';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;


export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    titleStyle: {
      color: '#000', 
      fontSize: 45, 
      fontWeight: 'bold',
    },
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
  },
  headerRight: (
    <View></View>
  ),
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView scrollEnabled={false}>
          <ImageBackground source={require('../assets/background.png')} style={styles.container}>
            
            <View style={styles.middle}>
              <View style={styles.inputBox}>
                <Input label="Name" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
                <Input label="Surname" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
                <Input label="Email Address" labelStyle={{ color: '#212121', opacity: 0.5 }}></Input>
                <Input label="Password" labelStyle={{ color: '#212121', opacity: 0.5 }} password viewPass></Input>
                <Button
                  title="Save"
                  type="solid"
                  buttonStyle={{ paddingHorizontal: widthPercentageToDP(18), paddingVertical: heightPercentageToDP(2), borderRadius: 25, backgroundColor: '#009688' }}
                  titleStyle={{ color: '#fff' }}
                />
              </View>
            </View>
            <View style={{ height: HEIGHT * (2 / 5) }}></View>
          </ImageBackground>
        </ScrollView>
        <View style={styles.footer}>
        <Icon
            name="home"
            size={25}
            style={{ color: '#000' }}
            onPress = {()=>this.props.navigation.navigate('Home')}
          />
          <Icon
            name="cog"
            size={25}
            style={{ color: '#000' }}
          />
          <Icon
            name="car"
            size={25}
            label="HELLO" 
            style={{ color: '#000' }}
            onPress = {this.getLocationHandler}
          />
          <Icon
            name="user-circle"
            size={25}
            style={{ color: '#000' }}
            onPress = {()=>this.props.navigation.navigate('Profile')}

          />
        </View>
      </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middle: {
    //height: HEIGHT * (3 / 5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: HEIGHT * (3 / 5) - 50,
    width: WIDTH - 70,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: heightPercentageToDP(1),
    backgroundColor: '#000',
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
