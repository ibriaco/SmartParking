import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

const VALID_EMAIL = "";
const VALID_PASSWORD = "";

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push("email");
    }
    if (password !== VALID_PASSWORD) {
      errors.push("password");
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Home");
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <View style={styles.login}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text center h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email Address"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
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
              <Text center gray2 h4>you can also login with</Text>
              <Text></Text>
              <View style = {styles.social}>
              <Button style = {styles.facebook}>
              <Text white h3>Facebook</Text>
              </Button>
              <Text center gray2 h4>  or  </Text>
              <Button style = {styles.google}>
                <Text white h3>Google</Text>
              </Button>
              
              </View>
              
              
            </Block>
            
          </Block>
          <Block bottom style = {styles.bottom}>
            <Button style = {styles.button} onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text h3 bold white center>
                  Login
                </Text>
              )}
            </Button>

              <Text
                gray
                h4
                center
              >
                or <Text
                h3 bold secondary onPress={() => navigation.navigate("Register")}
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
    borderRadius: 18,
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
    height: 30,
    width: 80,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  facebook:{
    backgroundColor: '#3b5998',
    height: 30,
    width: 80,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  forget: {
    height: 3,
  }
});
