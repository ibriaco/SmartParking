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
import { connect } from 'react-redux';



class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
    firstProgress: 0,
    secondProgress: 0,
    index: 0,
    vehiclePlate: "",
    vehicleType: "",
    license: ""
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

      this.props.updateUserData({
        uid: userCredentials.user.uid,
        name: this.state.name,
        email: this.state.email,
        photoUrl: "none",
        points: 0,
        bonus: 0,
      });

    })
    .catch(error => this.setState({errorMessage: error.message}));

    Keyboard.dismiss();
    }
    else{  
      this.setState({errorMessage: "Please insert your full name to continue."})
    }
  }

  handleContinue() {

    if(this.state.vehicleType != "" && this.state.vehiclePlate != "" && this.state.license != ""){

      //all data inserted, proceed with the registration
      this.setState({ secondProgress: 1 });
      
      this.vehicleView.slideOutLeft(300);
      
      setTimeout(() => {
          this.setState({index: 2})
      }, 300);
              
      this.setState({errorMessage: null})
           
      this.props.updateUserData({
        ...this.props.userData,
        license: this.state.license,
        vehicle: {
          vehicleType: this.state.vehicleType,
          vehiclePlate: this.state.vehiclePlate
        }
      });
      
    Keyboard.dismiss();
    }
    else{  
      this.setState({errorMessage: "Please fill all the fields above to continue or skip this phase."})
    }
  }



  handleFinish() {


    var newData ={
      ...this.props.userData,
      payment: {
        paymentType: "paypal",
        paypayEmail: "nananan@bella.it"
      }
    };

    firebase.database().ref('Users/' + this.props.userData.uid).set(
      newData
    );

    this.props.updateUserData(newData);

    this.props.navigation.navigate("Home");

    
  }



  render() {
    const { navigation } = this.props;

    return (

      
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.signup}
    >
      <Block middle padding={[0, theme.sizes.base * 2]}>
      {this.state.index == 0 &&
        
        <Animatable.View style={{flex: 1}} animation="slideInRight" duration={800} delay={600} ref={r => this.userView = r}>

        <Text h1 bold>
          </Text>
          <Text style = {{fontSize: 32, fontFamily: "Helvetica-Bold"}} >
          Register
          </Text>
          <Text gray2 h3 style={{fontFamily: "Montserrat"}}></Text>
           
        <Animatable.View style={{flexDirection: "row", justifyContent: "space-between"}} animation="slideInRight" duration={800} delay={200}>
          <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} delay={200}>
             <Text h2>1</Text>
          </Animatable.View>
            <Text center caption style = {{top: 5}} secondary>Account</Text>
          </View>        

          <View style={{flex: 1, paddingTop: 16}}>
             <Progress.Bar progress={this.state.firstProgress} height = {null} width={null} color="rgba(0, 0, 0, 0.2)"/>
          </View> 

          {(this.state.index == 1 || this.state.index == 2) && 
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800}>
             <Icon name="car" size={24} color="white"/>
          </Animatable.View>        
          }

          {this.state.index == 0 && 
          <View style = {{flexDirection:"column"}}>
          <View style={styles.buttonCircle} ref={r => this.creditView = r}>
            <Text h2>2</Text>
          </View> 
          <Text center caption style = {{top: 5}}>Vehicle</Text>
        </View>
          }
          
          <View style={{flex: 1,paddingTop: 16}}>
             <Progress.Bar progress={this.state.secondProgress} height={null} width={null} color="rgba(0, 0, 0, 0.2)"/>
          </View> 


          {this.state.index == 2 && 
          <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} >
            <Text h2>3</Text>
          </Animatable.View> 
          <Text center caption style = {{top: 5}} secondary>Payment</Text>     
          </View>       
          }

          {(this.state.index == 0 || this.state.index == 1) && 
          <View style = {{flexDirection:"column"}}>
          <View style={styles.buttonCircle} ref={r => this.creditView = r}>
            <Text h2>3</Text>
          </View> 
          <Text center caption style = {{top: 5}}>Payment</Text>
        </View>
        }

        </Animatable.View>
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
            <Button onPress={() => navigation.navigate("ParkingsContainer")}>
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
    <Text gray2 h3 style={{fontFamily: "Montserrat"}}></Text>
     
    <Animatable.View style={{flexDirection: "row", justifyContent: "space-between"}} animation="slideInRight" duration={800} delay={200}>
      <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} delay={200}>
             <Text h2>1</Text>
          </Animatable.View>
          <Text center caption style = {{top: 5}}>Account</Text> 
          </View>        

          <View style={{flex: 1, paddingTop: 16}}>
             <Progress.Bar progress={this.state.firstProgress} height={null} width={null} color="rgba(3, 166, 150, 0.7)"/>
          </View> 

          {(this.state.index == 1 || this.state.index == 2) && 
         <View style = {{flexDirection:"column"}}>
         <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} >
           <Text h2>2</Text>
         </Animatable.View> 
         <Text center caption style = {{top: 5}} secondary>Vehicle</Text>     
       </View>        
          }

          {this.state.index == 0 && 
          <View style = {{flexDirection:"column"}}>
          <View style={styles.buttonCircle} ref={r => this.creditView = r}>
            <Text h2>2</Text>
          </View> 
          <Text center caption style = {{top: 5}} secondary>Vehicle</Text>
        </View>
          }
          
          <View style={{flex: 1,paddingTop: 16}}>
             <Progress.Bar progress={this.state.secondProgress} height={null} width={null} color="rgba(0, 0, 0, 0.2)"/>
          </View> 


          {this.state.index == 2 &&
          <View style = {{flexDirection:"column"}}>
            <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} >
              <Text h2>3</Text>
            </Animatable.View> 
            <Text center caption style = {{top: 5}} secondary>Payment</Text>     
          </View>  
          }

          {(this.state.index == 0 || this.state.index == 1) && 
          <View style = {{flexDirection:"column"}}>
          <View style={styles.buttonCircle} ref={r => this.creditView = r}>
            <Text h2>3</Text>
          </View> 
          <Text center caption style = {{top: 5}}>Payment</Text>
        </View>
        }

        </Animatable.View>
    <Block middle>
    <View style = {styles.errorMessage}>
      {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
    </View>
    <Block middle>
      </Block>
      <Input
        placeholder="Vehicle Type"
        style={[styles.input]}
        onChangeText={vehicleType => this.setState({ vehicleType })}
        value = {this.state.vehicleType}
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
        onChangeText={vehiclePlate => this.setState({ vehiclePlate })}
        value={this.state.vehiclePlate}
      />
      <Input
        icon="contact-mail"
        family="material-community"
        right
        iconColor ="#a5a5a5"
        iconSize = {20}
        placeholder="Driving License"
        style={[styles.input]}
        onChangeText={license => this.setState({ license })}
        value={this.state.license}
      />
      <Block>
        <Text center gray2 h4 style={{fontFamily: "Montserrat"}}>Already registered?
        <Text center secondary h3 style={{fontFamily: "Montserrat-Bold"}} onPress={() => navigation.navigate("Login")}> Sign In</Text></Text>
      </Block>
      <Block top>
      </Block>
      <Block top></Block>
      <Block top ></Block>
      <Button style = {styles.button} onPress={() => this.handleContinue()}>          
          <Text h2 white center style={{fontFamily: "Montserrat-Bold"}}>
            Continue
          </Text>
      </Button>
      <Button onPress={() => {
          this.setState({ secondProgress: 1 });
          this.vehicleView.slideOutLeft(300);
          setTimeout(() => {
            this.setState({index: 2})
          }, 300);
          }
          }>
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
    <Text gray2 h3 style={{fontFamily: "Montserrat"}}></Text>
     
    <Animatable.View style={{flexDirection: "row", justifyContent: "space-between"}} animation="slideInRight" duration={800} delay={200}>
        <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800} delay={200}>
             <Text h2>1</Text>
          </Animatable.View>   
          <Text center caption style = {{top: 5}}>Account</Text>
          </View>

          <View style={{flex: 1, paddingTop: 16}}>
             <Progress.Bar progress={this.state.firstProgress} height={null} width={null} color="rgba(3, 166, 150, 0.7)"/>
          </View> 

          {(this.state.index == 1 || this.state.index == 2) && 
          <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800}>
             <Text h2>2</Text>
          </Animatable.View>
            <Text center caption style = {{top: 5}}>Vehicle</Text>
          </View>        
          }

          {this.state.index == 0 && 
          <View style = {{flexDirection:"column"}}>
          <View style={styles.buttonCircle} ref={r => this.creditView = r}>
            <Text h2>2</Text>
          </View> 
          <Text center caption style = {{top: 5}}>Vehicle</Text>
        </View>
          }
          
          <View style={{flex: 1,paddingTop: 16}}>
             <Progress.Bar progress={this.state.secondProgress} height={null} width={null} color="rgba(3, 166, 150, 0.7)"/>
          </View> 


          {this.state.index == 2 && 
          <View style = {{flexDirection:"column"}}>
          <Animatable.View style={styles.selectedButtonCircle} animation="bounceIn" duration={800}>
             <Text h2>3</Text>
          </Animatable.View>
            <Text center caption style = {{top: 5}} secondary>Payment</Text>
          </View>         
          }

          {(this.state.index == 0 || this.state.index == 1) && 
          <View style = {{flexDirection:"column"}}>
            <View style={styles.buttonCircle} ref={r => this.creditView = r}>
              <Text h2>3</Text>
            </View> 
            <Text center caption style = {{top: 5}}>Payment</Text>
          </View>
        }

        </Animatable.View>
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
      <Button style = {styles.button} onPress={() => this.handleFinish()}>
          <Text h2  white center style={{fontFamily: "Montserrat-Bold"}}>
            Register
          </Text>
      </Button>
      <Button onPress={() => console.log(this.props.userData)}>
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
    borderRadius: 50,
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
    borderRadius: 50,
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
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  selectedButtonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'rgba(3, 166, 150, 0.7)'
  },

  
});


function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    isModalVisible: state.isModalVisible,
    userData: state.userData,

    allAreas: state.allAreas,
    darkTheme: state.darkTheme,
    showRoute: state.showRoute,
    areas: state.areas,
    tappedArea: state.tappedArea,
    currentCity: state.currentCity,
    userCoordinates: state.userCoordinates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateMapRef: (param) => dispatch({ type: "UPDATE_MAP_REF", param: param }),
    updateModalVisible: (param) => dispatch({ type: "UPDATE_MODAL_VISIBLE", param: param }),
    updateUserData: (param) => dispatch({ type: "UPDATE_USER_DATA", param: param }),
    updateAllAreas: (param) => dispatch({ type: "UPDATE_ALL_AREAS", param: param }),
    updateShowRoute: (param) => dispatch({ type: "UPDATE_SHOW_ROUTE", param: param }),
    updateCity: (param) => dispatch({ type: "UPDATE_CURRENT_CITY", param: param }),
    updateCoordinates: (param) => dispatch({ type: "UPDATE_COORDINATES", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);