import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput, View } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';



class Filter extends Component {
  state = {
    initialAddress:"",
    initialPrice: 0,
    initialDistanceRange: 0,
    initialTimeRange: 0,
    initialAvailability: 0,
    initialType: 0,

    address: "",
    price: 0.00,
    distanceRange: 2,
    timeRange: 4,
    availability: 0,
    type: 0
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;

    this.setState({ profile });
  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;

    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  async handleApply() {
    const { navigation } = this.props;

    //fetch all areas from the db in the selected city
    await this.readAreas();

    //calculate distance and time for all the areas
    await this.updateDist();

    //iterate areas to apply filters
    this.applyFilters();


    navigation.navigate("Home");
  }

  async readAreas() {

    firebase.database().ref('Cities/' + this.props.currentCity + '/Areas').on('value', (snapshot) => {
      this.props.updateArea(snapshot.val());
    })   

  }

  async updateDist(){

    var tempAreas = this.props.areas;
    var newAreas = [];
    for (var area of tempAreas){
     
      try {
      let response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.props.userCoordinates.latitude + ',' + this.props.userCoordinates.longitude + '&destinations=' + area.latitude + ',' + area.longitude + '&key=' + GOOGLE_MAPS_APIKEY);
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
    console.log(this.props.areas)

  }

  applyFilters(){
    var tempAreas = this.props.areas;
    var newAreas = [];

    for (var area of tempAreas){
      if(area.price < this.state.price){
        newAreas.push(area);

      }
    };

    this.props.updateArea(newAreas)

  }

  handleClose() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }

  render() {
    const { profile, editing } = this.state;

    return (
    <View style = {styles.container}>
      <Block style = {{marginTop: 30}}>
        <Block flex={false} row center space="between" style={styles.header}>
        <Button style = {{backgroundColor: '#fff'}}>
              <Icon
                  name = "times"
                  color = "#fff"
                  size = {24}
              />
          </Button>
          <Text center h1 bold >
            Filter
          </Text>
          <Button style = {{backgroundColor: '#fff', height: 40}} onPress = {()=>this.handleClose()}>
              <Icon
                  name = "times"
                  color = "#000"
                  size = {24}
              />
          </Button>
        </Block>

          <Block style={styles.sliders}>
            <Block margin={[10, 0]}>
              <Text h2 bold style={{ marginBottom: 10, }}>
                Maximum Price
              </Text>
              <Slider
                minimumValue={0.00}
                maximumValue={5.00}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 8, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.gray}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.price}
                step={0.50}
                onValueChange={value => this.setState({ price: value })}
              />
              <Text h2 bold right>
                {this.state.price}€
              </Text>
                <Text></Text>
              <Text h2 bold style={{ marginBottom: 10, }}>
                Distance
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={6}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 8, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.gray}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.distanceRange}
                step={1}

                onValueChange={value => this.setState({ distanceRange: value })}
              />
              <Text h2 bold right>
                {this.state.distanceRange} km
              </Text>
              <Text h2 bold style={{ marginBottom: 10, }}>
                Time
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={60}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 8, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.gray}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.timeRange}
                step={1}

                onValueChange={value => this.setState({ timeRange: value })}
              />
              <Text h2 bold right>
                {this.state.timeRange} min
              </Text>
              <Text></Text>
              <Text h2 bold style={{ marginBottom: 10,  }}>
                Availability
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={2}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 8, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.gray}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.availability}
                step={1}
                onValueChange={value => this.setState({ availability: value })}
              />
              <Text h2 bold right>
                {this.state.availability == 0 && "Low"}{this.state.availability == 1 && "Medium"}{this.state.availability == 2 && "High"} 
              </Text>
            </Block>
            
          </Block>


          <Block bottom>
          <Button style = {styles.button} onPress = {()=>this.handleApply()}>
                <Text h1 bold white center>
                  Save
                </Text>
            </Button>
          </Block>
      </Block>
      </View>
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
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.gray
  },
  button:{
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 16,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    marginBottom: 30
  },
});
