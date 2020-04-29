import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import * as firebase from 'firebase'
import * as Facebook from "expo-facebook";
import * as Constants from "expo-constants";
import * as Google from 'expo-google-app-auth';


import { Button, Block, Text } from "../components";
import { theme } from "../constants";
import { SocialIcon } from 'react-native-elements'

import { Input, Icon } from "galio-framework"
import * as Animatable from 'react-native-animatable';


 

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch(error => this.setState({ errorMessage: error.message }));
      //this.props.navigation.navigate("Home")

    Keyboard.dismiss();
  }



    _loginWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:"663247712461-6phn0s7ga57vlqjmub2sf972npnutabt.apps.googleusercontent.com",
        iosClientId:"663247712461-se8kfcpofh6qr458l8u266no50h42dij.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
  
      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => this.props.navigation.navigate("Home"))
          .catch(error => {
            console.log("firebase cred err:", error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log("err:", err);
    }
  };


  _loginWithFacebook = async () => {
    const permissions = ["public_profile", "email"]; 
    await Facebook.initializeAsync("280118969668120");
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions
    });
    if (type == "success") {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credential) //signInWithReadCredential is deprecated!
        .then(() => this.props.navigation.navigate("Home"))
        .catch(error => this.setState({ errorMessage: error.message }));; 
    }
  };

  
  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.login}
    >
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
          </Text>
          <Text h1 bold>
          Login
          </Text>
          <Text gray2 h3>Enter your credentials to sign in</Text>
          <Block top>
            <View style={styles.errorMessage}>
              {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
            </View>
            <Block top>
            </Block>
            <Block top></Block>
            <Block top ></Block>
            <Block top>
            </Block>
            <Input
              placeholder ="Email Address"
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
              password
              viewPass
              iconColor ="#a5a5a5"
              iconSize = {20}
              placeholder="Password"
              style={[styles.input]}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Button style={styles.forget}>
              <Text
                gray2
                h4
                right
                style={{ textDecorationLine: "underline" }}>
                Forgot your password?
            </Text>
            </Button>

            <Text></Text>

          </Block>
          <Block bottom style={styles.bottom}>
          <View style={styles.social}>
            <Animatable.View animation="zoomIn" duration={700} delay={200}>
                <Button style={styles.google} onPress={()=>this._loginWithGoogle()} >
                  <SocialIcon
                    type="google"
                    light
                  />
                </Button>
                </Animatable.View>
                <Text center gray2 h4>      </Text>
            <Animatable.View animation="zoomIn" duration={700} delay={300}>

                <Button style={styles.facebook} onPress={()=>this._loginWithFacebook()}>
                  <SocialIcon
                    type="facebook"
                    light
                  />
                </Button>
                </Animatable.View>

              </View>
              <Animatable.View animation="slideInRight" duration={700} delay={400}>

            <Button style={styles.loginButton} onPress={()=>this.handleLogin()}>
              <Text h2 bold white center>
                Login
                </Text>
            </Button>
            </Animatable.View>

            <Animatable.View animation="slideInLeft" duration={700} delay={500}>

            <Button style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
              <Text h2 bold black center>
                Register
                </Text>
            </Button>
            </Animatable.View>

          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    height: 60
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  },
  loginButton: {
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 20,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
  },
  registerButton: {
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 16,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
  },
  bottom: {
    marginBottom: 30
  },
  signButton: {
    marginBottom: 40,
    height: 10
  },
  social: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  google: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    alignItems: 'center',
    borderRadius: 25,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
  },
  facebook: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    borderRadius: 25,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
  },
  forget: {
    height: 20,
    backgroundColor: "#fff"
  },
  error: {
    color: "#F14336",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  errorMessage: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  }
});

export default Login;