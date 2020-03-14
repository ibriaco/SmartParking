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
import MAP_STYLE from "./mapStyle.js"
import { Searchbar } from 'react-native-paper';
import Button from "../components/Button.js";
import { Icon } from "../components"
import Text from "../components/Text.js"


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = 0.0009;
const LATITUDE = 46.166625;
const LONGITUDE = 9.87888;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';

var tappedArea;
var tappedParking;
var tappedParkingCoords;
var firebase;

class Map extends React.Component {
  constructor(props) {
    super(props);

    firebase = require("firebase");

    var config = {
      databaseURL: "https://smartparking-19214.firebaseio.com",
      projectId: "smartparking-19214",
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  

    this.state = {

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
  
      //variable containing the initial region viewed by the user (europe)
      region:  {
        latitude: 45.4,
        longitude: 9.8,
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


async readAndDrawAreas () {

//leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche

firebase.database().ref('Cities/' + this.state.selectedCity + '/Areas').on('value', (snapshot) => {    
  this.setState({receivedAreas: snapshot.val()});
  })        
  

}

async readAndDrawParkings (area) {

  //leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche
  firebase.database().ref('Cities/' + this.state.selectedCity + '/Parkings/Parkings' + area.id).on('value', (snapshot) => {    
    this.setState({tappedAreaParkings: snapshot.val()});  

 })        
  
  }

  async componentDidMount() {

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
        this.updateCamera()

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

    //polygon è proprio il vettore di coordinate che rappresenta quella determinata area (o parte di area)

    //showo le informazioni dell'area (ora è un alert, poi sarà un drawer)
    alert("Tap su Area " + area.id + ", Prezzo " + area.price + "Numero posti TOT: " + area.nTot);

    //salvo l'area tappata, mi servirà per cancellarla quando verrà tappato un parcheggio 
    //controllare il tap di due aree consecutive
    this.removeArea(area)
    this.readAndDrawParkings(area);
    /*
    if(areaHasBeenDeleted()){
      //se non è gia stata cancellata un area (nascosta temporaneamente) allora faccio tutto normale
      //se invece è nascosta, devo prima resettare le aree e poi faccio tutto
      //RIMETTERE TAPPEDAREA IN RECEIVEDAREAS
      //probably l'if lo posso fare su tappedArea
    }
*/

  }

  showParkingInfo(parking) {

    tappedParking = parking;


    this.setState({isModalVisible: true});

    alert("Tap su Parcheggio di Tipo: " + parking.type);

    tappedParkingCoords = {
      latitude : ((tappedParking.rectangle[0].latitude + tappedParking.rectangle[1].latitude + tappedParking.rectangle[2].latitude + tappedParking.rectangle[3].latitude)/4),
      longitude : ((tappedParking.rectangle[0].longitude + tappedParking.rectangle[1].longitude + tappedParking.rectangle[2].longitude + tappedParking.rectangle[3].longitude)/4),
    }
   

//get the CURRENT number of reservations for that specific parking, better to create an async function
    firebase.database().ref('Cities/' + this.state.selectedCity + '/Reservations/Reservations' + tappedArea.id + '-' + tappedParking.id).on('value', (snapshot) => {    
      console.log(snapshot.numChildren())
   })   

/*
    let newArray = [...this.state.routeCoordinates];
    newArray[1] = {latitude: parking.rectangle[0].latitude, longitude: parking.rectangle[0].longitude};
    this.setState({routeCoordinates: newArray});
    */

  }

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
          customMapStyle={MAP_STYLE}
          ref={ref => { this.mapView = ref }}           
          initialRegion={this.state.region}    
        >
 
        {this.state.receivedAreas.map((area => (
          area.points.map((polygon, index) => (
            <View key={index}>
              <Polygon
                coordinates={polygon}
                fillColor={polygon.color}
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
                fillColor={parking.color}
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
        
        <Searchbar
          placeholder="Where are you going?"
          placeholderTextColor = 'rgba(165, 165, 165, 0.8)'
          iconColor = 'rgba(165, 165, 165, 0.8)'
          onChangeText={query => { this.setState({ firstQuery: query }); }}
          value={firstQuery}
          style = {styles.searchbar}
      />

      
      
        

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
    marginHorizontal: 40,
    borderRadius: 10,
    opacity: 1,
    height: 50


  }
});
  
export default Map;