import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions
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
    errorMessage: null,
    firstProgress: 0,
    secondProgress: 0,
    index: 0
  };

  handleSignUp() {

    if(this.state.name != ""){

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userCredentials => {
        userCredentials.user.updateProfile({
        displayName: this.state.name        
      })

      this.setState({ firstProgress: 1 });
      
      this.userView.slideOutLeft(300);
      
      setTimeout(() => {
          this.setState({index: 1})
      }, 300);
              
      this.setState({errorMessage: null})
      

    })
    .catch(error => this.setState({errorMessage: error.message}));

    /*
    if (this.state.errorMessage!=null){
      this.state.errorMessage = "Welcome" + this.state.name + "!"
    }
    */

    Keyboard.dismiss();
  }
  else{  
    this.setState({errorMessage: "Please insert your full name to continue."})
  }
  }

  render() {
    const { navigation } = this.props;

    return (

      
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.signup}
    >
      <Block middle padding={[0, theme.sizes.base * 2]}>
        
        <Animatable.View style={{flexDirection: "row", justifyContent: "space-between"}} animation="slideInRight" duration={800} delay={200}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} delay={200}>
             <Icon name="account" size={20} color="white"/>
          </Animatable.View>        

          <View style={{flex: 1, paddingTop: 16}}>
             <Progress.Bar progress={this.state.firstProgress}  width={null} color="rgba(3, 166, 150, 0.7)"/>
          </View> 

          {(this.state.index == 1 || this.state.index == 2) && <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800}>
             <Icon name="car" size={24} color="white"/>
          </Animatable.View>        
          }

          {this.state.index == 0 && <View style={styles.buttonCircle} ref={r => this.carView = r}>
             <Icon name="car" size={24} color="white"/>
          </View> 
          }
          
          <View style={{flex: 1,paddingTop: 16}}>
             <Progress.Bar progress={this.state.secondProgress}  width={null} color="rgba(3, 166, 150, 0.7)"/>
          </View> 


          {this.state.index == 2 && <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} >
             <Icon name="credit-card" size={24} color="white"/>
          </Animatable.View>        
          }

          {(this.state.index == 0 || this.state.index == 1) && <View style={styles.buttonCircle} ref={r => this.creditView = r}>
             <Icon name="credit-card" size={24} color="white"/>
          </View> 
        }

        </Animatable.View>



      {this.state.index == 0 &&
        
        <Animatable.View style={{flex: 1}} animation="slideInRight" duration={800} delay={600} ref={r => this.userView = r}>

        <Text h1 bold>
          </Text>
          <Text style = {{fontSize: 32, fontFamily: "Helvetica-Bold"}} >
          Register
          </Text>
          <Text gray2 h3 style={{fontFamily: "Montserrat"}}>Enter your information to sign up</Text>
          <Block middle>
          <View style = {styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
          </View>
          <Block middle>
            </Block>
            <Input
              placeholder="Full Name"
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
            <Block>
              <Text center gray2 h4 style={{fontFamily: "Montserrat"}}>Already registered?
              <Text  center secondary h3 style={{fontFamily: "Montserrat-Bold"}}onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
            </Block>
            <Block top>
            </Block>
            <Block top></Block>
            <Block top ></Block>
            <Button style = {styles.button} onPress={() => this.handleSignUp()}>
                <Text h2 white center style={{fontFamily: "Montserrat-Bold"}}>
                  Continue
                </Text>
            </Button>
            <Button onPress={() => navigation.navigate("VehicleSelection")}>
              <Text
                gray2
                caption
                center
                style={{ textDecorationLine: "underline", fontFamily: "Montserrat" }}
              >
                Terms of service
              </Text>
            </Button>
          </Block>
            </Animatable.View>

  }



  {this.state.index == 1 &&
  
  <Animatable.View style={{flex: 1}} animation="slideInRight" duration={300} ref={r => this.vehicleView = r}>

  <Text h1 bold>
    </Text>
    <Text style = {{fontSize: 32, fontFamily: "Helvetica-Bold"}}>
    Vehicle
    </Text>
    <Text gray2 h3 style={{fontFamily: "Montserrat"}}>Enter your vehicle information</Text>
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
        icon = "car"
        family="material-community"
        iconSize={24}
        iconColor="#a5a5a5"
        style={styles.input}
      />
      <Input
        placeholder ="Vehicle Plate"
        right
        icon="clipboard-text"
        family="material-community"
        iconSize={18}
        iconColor="#a5a5a5"
        style={styles.input}
        onChangeText={email => this.setState({ email })}
        value={this.state.email}
      />
      <Input
        icon="contact-mail"
        family="material-community"
        right
        iconColor ="#a5a5a5"
        iconSize = {20}
        placeholder="Driving License"
        style={[styles.input]}
        onChangeText={password => this.setState({ password })}
        value={this.state.password}
      />
      <Block>
        <Text center gray2 h4 style={{fontFamily: "Montserrat"}}>Already registered?
        <Text center secondary h3 style={{fontFamily: "Montserrat-Bold"}} onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
      </Block>
      <Block top>
      </Block>
      <Block top></Block>
      <Block top ></Block>
      <Button style = {styles.button} onPress={() => {

          this.setState({ secondProgress: 1 });
          this.vehicleView.slideOutLeft(300);
          setTimeout(() => {
            this.setState({index: 2})
          }, 300);
          }
          }>
          <Text h2 white center style={{fontFamily: "Montserrat-Bold"}}>
            Continue
          </Text>
      </Button>
      <Button onPress={() => navigation.navigate("PaymentSelection")}>
        <Text
          gray2
          h3
          center
          style={{fontFamily: "Montserrat-Bold"}}
        >
          SKIP
        </Text>
      </Button>
    </Block>
  </Animatable.View>

    }


  {this.state.index == 2 && 
        <Animatable.View style={{flex: 1}} animation="slideInRight" duration={300} ref={r => this.payView = r}>
        <Text h1 bold>
    </Text>
    <Text style = {{fontSize: 32, fontFamily: "Helvetica-Bold"}} >
    Payment
    </Text>
    <Text gray2 h3 style={{fontFamily: "Montserrat"}}>Enter your payment method</Text>
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
        <Text center gray2 h4 style={{fontFamily: "Montserrat"}}>Already registered?
        <Text center secondary h3 style={{fontFamily: "Montserrat-Bold"}} onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
      </Block>
      <Block top>
      </Block>
      <Block top></Block>
      <Block top ></Block>
      <Button style = {styles.button} onPress={() => navigation.navigate("Login")}>
          <Text h2  white center style={{fontFamily: "Montserrat-Bold"}}>
            Register
          </Text>
      </Button>
      <Button onPress={() => navigation.navigate("Login")}>
        <Text
          gray2
          h3
          center
          style={{fontFamily: "Montserrat-Bold"}}
        >
          SKIP
        </Text>
      </Button>
    </Block>
    </Animatable.View>
  }
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
    textAlign: "center",
    fontFamily: "Montserrat"
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(3, 166, 150, 0.7)'
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
