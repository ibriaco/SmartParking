import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  View,
  KeyboardAvoidingView
} from "react-native";
import * as firebase from 'firebase'

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Animatable from 'react-native-animatable';

import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import {Input} from "galio-framework"

export default class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null
  };

  handleSignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userCredentials => {
        userCredentials.user.updateProfile({
        displayName: this.state.name        
      })
      this.props.navigation.navigate("Home");
    })
    .catch(error => this.setState({errorMessage: error.message}));

    /*
    if (this.state.errorMessage!=null){
      this.state.errorMessage = "Welcome" + this.state.name + "!"
    }
    */

    Keyboard.dismiss();

  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.signup}
    >
        <Block middle padding={[0, theme.sizes.base * 2]} >

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={styles.selectedButtonCircle}>

          <Icon name="account" size={20} color="white" onPress={() => navigation.navigate("Register")}/>
        </View>
        

        <View style={{flex: 1, paddingTop: 16}}>
          <Progress.Bar progress={1}  width={null} color="rgba(3, 166, 150, 0.7)"/>
        </View> 

        <View style={styles.selectedButtonCircle}>

          <Icon name="car" size={24} color="white"  onPress={() => navigation.navigate("VehicleSelection")}/>
        </View>

        <View style={{flex: 1, paddingTop: 16}}>
          <Progress.Bar progress={1}  width={null} color="rgba(3, 166, 150, 0.7)" />
        </View> 
      <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} delay={200}>

          <Icon name="credit-card" size={20} color="white"/>
        </Animatable.View> 
        </View>
          
        <Text h1 bold>
          </Text>
          <Text style = {{fontSize: 32}} bold>
          Payment Method
          </Text>
          <Text gray2 h3>Enter your payment method</Text>
          <Block middle>
          <View style = {styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
          <Block middle>
            </Block>
            <Input
              placeholder="Vehicle Type"
              style={[styles.input]}
              onChangeText={name => this.setState({ name })}
              value = {this.state.name}
              right
              icon = "user"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
              style={styles.input}
            />
            <Input
              placeholder ="Vehicle Plate"
              right
              icon="envelope"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
              style={styles.input}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <Input
              iconColor ="#a5a5a5"
              iconSize = {20}
              placeholder="Driving License"
              style={[styles.input]}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Block>
              <Text center gray2 h4>Already registered?
              <Text bold center secondary h3 onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
            </Block>
            <Block top>
            </Block>
            <Block top></Block>
            <Block top ></Block>
            <Button style = {styles.button} onPress={() => navigation.navigate("Login")}>
                <Text h2 bold white center>
                  Register
                </Text>
            </Button>
            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray2
                h3
                center
                bold
              >
                SKIP
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  button:{
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 20,
    marginHorizontal: 25,
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,

  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  errorMessage: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    height: 60,
    shadowColor: "#a5a5a5"

    // borderBottomColor: theme.colors.gray2,
    //borderBottomWidth: StyleSheet.hairlineWidth
  },
  
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0,0)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  selectedButtonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(3, 166, 150, 0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
});
