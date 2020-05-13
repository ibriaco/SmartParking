import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Linking,
  StatusBar,
  TouchableOpacity
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE
} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import Modal from "react-native-modal";
import ActionButton from 'react-native-circular-action-menu';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Block, Text, Button, Divider } from "../components";
import { FontAwesome5 } from 'react-native-vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showMessage } from "react-native-flash-message";
import { Ionicons } from 'react-native-vector-icons'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = 0.0009;
const LATITUDE = 46.166625;
const LONGITUDE = 9.87888;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';
const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.High,
};

var lightMapStyle = require('./mapStyle.json');
var darkMapStyle = require('./mapStyle2.json');

var initialPosition = true;
const initialRegion = {
  latitude: 45.464664,
  longitude: 9.188540,
  latitudeDelta: 10,
  longitudeDelta: 10
};

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
    this._handlePayment = this._handlePayment.bind(this);
    this._centerMap = this._centerMap.bind(this);


    this.state = {
      isDistanceAndTimeComplete: false,
      searchQuery: '',
      tappedAreaTime: "",
      tappedAreaDistance: "",
      parkCards: [],
      isLoading: true,
      darkMode: false,
      email: "",
      displayName: "",

      currentCoordinates: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },

      destinationCoordinates: null,

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

      //this means that we don't have parkings in the current city
      if (snapshot.numChildren() == 0) {

        //notify the user of that
        showMessage({
          message: "Ooops!",
          description: "No parkings found here :(",
          type: "danger",
        });

        //just block the render of the markers so no marker is shown
        var emptyArray = [];
        this.props.updateArea(emptyArray);
        this.props.updateAllAreas(emptyArray);
        this.setState({ isLoading: true });
      }
      else {
        //notify the user of that
        showMessage({
          message: "Yesss!",
          description: "We found " + snapshot.numChildren() + " parkings here :)",
          type: "success",
        });

        this.props.updateArea(snapshot.val());
        this.props.updateAllAreas(snapshot.val());
        this.setState({ isLoading: false });

        this.updateDist()
      }
    })


  }


  signoutUser = () => {
    firebase.auth().signOut();
  }


  async componentDidMount() {

    this.props.updateMapRef(this.mapView)

    //authentication
    const { email, displayName, uid } = firebase.auth().currentUser
    this.setState({ email, displayName });

    //welcome message
    showMessage({
      message: "Welcome!",
      description: displayName,
      type: "default",
      backgroundColor: "black", // background color
      color: "white", // text color
    });

    //when everything is mounted i fetch the db to get areas to render
    //await this.readAndDrawAreas();


    //guardare questa istruzione
    const { coordinate } = this.state;

    //ask for gps permission and watch for position changes
    let { status } = await Location.requestPermissionsAsync();

    if (status === 'granted') {
      Location.watchPositionAsync(LOCATION_SETTINGS, async (position) => {

        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        //when position changes, animate the marker
        coordinate.timing(newCoordinate).start();

        //and update the route at index 0

        this.setState({ currentCoordinates: newCoordinate });
        this.props.updateCoordinates(newCoordinate);


        if (initialPosition) {
          let geocode = await Location.reverseGeocodeAsync(newCoordinate);
          this.props.updateCity(geocode[0].city)
          console.log("Prima lettura coordinate: " + this.props.currentCity)

          initialPosition = !initialPosition
          this.updateCamera();
          await this.readAndDrawAreas();
        }






      });
    } else alert("Please give us the permission!")
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  async updateCamera() {

    //funziona solo cosi? pazzesco
    if (this.mapView !== null)
      this.mapView.animateCamera({ center: this.state.currentCoordinates, zoom: 14 }, { duration: 2000 });

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

    console.log(area.distance)


    if (this.props.showRoute)
      this.props.updateShowRoute(false);

    await this.props.updateTappedArea(area);

    setTimeout(() => { this.props.updateModalVisible(true) }, 200)

  }

  _showParkingRoute() {

    this.setState({ shouldFitMap: true })

    showMessage({
      message: "Calculating route to " + this.props.tappedArea.address,
      description: this.props.tappedArea.distance + ", " + this.props.tappedArea.time,
      type: "default",
      backgroundColor: "black", // background color
      color: "white", // text color
    });


    this.props.updateModalVisible(false);
    this.props.updateShowRoute(true);


  }

  _handlePayment() {

    this.props.updateModalVisible(false);
    this.props.navigation.navigate("Payment");
  }

  _centerMap() {

    //funziona solo cosi? pazzesco
    if (this.mapView !== null)
      this.mapView.animateCamera({ center: this.state.currentCoordinates, zoom: 14 }, { duration: 1000 });

  }

  _linkToGoogleMaps() {
    Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + this.props.tappedArea.latitude + ',' + this.props.tappedArea.longitude);
  }


  async handleSelection(details) {


    let geocode = await Location.reverseGeocodeAsync({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    });


    this.setState({
      destinationCoordinates: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      }
    });



    //qui serve il calcolo della città reale, ma le api sono fatte con il culo
    this.props.updateCity(geocode[0].city);

    this.readAndDrawAreas();


    if (this.mapView !== null)
      this.mapView.animateCamera({ center: this.state.destinationCoordinates, zoom: 14 }, { duration: 1000 });

  }

  async setModalVisible(visible) {
    this.setState({
      isModalVisible: visible,
    })
  }


  async updateDist() {

    /*first version (for..of)
    var tempAreas = this.props.areas;
    var newAreas = [];

    for (var area of tempAreas) {

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
    this.props.updateArea(newAreas)
    */


    //second version (standard for)
    var tempAreas = this.props.areas;
    var newAreas = [];
    console.log("LUNGHEZZA: " + tempAreas.length)

    for (var i = 0; i < tempAreas.length; i++) {

      try {
        let response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.currentCoordinates.latitude + ',' + this.state.currentCoordinates.longitude + '&destinations=' + tempAreas[i].latitude + ',' + tempAreas[i].longitude + '&key=' + GOOGLE_MAPS_APIKEY);
        let json = await response.json();

        tempAreas[i] = {
          ...tempAreas[i],
          distance: json.rows[0].elements[0].distance.text,
          time: json.rows[0].elements[0].duration.text
        };


        newAreas.push(tempAreas[i]);

        console.log(tempAreas[i])
      } catch (error) {
        console.error(error);

      };
    }

    this.props.updateArea(newAreas)
    this.props.updateAllAreas(newAreas)

  }


  render() {
    const { searchQuery } = this.state;
    const { navigation } = this.props;
    return (

      <View style={styles.container}>
        <TouchableOpacity
          style={{ alignItems: "flex-start", margin: 16, position: "absolute", backgroundColor: "#147c" }}
          onPress={this.props.navigation.openDrawer}
        >
          <FontAwesome5 name="bars" size={24} color="#161924" />
        </TouchableOpacity>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          maxZoomLevel={19}
          loadingEnabled={true}
          customMapStyle={this.props.darkTheme ? darkMapStyle : lightMapStyle}
          ref={ref => { this.mapView = ref }}
          initialRegion={initialRegion}
          showsUserLocation={false}
        >

          {this.props.circleRadius != 0 &&
            <MapView.Circle
              center={this.props.distanceFromUser ? this.state.currentCoordinates : this.state.destinationCoordinates}
              radius={this.props.circleRadius * 1000}
              fillColor="rgba(3, 166, 150,0.1)"
              strokeColor="rgba(3, 166, 150,0.2)"
            >
            </MapView.Circle>}



          {!this.state.isLoading && this.props.areas.map((area, index) => (

            <MapView.Marker key={index}
              stopPropagation={true}
              coordinate={{ latitude: area.latitude, longitude: area.longitude }}
              onPress={() => this.onAreaTapped(area)}>
              <FontAwesome5 name="parking" color="#FF9800" size={30} />
            </MapView.Marker>
          ))}


          {(this.state.destinationCoordinates != null) && (
            <MapView.Marker
              coordinate={{ latitude: this.state.destinationCoordinates.latitude, longitude: this.state.destinationCoordinates.longitude }}>
              <Animatable.View animation="bounceIn" duration={700} delay={2000} >
                <FontAwesome5 name="map-marker-alt" color="#FF9800" size={30} />
              </Animatable.View>
            </MapView.Marker>
          )}


          {(this.props.showRoute) && (
            <MapViewDirections
              origin={this.state.currentCoordinates}
              destination={{
                latitude: this.props.tappedArea.latitude,
                longitude: this.props.tappedArea.longitude
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="rgba(0,0,0,1)"
              optimizeWaypoints={true}

              onReady={result => {

                if (this.state.shouldFitMap) {
                  this.mapView.fitToCoordinates(result.coordinates), {
                    edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
                    animated: true,
                  };
                  this.setState({ shouldFitMap: false })
                }

              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}

            />
          )}

          <Marker.Animated
            ref={marker => { this.marker = marker; }}
            coordinate={this.state.coordinate}>
            <Icon name="circle-slice-8" size={24} color="#rgba(3, 166, 150,0.7)" />

          </Marker.Animated>


        </MapView>

        <Animatable.View animation="slideInDown" duration={800} delay={1700} style={{
          backgroundColor: '#fff', position: 'absolute', width: '80%', top: 50, alignSelf: 'center', shadowOpacity: 0.3, borderRadius: 0,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}>
          <GooglePlacesAutocomplete

            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details) => { // 'details' is provided when fetchDetails = true

              this.handleSelection(details);

            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: GOOGLE_MAPS_APIKEY,
              language: 'en', // language of the results
            }}

            styles={{
              container: {
                borderColor: '#fff',
                backgroundColor: "#fff",
                height: '100%',
              },
              poweredContainer: {
                width: 0,
                height: 0
              },
              powered: {
                width: 0,
                height: 0
              },
              loader: {
                width: '50%',
              },
              textInputContainer: {

                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderWidth: 10,
                borderColor: '#fff',
                backgroundColor: "#fff",
                height: 60,
                alignSelf: 'center',
              },
              description: {
                fontFamily: 'Montserrat',

                color: '#a5a5a5',
              },
              predefinedPlacesDescription: {
                color: '#DCDCDC',
              },
              textInput: {
                fontFamily: 'Montserrat',
                marginHorizontal: 20,
                marginTop: 0,
                borderWidth: 0,
                backgroundColor: "#fff",
                alignSelf: 'center',
                color: '#a5a5a5',
              }
            }}

            //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            //currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
            }}

            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: 'geometry',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


            renderLeftButton={() => <FontAwesome5 name="map-marker-alt" size={20} color="#D4D4D4" style={{ alignSelf: 'center', }} />}
            renderRightButton={() => <FontAwesome5 name="sliders-h" size={20} color="#D4D4D4" style={{ alignSelf: 'center', }} onPress={() => this.props.navigation.navigate("Filter")} />}
          />



        </Animatable.View>


        <Block>
          <Modal isVisible={this.props.isModalVisible} style={{ flex: 1, justifyContent: "flex-end", alignSelf: "center", width: '100%', height: '60%', }}
            onBackdropPress={() => { this.props.updateModalVisible(false) }}>
            <View style={{ flex: 0.4, backgroundColor: "#f8f8ff", borderRadius: 14, justifyContent: "space-between", width: '100%', marginVertical: -40, alignSelf: "flex-start" }}>
              <View style={{ justifyContent: "space-around", marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text h1 style={{ color: "#000", fontFamily: "Montserrat-Bold" }}>{this.props.tappedArea.address}</Text>
                    <Text style={{ color: "#000", fontFamily: "Montserrat-Bold", fontSize: 30 }}>{this.props.tappedArea.price != 0 && " € "}{this.props.tappedArea.price != 0 && this.props.tappedArea.price}{this.props.tappedArea.price == 0 && "Free"}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text h3 gray2 style={{ fontFamily: "Montserrat" }}>{this.props.tappedArea.distance}, {this.props.tappedArea.time}</Text>
                    {this.props.tappedArea.price != 0 &&
                      <Text h3 gray2 style={{ fontFamily: "Montserrat" }}>per hour</Text>
                    }
                  </View>
                  <View style = {{flexDirection:"row", paddingVertical: 10, alignItems:"baseline"}}>
                    <FontAwesome5 name ="parking" size = {30} color="rgba(3, 166, 150,0.5)">
                    </FontAwesome5>
                    <Text h1 secondary center style = {{fontFamily: "Montserrat-Bold"}}>  3</Text> 
                    <Text h2 secondary center secondary style = {{fontFamily: "Montserrat-Bold"}}> available spots</Text> 
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                      {this.props.tappedArea.nHandicap > 0 &&
                        <Icon name="wheelchair-accessibility" size={30} color="#6592F7" style={{ alignSelf: "center", paddingRight: 20 }} />
                      }
                      {this.props.tappedArea.nPregnant > 0 &&
                        <Icon name="human-pregnant" size={30} color="#FF69B4" style={{ alignSelf: "center", paddingRight: 20 }} />
                      }
                      {this.props.tappedArea.nElectric > 0 &&
                        <Icon name="car-electric" size={30} color="#FFD800" style={{ alignSelf: "center", paddingRight: 20 }} />
                      }
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Icon name="alert-circle-outline" color="#C02501" size={36} onPress={() => { this.props.updateModalVisible(false); this.props.navigation.navigate("Reports"); }} />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "column", position: "relative" }} >
                  <Text></Text>
                  <View style={{ flexDirection: "column", justifyContent:"center" }}>
                  <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
                    <Button style={styles.modalContent} onPress={this._showParkingRoute}>
                    <Icon name="directions" color="#0000FF" size={34} />
                    </Button>
                    <Button style={styles.modalContent} onPress={() => Linking.openURL('https://www.google.com/maps/dir/?api=1&destination=' + this.props.tappedArea.latitude + ',' + this.props.tappedArea.longitude)}>
                    <Image source = {require('../assets/icons/gmaps.png')} style = {{width: 30, height: 30}}/>
                    </Button>
                    </View>
                    <Button style={styles.pay} onPress={() => { this.props.updateModalVisible(false); this.props.navigation.navigate("Details"); }}>
                      {this.props.tappedArea.price != 0 && <Text h2 white bold >PAY PARKING</Text>}
                      {this.props.tappedArea.price == 0 && <Text h2 white bold >RESERVE PARKING</Text>}
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </Block>

        <Animatable.View animation="bounceIn" duration={800} delay={1000} style={{
          position: 'absolute', bottom: 30, elevation: 3, alignSelf: "center",
        }}>
          <Button style={styles.centerUser} onPress={this._centerMap}>
            <Icon name="crosshairs-gps" size={28} color="#fff" />
          </Button>
        </Animatable.View>
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
  centerUser: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
    top: 20,
    borderRadius: 25,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "center"
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
  labels: {
    width: 100,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    marginRight: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    height: 50,
    width: '45%',
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    alignSelf:"center"
  },
  pay: {
    backgroundColor: '#03A696',
    height: 50,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#03A696",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignSelf:"flex-end"
  },
  modalContentLowLeft: {
    backgroundColor: '#03A696',
    height: 40,
    width: 140,
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  modalContentLowRight: {
    backgroundColor: '#03A696',
    height: 65,
    width: 60,
    flexDirection: "column",
    //justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    shadowColor: '#03A696'
  }
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    distanceFromUser: state.distanceFromUser,
    circleRadius: state.circleRadius,
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);