import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Linking
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE
} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import ActionButton from 'react-native-circular-action-menu';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Block, Text, Button, Divider } from "../components";
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = 0.0009;
const LATITUDE = 46.166625;
const LONGITUDE = 9.87888;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';
import { FontAwesome5 } from 'react-native-vector-icons';

var mapStyle = require('./mapStyle.json');
var showRoute = false;
var initialPosition = true;
var tempAreas = [];

//fuck those useless warnings
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this._showParkingRoute = this._showParkingRoute.bind(this);

    this.state = {

      tappedAreaTime: "", 
      tappedAreaDistance: "",
      parkCards: [],
      isModalVisible: false,
      isLoading: true,
      darkMode: false,
      email: "",
      displayName: "",

      currentCoordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },

      //variable containing (initially) the city where the user is, may be changed if the user inserts a different city
      selectedCity: "Sondrio",

      //idk
      latitude: LATITUDE,
      longitude: LONGITUDE,

     

      //variable containing the initial region viewed by the user
      region: {
        //EUROPE
        //latitude: 45.4,
        //longitude: 9.8,

        //MILAN
        latitude: 45.464664,
        longitude: 9.188540,
        latitudeDelta: 10,
        longitudeDelta: 10
      },


      //animated region used to animate the marker representing the user position
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      }),

    };
  }


  async readAndDrawAreas() {


    firebase.database().ref('Cities/' + this.props.currentCity + '/Areas').on('value', (snapshot) => {
      this.props.updateArea(snapshot.val());
      this.setState({ isLoading: false });
      console.log(snapshot.val())
    })   

  }

 
  signoutUser = () => {
    firebase.auth().signOut();
  }


  async componentDidMount() {

    //authentication
    const { email, displayName } = firebase.auth().currentUser
    this.setState({ email, displayName });

    //when everything is mounted i fetch the db to get areas to render
    await this.readAndDrawAreas();
  

    //guardare questa istruzione
    const { coordinate } = this.state;

    //ask for gps permission and watch for position changes
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;

          const newCoordinate = {
            latitude,
            longitude
          };

         
          //when position changes, animate the marker
          coordinate.timing(newCoordinate).start();

          //and update the route at index 0

          this.setState({ currentCoordinates: newCoordinate });
          this.props.updateCoordinates(newCoordinate);

          if(initialPosition){
            initialPosition = !initialPosition
            this.updateCamera();
          }
          
            this.updateDist()
          
          

        },
        error => alert('Please give us the permission!'),
        {
          //this should update position every 1m, mmmmmm
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
          distanceFilter: 1
        }
      );

      
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  async updateCamera() {

    //funziona solo cosi? pazzesco
    if (this.mapView !== null)
      this.mapView.animateCamera({ center: this.state.currentCoordinates, zoom: 16 }, { duration: 2000 });

  }

 
  getMapRegion() {
    return {
      latitude: this.state.coordinate.longitude,
      longitude: this.state.routeCoordinates[0].longitude,

      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  }

  /*
  DA QUA DEVO GESTIRE LA MADONNA DEL MODAL
  */
  async onAreaTapped(area) {

    if(showRoute)
      showRoute = !showRoute;

    await this.props.updateTappedArea(area);
    this.calculateDistance();
    

    setTimeout(() => {this.setState({isModalVisible: true})}, 200)
    //this.setState({ isModalVisible: true })
  }

  _showParkingRoute() {

    this.setState({isModalVisible: false})
    showRoute = true;

  }

  toggleDarkMode() {

    this.setState({ isModalVisible: true })
    console.log("PROVA: ")
    this.props.areas.map((area, index) => (
      console.log(area.longitude)
    ));


    console.log(this.props.areas)
    this.state.darkMode ? (mapStyle = require('./mapStyle2.json')) : (mapStyle = require('./mapStyle.json'));
    this.setState({ darkMode: !this.state.darkMode });
  }

  async setModalVisible(visible) {
    this.setState({
      isModalVisible: visible,
    })
  }

  async calculateDistance(){
    try {
      let response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.currentCoordinates.latitude + ',' + this.state.currentCoordinates.longitude + '&destinations=' + this.props.tappedArea.latitude + ',' + this.props.tappedArea.longitude + '&key=' + GOOGLE_MAPS_APIKEY);
      let json = await response.json();
      this.setState({tappedAreaDistance: json.rows[0].elements[0].distance.text});
      this.setState({tappedAreaTime: json.rows[0].elements[0].duration.text});
    } catch (error) {
      console.error(error);
    }
  }

  async calculateDistanceAndTime(){
    try {
      let response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.currentCoordinates.latitude + ',' + this.state.currentCoordinates.longitude + '&destinations=' + this.props.tappedArea.latitude + ',' + this.props.tappedArea.longitude + '&key=' + GOOGLE_MAPS_APIKEY);
      let json = await response.json();

      distanceAndTime.push({
        distance: json.rows[0].elements[0].distance.text,
        time: json.rows[0].elements[0].duration.text
      });

    } catch (error) {
      console.error(error);
    }
  }

  async updateDist(){

    var tempAreas = this.props.areas;
    var newAreas = [];
    for (var area of tempAreas){
     
      try {
      let response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.currentCoordinates.latitude + ',' + this.state.currentCoordinates.longitude + '&destinations=' + area.latitude + ',' + area.longitude + '&key=' + GOOGLE_MAPS_APIKEY);
      let json = await response.json();

      area = {
        ...area,
        distance: json.rows[0].elements[0].distance.text,
        time: json.rows[0].elements[0].duration.text
      };

      newAreas.push(area);
    
    } catch (error) {
      console.error(error);
    
  };
}
console.log(newAreas)
this.props.updateArea(newAreas)

  }


  render() {
    return (

      <View style={styles.container}>

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          maxZoomLevel={19}
          loadingEnabled={true}
          customMapStyle={mapStyle}
          ref={ref => { this.mapView = ref }}
          initialRegion={this.state.region}
        >

          {!this.state.isLoading && this.props.areas.map((area, index) => (
            <MapView.Marker key={index}
              coordinate={{ latitude: area.latitude, longitude: area.longitude }}
              onPress={() => this.onAreaTapped(area)}>
                <FontAwesome5 name="map-marker-alt" color="#F25D27" size={35} />
            </MapView.Marker>
          ))}






          {(showRoute) && (
            <MapViewDirections
              origin={this.state.currentCoordinates}
              destination={{
                latitude: this.props.tappedArea.latitude,
                longitude: this.props.tappedArea.longitude}}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#F25D27"
              optimizeWaypoints={true}
              onStart={(params) => {

              }}
              onReady={result => {

                this.mapView.fitToCoordinates(result.coordinates), {
                  edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                  animated: true,
                };


              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}

            />
          )}


          <Marker.Animated
            ref={marker => { this.marker = marker; }}
            coordinate={this.state.coordinate}>
            
            <FontAwesome5 name="car" color="#03A696" size={35} />

          </Marker.Animated>
        </MapView>



        <Block>
          <Modal isVisible={this.state.isModalVisible} style={{ flex: 1, justifyContent: "flex-end", }}
            onBackdropPress={() => { this.setModalVisible(false) }}>
            <View style={{ flex: 0.3, backgroundColor: "#fff", borderRadius: 20, justifyContent: "space-evenly", flexDirection: "column", }}>

              <View style={{ justifyContent: "space-evenly", alignItems: "space-between", marginTop: 5, flexDirection: "row" }}>
                <FontAwesome5 name="map-pin" size={18} color="#F25D27">
                  <Text h3 gray2>  {this.props.tappedArea.address}</Text>
                </FontAwesome5>
              </View>
              <View style={{justifyContent:"center", flexDirection:"column", alignSelf:"center"}}>
              <FontAwesome5 name="directions" color="#F25D27" size={18} > 
                <Text h3>  {this.props.tappedArea.distance}, {this.props.tappedArea.time}</Text>
              </FontAwesome5>
              </View>
              <View style={{ justifyContent: "space-between", flexDirection: "row", marginHorizontal: 40 }}>
                <Button style={styles.modalContent}>
                  <FontAwesome5 name="map-marked" color="#03A696" size={18} onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + this.props.tappedArea.latitude + ',' + this.props.tappedArea.longitude)}/>
                </Button>
                <Button style={styles.modalContent}>
                  <Text h2 bold color="#03A696">{this.props.tappedArea.price != 0 && this.props.tappedArea.price}{this.props.tappedArea.price == 0 && "FREE"}<Text h3 color="#03A696">{this.props.tappedArea.price != 0 && "€/h"}</Text></Text> 
                </Button>
                <Button style={styles.modalContent}>
                  <FontAwesome5 name="parking" size={24} color="#03A696"/>
                </Button>
                <Button style={styles.modalContent}>
                {this.props.tappedArea.nHandicap != 0 && <FontAwesome5 name="wheelchair" size={18} color="#03A696"/>}
                {this.props.tappedArea.nHandicap == 0 && <FontAwesome5 name="wheelchair" size={18} color="gray"/>}
                </Button>
              </View>
              <View style={{ justifyContent: "space-evenly", flexDirection: "row", marginHorizontal: 40 }}>
                <Button style={styles.modalContentLowLeft}>
                  <FontAwesome5 name="paypal" size={18} color="#3b7bbf"><Text h3 bold > Pay</Text></FontAwesome5>
                </Button>
                <Button style={styles.modalContentLowRight} onPress={this._showParkingRoute}>
                  <FontAwesome5 name="route" size={18} color="#3b7bbf"><Text h3 bold > Show</Text></FontAwesome5>
                </Button>
              </View>
            </View>
          </Modal>
        </Block>

      <ActionButton buttonColor="#03A696"/>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  modalView: {
    position: "absolute",
    bottom: -30,
    left: -10,
    borderRadius: 20,
    backgroundColor: "white",
    width: WIDTH - 20,
    height: HEIGHT / 2
  },
  searchbar: {
    marginTop: 40,
    marginHorizontal: 20,
    borderRadius: 10,
    opacity: 1,
    height: 60,
    //bottom: HEIGHT*5/6

  },
  bottonedemmerda: {
    position: "absolute",
    right: 10
  },
  modalContent: {
    backgroundColor: '#ffffff',
    height: 40,
    width: 60,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#03A696",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalContentLowLeft:{
    //backgroundColor: '#FFCC00',
    height: 50,
    width: 100,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#03A696",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalContentLowRight:{
    //backgroundColor: '#03A696',
    height: 50,
    width: 100,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#03A696",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  }
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    areas: state.areas,
    tappedArea: state.tappedArea,
    currentCity: state.currentCity,
    userCoordinates: state.userCoordinates
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCity: (param) => dispatch({ type: "UPDATE_CURRENT_CITY", param: param }),
    updateCoordinates: (param) => dispatch({ type: "UPDATE_COORDINATES", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);