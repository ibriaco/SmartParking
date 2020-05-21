import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import {Container} from 'native-base'
import * as Animatable from 'react-native-animatable';
import {showMessage} from "react-native-flash-message";
import {Header, Left, Right, Body, Title} from 'native-base'
import Collapsible from 'react-native-collapsible';


const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';

const DEFAULT_PRICE = 0;
const DEFAULT_DISTANCE = 0;
const DEFAULT_TIME = 0;
const DEFAULT_LOW = false;
const DEFAULT_MEDIUM = false;
const DEFAULT_HIGH = false;
const DEFAULT_ALL = true;
const DEFAULT_PAY = false;
const DEFAULT_FREE = false;
const DEFAULT_H = false;
const DEFAULT_P = false;
const DEFAULT_E = false;



class Filter extends Component {
  constructor(props) {
    super(props);

    this._handlePayTypeButton = this._handlePayTypeButton.bind(this);
    this._handleLowButton = this._handleLowButton.bind(this);
    this._handleMediumButton = this._handleMediumButton.bind(this);
    this._handleHighButton = this._handleHighButton.bind(this);
    this._resetFields = this._resetFields.bind(this);


  this.state = {
    maxPrice: DEFAULT_PRICE,
    maxDistance: DEFAULT_DISTANCE,
    maxTime: DEFAULT_TIME,

    lowAvailability: DEFAULT_LOW,
    mediumAvailability: DEFAULT_MEDIUM,
    highAvailability: DEFAULT_HIGH,
    
    allType: DEFAULT_ALL,
    freeType: DEFAULT_FREE,
    payType: DEFAULT_PAY,

    hSpot: DEFAULT_H,
    pSpot: DEFAULT_P,
    eSpot: DEFAULT_E
  };
  }
  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }


  _resetFields(){
    this.setState({
      disabled: false,

      maxPrice: DEFAULT_PRICE,
      maxDistance: DEFAULT_DISTANCE,
      maxTime: DEFAULT_TIME,
  
      lowAvailability: DEFAULT_LOW,
      mediumAvailability: DEFAULT_MEDIUM,
      highAvailability: DEFAULT_HIGH,
      
      allType: DEFAULT_ALL,
      freeType: DEFAULT_FREE,
      payType: DEFAULT_PAY,
  
      hSpot: DEFAULT_H,
      pSpot: DEFAULT_P,
      eSpot: DEFAULT_E
    });

    this.bigView.slideOutUp(500);
    setTimeout(() => {
      this.bigView.slideInUp(500);
    }, 190)
  }

  _handleLowButton(){
    //if it wasn't selected, and now is selected:
    if(!this.state.lowAvailability){
      this.setState({
        lowAvailability: true,
        mediumAvailability: false,
        highAvailability: false
      })
    }

    //if it was selected, and now is deselected:
    if(this.state.lowAvailability){
      this.setState({
        lowAvailability: false,
      })
    }
    
  }

  _handleMediumButton(){
    //if it wasn't selected, and now is selected:
    if(!this.state.mediumAvailability){
      this.setState({
        mediumAvailability: true,
        lowAvailability: false,
        highAvailability: false
      })
    }

    //if it was selected, and now is deselected:
    if(this.state.mediumAvailability){
      this.setState({
        mediumAvailability: false,
      })
    }
    
  }

  _handleHighButton(){
    //if it wasn't selected, and now is selected:
    if(!this.state.highAvailability){
      this.setState({
        highAvailability: true,
        mediumAvailability: false,
        lowAvailability: false
      })
    }

    //if it was selected, and now is deselected:
    if(this.state.highAvailability){
      this.setState({
        highAvailability: false,
      })
    }
    
  }


  _handlePayTypeButton(){
    
  //if PAY wasn't selected, and now is selected:
    
  if(!this.state.payType){
    this.priceView.flipInX(600);
      this.setState({
        payType: true
    });
  }
  //if PAY was selected, and now is not selected:
  else{
    this.priceView.flipOutX(600);

      this.setState({
        payType: false,
    });
    } 

  
  }

  
  async handleApply() {

    //filter areas with the inserted parameters
    await this.applyFilters();

  }

  async applyFilters() {

    var tempAreas = [];

    let price = this.state.maxPrice;

    let distance = this.state.maxDistance;
    let time = this.state.maxTime;

    //POSSIBLE COMBINATIONS, from the most generic to the most specific

    //TYPE
    if(this.state.allType){
      console.log("ALL")
      tempAreas = this.props.allAreas;

      //PRICE
      if(this.state.maxPrice != 0){
        console.log("PRICE LIMIT")

        tempAreas = tempAreas.filter(function (area) {
          return area.price < price;
        });
      }
    }
    else if(this.state.payType){
      console.log("PAY")
      tempAreas = this.props.allAreas.filter(function (area) {
        return area.price > 0;
      }); 

      //PRICE
      if(this.state.maxPrice != 0){
        console.log("PRICE LIMIT")

        tempAreas = tempAreas.filter(function (area) {
          return area.price < price;
        });
      }
    }
    else if(this.state.freeType){
      console.log("FREE")
      tempAreas = this.props.allAreas.filter(function (area) {
        return area.price == 0;
      });
    }
  
    //DISTANCE

    if(this.state.maxDistance != 0){
      console.log("DISTANCE LIMIT")

      this.props.updateCircleRadius(distance);

      tempAreas = tempAreas.filter(function (area) {
        var s = area.distance.substr(0, area.distance.length - 3)
        console.log("Distance: " + s)
        return parseFloat(s) < distance;
      });
    }else{
      this.props.updateCircleRadius(distance);
    }

    //TIME

    if(this.state.maxTime != 0){
      console.log("TIME LIMIT")

      tempAreas = tempAreas.filter(function (area) {
        return area.time < time;
      });
    }


    //AVAILABILITY: organizzazione
    //A = 1 - ( nTaken / nTot ) * 100 
    //A da 0 a 33 = LOW
    //A da 33 a 66 = MEDIUM
    //A da 66 a 100 = HIGH

    //nessuno selezionato = tutti i parcheggi
    //LOW = tutti
    //MEDIUM = A > 33
    //HIGH = A > 66

    //MEDIUM
    if(this.state.mediumAvailability){

      tempAreas = tempAreas.filter(function (area) {
        return (1 - (area.nTaken / area.nTot)) * 100 > 33;
      });
    }

    //HIGH
    if(this.state.highAvailability){
      tempAreas = tempAreas.filter(function (area) {
        return (1 - (area.nTaken / area.nTot)) * 100 > 66;
      });
    }
    
    
    //H
    if(this.state.hSpot){
      console.log("HANDICAP")

      tempAreas = tempAreas.filter(function (area) {
        return (area.nHandicap != 0);
      });
     
    }
    
    if(this.state.pSpot){
      console.log("PREGNANT")

      tempAreas = tempAreas.filter(function (area) {
        return (area.nPregnant != 0);
      });
    }

    if(this.state.eSpot){
      console.log("ELECTRICS")

      tempAreas = tempAreas.filter(function (area) {
        return (area.nElectric != 0);
      });
    }

console.log(tempAreas)


    //FINAL CONTROL: TO APPLY OR NOT TO APPLY
    if(tempAreas.length == 0) {

      showMessage({
        message: "Filters not applied!",
        description: "No parkings found :(",
        type: "danger",
        icon: "danger"
      });

    }
    else{

      this.props.updateShowRoute(false);

      this.props.updateArea(tempAreas);
      
      showMessage({
        message: "Filters applied!",
        description: "We found " + tempAreas.length + " perfect parkings :)",
        type: "success",
        icon: "success"
      });

      this.props.navigation.navigate("Home");

    }
    
  }

  handleClose() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }

  render() {
    const { profile, editing } = this.state;

    return (
      <ScrollView style={{flex: 1, marginTop: 55}}>
    <Animatable.View  ref={v => this.bigView = v}> 
    <Block padding={[0, theme.sizes.base * 2]} style={{ justifyContent: "space-between", }}>
        
        <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
          <Text style={{ fontSize: 32, fontFamily: "Helvetica-Bold" }}>
          Filters
        </Text>
        </View>
        

        <View style={styles.sliders}>
        <Animatable.View animation="slideInUp" duration={600} delay={100}>

              <Text center h2 style={{fontFamily: "Montserrat-Bold"}}>
                Type
              </Text>

              <Block row center style={{ justifyContent: "space-around" }}>

              <Button style={this.state.payType ? styles.filterButtonTriggered : styles.filterButton}  onPress={() => {
                if(this.state.disabled)
                  this.priceView.slideInRight(600);

                this.setState({
                  payType: true,
                  allType: false,
                  freeType: false,
                  disabled: false
                })
              }}>
                  {this.state.payType &&<Icon name ="cash" size = {26} color="#03A696" style = {{alignSelf:"center"}}/>}
                  {!this.state.payType &&<Icon name ="cash" size = {26} style = {{alignSelf:"center"}}/>}
              </Button>

              <Button style={this.state.freeType ? styles.filterButtonTriggered : styles.filterButton}  onPress={() => {

                if(!this.state.disabled)
                this.priceView.slideOutRight(600);

                this.setState({
                  freeType: true,
                  payType: false,
                  allType: false,
                  maxPrice: DEFAULT_PRICE,
                  disabled: true
                })
              }}>
                  {this.state.freeType && <Text center style={{fontFamily: "Montserrat-Bold"}} secondary>FREE</Text>}
                  {!this.state.freeType && <Text center style={{fontFamily: "Montserrat-Bold"}} black>FREE</Text>}
              </Button>

              <Button style={this.state.allType ? styles.filterButtonTriggered : styles.filterButton}  onPress={() => {
                
                if(this.state.disabled)
                this.priceView.slideInRight(600);

                this.setState({
                  allType: true,
                  payType: false,
                  freeType: false,     
                  disabled: false
                })
              }}>
                  {this.state.allType && <Text center style={{fontFamily: "Montserrat-Bold"}} secondary>All</Text>}
                  {!this.state.allType && <Text center style={{fontFamily: "Montserrat-Bold"}} black>All</Text>}
              </Button>

              
              </Block>


            <Animatable.View ref={p => this.priceView = p}>


            <Text h2 style={{marginBottom: 10, fontFamily: "Montserrat-Bold"}} center>
            Maximum Price
              </Text>


            <Slider
              disabled={this.state.disabled}
              minimumValue={0.00}
              maximumValue={5.00}
              style={{ height: 10 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 3, borderRadius: 3 }}
              minimumTrackTintColor="rgba(3, 166, 150, 0.50)"
              maximumTrackTintColor="rgba(3, 166, 150, 0.05)"
              value={this.state.maxPrice}
              step={0.50}
              onValueChange={value => this.setState({ maxPrice: value })}
            />
            <Text h2 style={{fontFamily: "Montserrat-Bold"}} right>
              {this.state.maxPrice} €
              </Text>
              </Animatable.View>

        </Animatable.View>



<Animatable.View animation="slideInUp" duration={600} delay={200}>


            <Text h2 center style={{ marginBottom: 10, fontFamily:"Montserrat-Bold"}}>
            Maximum Time
              </Text>


            <Slider
              minimumValue={0}
              maximumValue={60}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 3, borderRadius: 3 }}
              minimumTrackTintColor="rgba(3, 166, 150, 0.50)"
              maximumTrackTintColor="rgba(3, 166, 150, 0.05)"
              value={this.state.maxTime}
              step={1}

              onValueChange={value => this.setState({ maxTime: value })}
            />
            <Text h2 style={{fontFamily: "Montserrat-Bold"}} right>
              {this.state.maxTime} min
              </Text>
              </Animatable.View>


              <Animatable.View animation="slideInUp" duration={600} delay={300}>


              <Text h2 style={{ marginBottom: 5,fontFamily: "Montserrat-Bold"}} center >
              Maximum Distance
              </Text>


              <Slider
              minimumValue={0}
              maximumValue={200}
              style={{ height: 19 }}
              thumbStyle={styles.thumb}
              trackStyle={{ height: 3, borderRadius: 3 }}
              minimumTrackTintColor="rgba(3, 166, 150, 0.50)"
              maximumTrackTintColor="rgba(3, 166, 150, 0.05)"
              value={this.state.maxDistance}
              step={1}

              onValueChange={value => this.setState({ maxDistance: value })}
            />
              <Text h2 style={{fontFamily: "Montserrat-Bold"}} right>
              {this.state.maxDistance} km
              </Text>
              </Animatable.View>

            <Animatable.View animation="slideInUp" duration={600} delay={400}>


              <Text center h2 style={{fontFamily: "Montserrat-Bold"}} >
                Minimum Availability
              </Text>

              
              <Block row center style={{ justifyContent: "space-around" }}>
                <Button style={this.state.lowAvailability ? styles.filterButtonTriggered : styles.filterButton} onPress={this._handleLowButton}>
                  {this.state.lowAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} secondary>Low</Text>}
                  {!this.state.lowAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} black>Low</Text>}
                </Button>
                <Button style={this.state.mediumAvailability ? styles.filterButtonTriggered : styles.filterButton} onPress={this._handleMediumButton}>
                  {this.state.mediumAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} secondary>Medium</Text>}
                  {!this.state.mediumAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} black>Medium</Text>}
                </Button>
                <Button style={this.state.highAvailability ? styles.filterButtonTriggered : styles.filterButton} onPress={this._handleHighButton}>
                  {this.state.highAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} secondary>High</Text>}
                  {!this.state.highAvailability && <Text center style={{fontFamily: "Montserrat-Bold"}} black>High</Text>}
                </Button>
              </Block>
            </Animatable.View>


            <Animatable.View animation="slideInUp" duration={600} delay={500}>

              <Text center h2 style={{fontFamily: "Montserrat-Bold"}} >
                Spot for
              </Text>


              <Block row center style={{ justifyContent: "space-around" }}>

                <Button style={this.state.hSpot ? styles.filterButtonTriggered : styles.filterButton} onPress={() => this.setState({hSpot: !this.state.hSpot})}>
                  {this.state.hSpot && <Icon name ="wheelchair-accessibility" size = {26} color="#03A696" style = {{alignSelf:"center"}}/>}
                  {!this.state.hSpot && <Icon name ="wheelchair-accessibility" size = {26} style = {{alignSelf:"center"}}/>}
                </Button>

                <Button style={this.state.pSpot ? styles.filterButtonTriggered : styles.filterButton}  onPress={() => this.setState({pSpot: !this.state.pSpot})}>
                  {this.state.pSpot &&<Icon name ="human-pregnant" size = {26} color="#03A696" style = {{alignSelf:"center"}}/>}
                  {!this.state.pSpot &&<Icon name ="human-pregnant" size = {26} style = {{alignSelf:"center"}}/>}
                </Button>

                <Button style={this.state.eSpot ? styles.filterButtonTriggered : styles.filterButton}  onPress={() => this.setState({eSpot: !this.state.eSpot})}>
                  {this.state.eSpot &&<Icon name ="battery-charging-outline" size = {26} color="#03A696" style = {{alignSelf:"center"}}/>}
                  {!this.state.eSpot &&<Icon name ="battery-charging-outline" size = {26} style = {{alignSelf:"center"}}/>}
                </Button>

              </Block>
            </Animatable.View>


            

        </View>



        <Block bottom style={{ marginBottom: 30 }}>
        <Animatable.View animation="bounceIn" duration={600} delay={1200}>

          <Button style={styles.button} onPress={() => this.handleApply()}>
            <Text h1 style={{fontFamily: "Montserrat-Bold"}} white center>
              Apply
                </Text>
          </Button>
          </Animatable.View>

        </Block>


        <View >
      <Button style = {styles.add} onPress={this._resetFields}>
        <Icon name="sync" size = {42} color="#03A696" style = {{alignSelf:"center", fontWeight:"bold", }}/>
      </Button>

      </View>
      </Block>
