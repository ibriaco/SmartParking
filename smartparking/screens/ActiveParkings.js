import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch, Divider } from "../components";
import * as Animatable from 'react-native-animatable';
import { Card } from 'galio-framework';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';

const { width } = Dimensions.get('screen');
const { height} = Dimensions.get('screen');


//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class ParkingsNoImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curTime: 0,
      animation: new Animated.Value(0),
      activeSections: [],
      collapsed: true
    }

  }
  scrollY = new Animated.Value(0);
  diffClampScrollY = new Animated.diffClamp(this.scrollY, 0, HEADER_HEIGHT);
  headerY = new Animated.interpolate(this.diffClampScrollY,
    {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
    });

    componentDidMount() {
      setInterval( () => {
        this.setState({
          curTime : new Date().getTime()
        })
      },1000)
    }


    check = () => {
      var temp = this.props.userData.reservations

      for(var i in temp){
        var nowInMs = (new Date()).getTime();

        if(temp[i].endDate > nowInMs){
          this.props.updateActiveParking(temp[i]);
          return (true)
        }           
      }
      
      if(!this.state.collapsed)
        this.setState({ collapsed: !this.state.collapsed })
      return (false)
    }
    

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.distance}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.address}</Text>
        <Text style={styles.headerText}>{section.distance}</Text>
        <Text style={styles.headerText}>{section.time}</Text>

      </View>
    );
  };

 

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };


  render() {
    return (

      <Container style={this.props.userData.darkMode ? styles.darkContainer : styles.container}>
        {(this.props.userData.reservations && this.check()) &&
        <TouchableWithoutFeedback onPress={() => this.setState({ collapsed: !this.state.collapsed })}>

          <View style={this.props.userData.darkMode ? styles.darkHeader : styles.header}>
          <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
          <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>Location</Text>
          
            {!this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat"}}>{this.props.activeParking.parkingAddress}</Text>}
            {this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat", color: "white"}}>{this.props.activeParking.parkingAddress}</Text>}

            <Text style={styles.headerText}></Text>
            <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>Vehicle</Text>
            {!this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat"}}>AB 456CD</Text>}
            {this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat", color: "white"}}>AB 456CD</Text>}

            <Text style={styles.headerText}></Text>
            
          </View>
          <View style = {{flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between"}}>
            <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
            <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>Remaining time</Text>
            <Text h1 secondary style={{fontFamily: "Montserrat"}}>{parseInt(((this.props.activeParking.endDate - this.state.curTime) / (1000*60*60)) % 24 ) + "h " + parseInt(((this.props.activeParking.endDate - this.state.curTime) / (1000*60)) % 60) + "m " + parseInt(((this.props.activeParking.endDate - this.state.curTime) / 1000) % 60 ) +"s"}
</Text>
            </View>
            <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
              <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>Price</Text>
              <Text h1 secondary style={{fontFamily: "Montserrat"}}>{this.props.activeParking.amount} €</Text>
            </View>
          </View>
          </View>
        </TouchableWithoutFeedback>
  }
  
  {!this.check() &&
  <Text center h3 gray2 style = {{fontFamily: 'Montserrat-Bold', top: height/3-50}}>You have no active parkings!</Text>
  }
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={this.props.userData.darkMode ? styles.darkContent :styles.content}>

            <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>Start Time</Text>
            {!this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat"}}>{new Date(this.props.activeParking.startDate).toLocaleTimeString()}</Text>}
            {this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat", color: "white"}}>{new Date(this.props.activeParking.startDate).toLocaleTimeString()}</Text>}

            <Text style={styles.headerText}></Text>

            <Text h3 style={{fontFamily: "Montserrat-Bold"}} gray2>End Time</Text>
            {!this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat"}}>{new Date(this.props.activeParking.endDate).toLocaleTimeString()}</Text>}
            {this.props.userData.darkMode && <Text h3 style={{fontFamily: "Montserrat", color:"white"}}>{new Date(this.props.activeParking.endDate).toLocaleTimeString()}</Text>}

            <Text style={styles.headerText}></Text>

      {(this.props.activeParking && this.props.activeParking.parkingCity === this.props.currentCity) &&
            <Button style={styles.end} onPress={() => {
                var addr = this.props.activeParking.parkingAddress;
                var area = this.props.areas.find(function findArea(element){
                  return element.address === addr;
                })
                
                this.props.mapRef.animateCamera({ center: { latitude: area.latitude, longitude: area.longitude }, zoom: 18 }, { duration: 1000 });
                this.props.updateTappedArea(area);
                this.props.updateShowRoute(false);
                setTimeout(() => this.props.updateModalVisible(true), 1400);
                this.props.navigation.navigate("Home");
            }}>
              <Text center white style={{fontFamily: "Montserrat-Bold"}} h2>View on Map</Text>
            </Button>
  }
          </View>
        </Collapsible>
  

      </Container>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor:"rgba(3, 166, 150,0.02)"
  },
  darkContainer: {
    flex: 1, 
    backgroundColor:"#303030"
  },
  cards: {
    width,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: "white",
    width: '95%',
    elevation: theme.sizes.base / 2,
    borderRadius: theme.sizes.base,
  },
  rounded: {
    borderRadius: theme.sizes.base,
  },
  labels: {
    width: 100,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    marginHorizontal: 10
  },
  end: {
    backgroundColor: '#03A696',
    height: 60,
    width: '95%',
    alignSelf: "center",
    borderRadius: 10,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  extend: {
    backgroundColor: '#4c03a6',
    height: 60,
    width: '80%',
    alignSelf: "center",
    borderRadius: 16,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  content: {
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContent: {
    alignItems: "center",
    padding: 20,
    backgroundColor: '#303030',
  },
  header: {
    width: width - theme.sizes.base * 3,
    //alignItems: 'center',
    alignSelf: 'center',

    borderRadius: theme.sizes.base / 2,
    elevation: theme.sizes.base / 2,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20
  },
  darkHeader: {
    width: width - theme.sizes.base * 3,
    //alignItems: 'center',
    alignSelf: 'center',

    borderRadius: theme.sizes.base / 2,
    elevation: theme.sizes.base / 2,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    backgroundColor: '#404040',
    padding: 20,
    marginTop: 20
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    currentCity: state.currentCity,
    activeParking: state.activeParking,
    userData: state.userData,
    mapRef: state.mapRef,
    showRoute: state.showRoute,
    areas: state.areas,
    tappedArea: state.tappedArea
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateActiveParking: (param) => dispatch({ type: "UPDATE_ACTIVE_PARKING", param: param }),
    updateModalVisible: (param) => dispatch({ type: "UPDATE_MODAL_VISIBLE", param: param }),
    updateShowRoute: (param) => dispatch({ type: "UPDATE_SHOW_ROUTE", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingsNoImage);