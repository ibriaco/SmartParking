import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";

import * as firebase from 'firebase'

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate("Home"))
    .catch(error => this.setState({errorMessage: error.message}));
    
    
     
    Keyboard.dismiss();
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.login}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text center h1 bold>
          </Text>
          <Block middle>
          <View style = {styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
            <Input
              label="Email Address"
              style={[styles.input,]}
              onChangeText={email => this.setState({ email })}
              value = {this.state.email}
            />
            <Input
              secure
              label="Password"
              style={[styles.input]}
              onChangeText={password => this.setState({ password })}
              value = {this.state.password}
            />
            <Button style = {styles.forget}>
            <Text 
            gray 
            h4 
            right
            style={{ textDecorationLine: "underline" }}>
              Forgot your password?
            </Text>
            </Button>
            
            <Text></Text>
            <Block >
              <Text></Text>
              <Text center gray2 h4>you can also login with</Text>
              
              <View style = {styles.social}>
              <Button style = {styles.facebook}>
              <Text bold white h3>Facebook</Text>
              </Button>
              <Text center gray2 h4>    </Text>
              <Button style = {styles.google}>
                <Text bold white h3>Google</Text>
              </Button>
              
              </View>
              
              
            </Block>
            
          </Block>
          <Block bottom style = {styles.bottom}>
            <Button style = {styles.button} onPress={() => this.handleLogin()}>
                <Text h2 bold white center>
                  Login
                </Text>
            </Button>

              <Text
                gray
                h4
                center
              >
                or <Text
                h2 bold secondary onPress={() => navigation.navigate("Register")}
                >Sign up</Text>
              </Text>
              </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#ffffff'
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
    backgroundColor: '#0DB665',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 25
  },
  bottom: {
    marginBottom: 30
  },
  signButton: {
    marginBottom: 40,
    height: 10
  },
  social:{
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  google:{
    backgroundColor: '#db4a39',
    height: 40,
    width: 100,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  facebook:{
    backgroundColor: '#3b5998',
    height: 40,
    width: 100,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  forget: {
    height: 3,
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
  }
});