</Animatable.View>
</ScrollView>
    );
  }
}

Filter.defaultProps = {
  profile: mocks.profile
};


function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    showRoute: state.showRoute,
    allAreas: state.allAreas,
    areas: state.areas,
    tappedArea: state.tappedArea,
    currentCity: state.currentCity,
    userCoordinates: state.userCoordinates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDistanceFrom: (param) => dispatch({ type: "UPDATE_DISTANCE_FROM", param: param }),
    updateCircleRadius: (param) => dispatch({ type: "UPDATE_CIRCLE_RADIUS", param: param }),
    updateShowRoute: (param) => dispatch({ type: "UPDATE_SHOW_ROUTE", param: param }),
    updateCity: (param) => dispatch({ type: "UPDATE_CURRENT_CITY", param: param }),
    updateCoordinates: (param) => dispatch({ type: "UPDATE_COORDINATES", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 2,
    //paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base*1.2 ,
    height: theme.sizes.base*1.2 ,
    borderRadius: theme.sizes.base*1.2 ,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor:"white",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  button: {
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 12,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    marginBottom: 30,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    height: 40,
    width: 70,
    borderRadius: 8,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    marginBottom: 30,
  },
  filterButtonTriggered: {
    backgroundColor: 'rgba(3, 166, 150, 0.10)',
    borderWidth: 1,
    borderColor: "#03A696",
    height: 40,
    width: 70,
    borderRadius: 8,
    marginHorizontal: 45,
    marginBottom: 30
  },
  add: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignSelf:"flex-end",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    bottom: 60,
    position: "absolute"


  }
});
