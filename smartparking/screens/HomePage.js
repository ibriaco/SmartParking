import React from "react";
import {
  StyleSheet,
  View,  
  Image,  
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

const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = 0.0009;
const LATITUDE = 46.166625;
const LONGITUDE = 9.87888;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';

var firebase;
var mapStyle = [
  {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#e0efef"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "hue": "#1900ff"
          },
          {
              "color": "#c0e8e8"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 100
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "lightness": 700
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#7dcdcd"
          }
      ]
  }
];

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


      currentCoordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },

      followUser: true,

      //variable containing the fetched parkings belonging to the tapped area
      tappedAreaParkings: [
        {
          color: '',
          type: '',
          rectangle:[ {latitude: 0, longitude: 0}],
        } 
      ],

      //variable containing the tapped area, this one is deleted from the receivedAreas so i have to save the data
      tappedArea: {
        id: 0,
        price: 0,
        points: [
        [{latitude: 0, longitude: 0}],
        ],
      },

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

  //THINGS USED TO INSERT DATA INTO THE DB
  writeUserData(id,price,points){
    firebase.database().ref('Areas/'+id).set({
        points,
        price
    }).then((data)=>{
        //success callback
        //console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
    
}

//THINGS USED TO INSERT DATA INTO THE DB
writeParking(areaId, color, id, points){
  firebase.database().ref('Parkings/'+ areaId + '/' +id ).set({
      areaId,
      color,
      id,
      points
  }).then((data)=>{
      //success callback
      //console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
  
}

async readAndDrawAreas () {

//leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche
firebase.database().ref(this.state.selectedCity + '/Areas').on('value', (snapshot) => {    
  this.setState({receivedAreas: snapshot.val()});
  })        

}

async readAndDrawParkings (area) {

  //leggo tutte le aree del DB, assegnandole a receivedAreas le renderizzo anche
  firebase.database().ref(this.state.selectedCity + '/Parkings' + area.id).on('value', (snapshot) => {    
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
    console.log("change")
  
    
    if(this.state.followUser){
      this.setState({region: {
        latitude: this.state.coordinate.latitude,
        longitude: this.state.coordinate.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }});
    }
    /*
    else{
      this.setState({region: event});
    }
    */
  }

  

  getMapRegion() {

    
    return {  latitude: this.state.coordinate.longitude,
      longitude: this.state.routeCoordinates[0].longitude,
      
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }


    
  }


  showAreaInfo(area){

    this.setState({tappedArea: area});

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

  showParkingInfoAndRoute(parking) {

    alert("Tap su Parcheggio di Tipo: " + parking.type);

    let newArray = [...this.state.routeCoordinates];
    newArray[1] = {latitude: parking.rectangle[0].latitude, longitude: parking.rectangle[0].longitude};
    this.setState({routeCoordinates: newArray});
  }

  removeArea(a) {
    //questo funziona perfettamente OKKK
    this.setState({receivedAreas: this.state.receivedAreas.filter(function(area) { 
        return area !== a;
    })});

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

 
        {this.state.receivedAreas.map((area => (
          area.points.map((polygon, index) => (
            <View key={index}>
              <Polygon
                coordinates={polygon}
                fillColor="#ff147c"
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
                onPress={() => this.showParkingInfoAndRoute(parking)}
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
            <Image source={require('../assets/car_marker.png')} style={{height: 35, width:35 }} />
            </Marker.Animated>
        </MapView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
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
  }
});
  
export default Map;