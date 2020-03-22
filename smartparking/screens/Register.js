import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
import * as firebase from 'firebase'


import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

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
      return userCredentials.user.updateProfile({
        displayName: this.state.name
      })
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
      <View style={styles.signup}>
        <Block middle padding={[0, theme.sizes.base * 2]}>
          <Text center h1 bold>
          </Text>
          <Block middle>
          <View style = {styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
            <Input
              email
              label="Full Name"
              style={[styles.input]}
              onChangeText={name => this.setState({ name })}
              value = {this.state.name}
            />
            <Input
              label="Email Address"
              style={[styles.input]}
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
            <Block>
              <Text center gray2 h4>Already registered?
              <Text bold center secondary h3 onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
            </Block>
            <Button style = {styles.button} onPress={() => this.handleSignUp()}>
                <Text h2 bold white center>
                  Sign Up
                </Text>
            </Button>
            <Button onPress={() => navigation.navigate("Profile")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Terms of service
              </Text>
            </Button>
          </Block>
        </Block>
      </View>
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
    backgroundColor: '#0DB665',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 25
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
