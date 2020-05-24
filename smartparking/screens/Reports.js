import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch, Divider } from "../components";
import * as Animatable from 'react-native-animatable';
import { Checkbox } from 'galio-framework';
import Modal from "react-native-modal";
import {Header, Left, Right, Body, Title, Footer, FooterTab} from 'native-base'
import * as firebase from 'firebase';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const { width } = Dimensions.get('screen');
var radio_props = [
  {label: "The price is different", value: 0 },
  {label: "The time is different", value: 1 },
  {label: "The road is unaccessible", value: 2 },
  {label: "The parking has been removed", value: 3 }

];

//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
      reportSent: false,
      value: 0
    }

  }

  async handleSend() {

    //show modal
    this.setState({ reportSent: true });

    //increment user points (in the local copy)
    //questo valore sarà quello collegato a PROGRESS della progressbar

    var newPoints = this.props.userData.points + 10;
    var newBonus = this.props.userData.bonus;

    if(newPoints == 100)  {
      newBonus = newBonus + 1;
      newPoints = 0;
    } else if (newPoints > 100)  {
      newBonus = newBonus + 1;
      newPoints = newPoints - 100;
    }              

    //update firebase data
    firebase.database().ref('Users/' + this.props.userData.uid).update({                
      bonus: newBonus,
      points: newPoints,        
    });

    //update local data
    var temp = {
      ...this.props.userData,
      bonus: newBonus,
      points: newPoints, 
    }
    
    this.props.updateUserData(temp);

    var index = this.props.allAreas.indexOf(this.props.tappedArea);
    
    await this.props.updateTappedArea({
      ...this.props.tappedArea,
      reports: radio_props[this.state.value].label

    })

    console.log(this.props.tappedArea)
      
      firebase.database().ref('Cities/' + this.props.currentCity + "/Areas/" + index).update({
                
        reports: radio_props[this.state.value].label

      });
    

    setTimeout(() => this.props.navigation.navigate("Home"), 2000);
  }



  scrollY = new Animated.Value(0);
  diffClampScrollY = new Animated.diffClamp(this.scrollY, 0, HEADER_HEIGHT);
  headerY = new Animated.interpolate(this.diffClampScrollY,
    {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
    });

  render() {
    return (

      <View style={this.props.userData.darkMode ? styles.darkContainer : styles.container}>
        <Header style = {{backgroundColor: this.props.userData.darkMode ? "#0303030" : "#fff", borderBottomColor:"transparent", paddingLeft:theme.sizes.base*1.8}} androidStatusBarColor="#000" noShadow>
          <Left>
              <Icon name="chevron-left" size = {30} style = {{alignSelf:"flex-start", color: this.props.userData.darkMode ? "#fff" : "#000"}} onPress = {() => {
                this.props.updateModalVisible(true)
                this.props.navigation.navigate("Home")
              }}/>
          </Left>
          <Body>
          </Body>
          <Right>
            <Button/>
          </Right>
        </Header>
        <View style={styles.header}>
          <Text style={{ fontSize: 32, fontFamily:"Helvetica-Bold", color:this.props.userData.darkMode ? "#FF9800" : "#000" }}>Make a Report</Text>
        </View>
        <View style={{paddingHorizontal: theme.sizes.base * 2, marginTop: 30 }}>
          <Text h3 style={{ fontFamily: 'Montserrat', color:this.props.userData.darkMode ? "#fff" : "#000" }}>
            Let us know if there is something wrong
          </Text>

          <Text h1 gray2></Text>
          <Text h1 gray2></Text>
            <Animatable.View animation="zoomIn" duration={600} delay={100}>

            <RadioForm
              labelStyle={{ fontSize: 20, fontFamily: "Montserrat", color: this.props.userData.darkMode ? '#fff' : '#000' }} 
              radio_props={radio_props}
              initial={0}
              buttonColor='#03A696'
              animation={true}

              onPress={(value) => {this.setState({value:value})}}
            />


          </Animatable.View>
          <Text h1 gray2></Text>
          <Text h1 gray2></Text>

          <Animatable.View animation="bounceIn" duration={600} delay={100}>
              <Button style={styles.button} onPress={() => this.handleSend()}>
                <Text h1 bold white center>
                  Send
              </Text>
              </Button>

          </Animatable.View>
          <Text h1 gray2></Text>
          <Text h1 gray2></Text>

          {this.state.reportSent &&
            <Animatable.View animation="slideInRight" duration={600} delay={100}>

            <Text h3 style={{fontFamily: "Montserrat", color: this.props.userData.darkMode ? '#fff' : '#000'}}>Thank you for your report!</Text>
            </Animatable.View>
  }
{this.state.reportSent &&
            <Animatable.View animation="slideInRight" duration={600} delay={200}>

            <Text h3 gray2 style={{fontFamily: "Montserrat-Bold"}}>You have been awarded +10 bonus points!</Text>
  </Animatable.View>
  }

          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#202020',
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2, 
    alignContent: "center", 
    flexDirection: "row", 
    alignItems: "center",
  },
  cards: {
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: HEADER_HEIGHT
  },
  card: {
    backgroundColor: "white",
    width: width - theme.sizes.base * 2,
    elevation: theme.sizes.base / 2,
    borderRadius: theme.sizes.base,
  },
  rounded: {
    borderRadius: theme.sizes.base,
  },
  labels: {
    width: 55,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    marginHorizontal: 10
  },
  button: {
    backgroundColor: '#03A696',
    height: 60,
    width:300,
    borderRadius: 14,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    alignSelf:"center"
  },
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    currentCity: state.currentCity,
    allAreas: state.allAreas,
    userData: state.userData,
    showRoute: state.showRoute,
    areas: state.areas,
    tappedArea: state.tappedArea
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateModalVisible: (param) => dispatch({ type: "UPDATE_MODAL_VISIBLE", param: param }),
    updateUserData: (param) => dispatch({ type: "UPDATE_USER_DATA", param: param }),
    updateShowRoute: (param) => dispatch({ type: "UPDATE_SHOW_ROUTE", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
