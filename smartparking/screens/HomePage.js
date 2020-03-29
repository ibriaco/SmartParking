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
  Polygon,
  Animated,
  PROVIDER_GOOGLE
} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import { Searchbar } from 'react-native-paper';
import Button from "../components/Button.js";
import { Icon, Block } from "../components"
import Text from "../components/Text.js"
import FloatingButton from "../components/FloatingButton.js";
//import {mapStyle} from "./mapStyle.json";
import DrawerButton from "../components/DrawerButton.js";
import ActionButton from 'react-native-circular-action-menu';
import Icone from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateAreas, updateFilters } from '../actions/actions';
import { bindActionCreators } from 'redux';

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

      darkMode: false,
      email: "",
      displayName: "",

      firstQuery: '',
      isModalVisible: false,

      tappedParkingCoords: {
        latitude: 0,
        longitude: 0
      },

      currentCoordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },

      followUser: true,

      //variable containing the tapped area
      tappedParking: {
        color: '',
        type: '',
        rectangle:[ {latitude: 0, longitude: 0},{latitude: 0, longitude: 0},{latitude: 0, longitude: 0},{latitude: 0, longitude: 0}],
      },

      //variable containing the fetched parkings belonging to the tapped area
      tappedAreaParkings: [
        {
          id: 0,
          color: '',
          type: '',
          rectangle:[ {latitude: 0, longitude: 0}],
        } 
      ],

      //variable containing the tapped area, this one is deleted from the receivedAreas so i have to save the data
      /*
      tappedArea:{
        id: 0,
        color: "",
        nCS: 0,
        nFree: 0,
        nHandicap: 0,
        nPay: 0,
        nTot: 0,
        price: 0,
        points: [
        [{latitude: 0, longitude: 0}],
        ],
      },
*/
      //variable containing (initially) the city where the user is, may be changed if the user inserts a different city
      selectedCity: "Sondrio",

      //idk
      latitude: LATITUDE,
      longitude: LONGITUDE,

      //at index 0 i have the user coordinates (always updated), at index 1 i have the "destination" coordinates (tapped parking)
      routeCoordinates: [],

      //variable containing the fetched areas belonging to the selected city
      
      receivedAreas: [ 
        {
          id: 0,
          color: "",
          nCS: 0,
          nFree: 0,
          nHandicap: 0,
          nPay: 0,
          nTot: 0,
          price: 0,
          points: [
          [{latitude: 0, longitude: 0}],
          ],
        }
        ],
  
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
  console.log(filt);
  if(filt.active){


  }
  else{

    //leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche

    firebase.database().ref('Cities/' + this.state.selectedCity + '/Areas').on('value', (snapshot) => {    
      this.setState({receivedAreas: snapshot.val()});
    })      
  }  

}

async readAndDrawParkings (area) {

  //leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche
  firebase.database().ref('Cities/' + this.state.selectedCity + '/Parkings/Parkings' + area.id).on('value', (snapshot) => {    
    this.setState({tappedAreaParkings: snapshot.val()});  

 })        
  
  }

  signoutUser = () => {
    firebase.auth().signOut();
  }

  async componentDidMount() {


  //authentication

  const {email, displayName} = firebase.auth().currentUser

  this.setState({email, displayName});
  //when everything is mounted i fetch the db to get areas to render
  this.readAndDrawAreas();


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


  showAreaInfo(area){

    tappedArea = area;


    //get the CURRENT number of reservations for that specific parking, better to create an async function
    firebase.database().ref('Cities/' + this.state.selectedCity + '/Reservations/Reservations' + tappedArea.id).on('value', (snapshot) => {    
      console.log(snapshot.numChildren())
    });
    //polygon è proprio il vettore di coordinate che rappresenta quella determinata area (o parte di area)

    //showo le informazioni dell'area (ora è un alert, poi sarà un drawer)
    alert("Tap su Area " + area.id + ", Prezzo " + area.price + "Numero posti TOT: " + area.nTot);

    //salvo l'area tappata, mi servirà per cancellarla quando verrà tappato un parcheggio 
    //controllare il tap di due aree consecutive
    
    
    //this.removeArea(area)
    //this.readAndDrawParkings(area);
    
    
    /*
    if(areaHasBeenDeleted()){
      //se non è gia stata cancellata un area (nascosta temporaneamente) allora faccio tutto normale
      //se invece è nascosta, devo prima resettare le aree e poi faccio tutto
      //RIMETTERE TAPPEDAREA IN RECEIVEDAREAS
      //probably l'if lo posso fare su tappedArea
    }
*/

  }

 

/*
    let newArray = [...this.state.routeCoordinates];
    newArray[1] = {latitude: parking.rectangle[0].latitude, longitude: parking.rectangle[0].longitude};
    this.setState({routeCoordinates: newArray});
    */

  

  showParkingRoute() {
   
    this.setState({isModalVisible: false});

    let newArray = [...this.state.routeCoordinates];
    newArray[1] = {latitude: tappedParkingCoords.latitude, longitude: tappedParkingCoords.longitude};
    this.setState({routeCoordinates: newArray});  

  }

  removeArea(a) {
    //questo funziona perfettamente OKKK
    this.setState({receivedAreas: this.state.receivedAreas.filter(function(area) { 
        return area !== a;
    })});

}

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
};

toggleDarkMode(){

  this.state.darkMode ? (mapStyle = require('./mapStyle2.json')) : (mapStyle = require('./mapStyle.json'));
  this.setState({darkMode: !this.state.darkMode});
}

addReservation(){


  firebase.database().ref('Cities/' + this.state.selectedCity + '/Reservations/Reservations' + tappedArea.id + '-' + tappedParking.id).set( {    
    timestampS: firebase.database.ServerValue.TIMESTAMP, //in milliseconds
})
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
 
        {this.state.receivedAreas.map((area => (
          area.points.map((polygon, index) => (
            <View key={index}>
              <Polygon
                coordinates={polygon}
                //fillColor={polygon.color}
                fillColor="rgba(3,100,255,0.3)"
                tappable={true}
                strokeWidth={0}
                onPress={() => this.showAreaInfo(area)}
				        />              
            </View>
          )))))}

          {this.state.tappedAreaParkings.map((parking, index) => (
            <View key={index}>
              <Polygon
                coordinates={parking.rectangle}
                //fillColor={parking.color}
                tappable={true}
                onPress={() => this.showParkingInfo(parking)}
                />              
            </View>
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

       {/*   
        <Searchbar
          placeholder="Where are you going?"
          placeholderTextColor = 'rgba(165, 165, 165, 0.8)'
          iconColor = 'rgba(165, 165, 165, 0.8)'
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
          style = {styles.searchbar}
        />
        
*/}
      
      
        

        <View>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text>Hello!</Text> 
            <Button title="i parked here" onPress={() => this.addReservation()}></Button>
            <Button title="path" onPress={() => this.showParkingRoute()}></Button>
            <Button title="google maps" onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + tappedParkingCoords.latitude + ',' + tappedParkingCoords.longitude + '&dir_action=navigate')}></Button>           
          </View>
        </Modal>
      </View>


      <ActionButton buttonColor="#38BC7C" onPress={() => this.toggleDarkMode()}>
      
      </ActionButton>
            {/*
             <ActionButton buttonColor="#38BC7C">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icone name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icone name="android-notifications-none" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icone name="android-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          
        </ActionButton>
        
             */}
     

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
  

const mapStateToProps = state => ({
  areas: state.areas,
});

const ActionCreators = Object.assign(
  {},
  updateAreas,
  updateFilters
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

//export default Map;