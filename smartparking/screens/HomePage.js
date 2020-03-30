import React from "react";
import {
  StyleSheet,
  View,  
  Image,
  Dimensions,
  Text
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

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = 0.0009;
const LATITUDE = 46.166625;
const LONGITUDE = 9.87888;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';
const filt = require('./filteringParameters.json');

var mapStyle = require('./mapStyle.json');
var tappedArea;
var tappedParking;
var tappedParkingCoords;

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

    this.state = {

      isModalVisible: false,
      isLoading: true,
      darkMode: false,
      email: "",
      displayName: "",

      currentCoordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },

      followUser: true,

    

      //variable containing (initially) the city where the user is, may be changed if the user inserts a different city
      selectedCity: "Sondrio",

      //idk
      latitude: LATITUDE,
      longitude: LONGITUDE,

      //at index 0 i have the user coordinates (always updated), at index 1 i have the "destination" coordinates (tapped parking)
      routeCoordinates: [],

    
  
      //variable containing the initial region viewed by the user
      region:  {
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

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      console.log("UPDATE")
    }
  }
  
async readAndDrawAreas () {
  
//PROVA LETTURA FILTRI
  

    //leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche

    firebase.database().ref('Cities/' + this.state.selectedCity + '/Areas').on('value', (snapshot) => {
    this.props.updateArea(snapshot.val());
    this.setState({isLoading: false});
  })      
    console.log("FINITO")

}



  signoutUser = () => {
    firebase.auth().signOut();
  }

  async componentDidMount() {

  console.log(this.props.areas)
    
  //authentication

  const {email, displayName} = firebase.auth().currentUser

  this.setState({email, displayName});
  //when everything is mounted i fetch the db to get areas to render
    await this.readAndDrawAreas();
    console.log(this.props.areas)



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
        console.log("NEW: " + newCoordinate);
        console.log("Coord: " + coordinate);

        //and update the route at index 0
        let newArray = [...this.state.routeCoordinates];
        newArray[0] = newCoordinate;
        this.setState({routeCoordinates: newArray});

        this.setState({currentCoordinates : newCoordinate});
        this.updateCamera();

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
    if(this.state.followUser && this.mapView !== null)
      this.mapView.animateCamera({center:  this.state.currentCoordinates, zoom: 16}, {duration: 2000});

  }

  updateRegion(event){

    
    if(this.state.followUser){
      this.setState({region: {
        latitude: this.state.coordinate.latitude,
        longitude: this.state.coordinate.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }});
    }
   
  }

  

  getMapRegion() {    
    return {  latitude: this.state.coordinate.longitude,
      longitude: this.state.routeCoordinates[0].longitude,
      
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }    
  }


  onAreaTapped(area){
    this.props.updateTappedArea(area);
    console.log("AREA TAPPATA: " + area);
  }

  showParkingRoute() {
   
    let newArray = [...this.state.routeCoordinates];
    newArray[1] = {latitude: this.props.tappedArea.latitude, longitude: this.props.tappedArea.longitude};
    this.setState({routeCoordinates: newArray});  
    console.log(this.state.routeCoordinates);

  }

toggleDarkMode(){
  
  this.setState({isModalVisible: true})
  console.log("PROVA: ")
  this.props.areas.map((area, index) => (
    console.log(area.longitude)
  ));


  console.log(this.props.areas)
  this.state.darkMode ? (mapStyle = require('./mapStyle2.json')) : (mapStyle = require('./mapStyle.json'));
  this.setState({darkMode: !this.state.darkMode});
}


  
  render() {
    const { firstQuery } = this.state;
    return (
      
      <View style={styles.container}>
      
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          maxZoomLevel={19} 
          //migliorare questa cosa
          //zoomEnabled = {!this.state.followUser}
          //scrollEnabled = {!this.state.followUser}
          loadingEnabled={true}
          customMapStyle={mapStyle}
          ref={ref => { this.mapView = ref }}           
          initialRegion={this.state.region}    
        >
 
        {!this.state.isLoading && this.props.areas.map((area, index) => (
              <MapView.Marker key={index}
              stopPropagation={true}
                coordinate={{latitude: area.latitude, longitude: area.longitude}}
                tappable={true}
                onPress={() => this.onAreaTapped(area)}
				        />              
          ))}

          

          

       
      {(this.state.routeCoordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.routeCoordinates[0]}
            waypoints={ (this.state.routeCoordinates.length > 2) ? this.state.routeCoordinates.slice(1, -1): null}
            destination={this.state.routeCoordinates[this.state.routeCoordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {

            }}
            onReady={result => {

            this.mapView.fitToCoordinates([{
              latitude: result.coordinates[0].latitude,
              longitude: result.coordinates[0].longitude},
              {
              latitude: result.coordinates[result.coordinates.length-1].latitude,
              longitude: result.coordinates[result.coordinates.length-1].longitude}], {
               edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
               animated: true,
            });                
                
              
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
            
          />
          )}


          <Marker.Animated
            ref={marker => {this.marker = marker;}}
            coordinate={this.state.coordinate}>
            <Image source={require('../assets/icons/car_marker.png')} style={{height: 35, width:35 }} />
          </Marker.Animated>
        </MapView>

        
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
        


      <ActionButton buttonColor="#38BC7C" onPress={() => this.toggleDarkMode()}/>
      
            

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex:1,
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
  bottonedemmerda:{
    position: "absolute",
    right: 10
  }
});
  
function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    areas: state.areas, 
    tappedArea: state.tappedArea
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateArea: (param) => dispatch({type: "UPDATE_AREA", param: param}), 
    updateTappedArea: (param) => dispatch({type: "UPDATE_TAPPED_AREA", param: param}),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);