import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import {SearchBar} from 'react-native-elements';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class Map extends Component {

  static navigationOptions = {
    header: null,
  }

  state =  {

      focusedLocation: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          Dimensions.get("window").width /
          Dimensions.get("window").height *
          0.0122
      },
      locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });

  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("Fetching the Position failed, please pick one manually!");
  },
  {enableHighAccuracy: true})
  }

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          region={!this.state.locationChosen ? this.state.focusedLocation : null}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsCompass = {true}
          showsUserLocation = {true}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
        <Icon
            name="home"
            size={25}
            style={{ color: '#000' }}
            onPress = {()=>this.props.navigation.navigate('Home')}
          />
          <Icon
            name="cog"
            size={25}
            style={{ color: '#000' }}
          />
          <Icon
            name="car"
            size={25}
            label="HELLO" 
            style={{ color: '#000' }}
            onPress = {this.getLocationHandler}
          />
          <Icon
            name="user-circle"
            size={25}
            style={{ color: '#000' }}
            onPress = {()=>this.props.navigation.navigate('Profile')}

          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar:{
    height: "10%",
    marginHorizontal: widthPercentageToDP(10),
    marginTop: heightPercentageToDP(5),
    backfaceVisibility: "hidden",
    backgroundColor: "transparent",
    borderRadius: 20
  },
  map: {
    width: "100%",
    height: "85%"
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: heightPercentageToDP(1),
    backgroundColor: '#fff',
    height: "5%"
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    
  }
});