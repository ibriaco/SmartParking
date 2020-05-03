import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput, View } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Picker, DatePicker } from 'react-native-wheel-pick';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAQYSx-AfOH9myf-veyUCa38l7MTQ77NH8';


class Filter extends Component {

  state = {
    maxPrice: 0.00,
    maxDistance: 0,
    maxTime: 0,
    minAvailability: 0,
    type: 0,
    hSpot: false,
    sSpot: false,
    eSpot: false
  };

  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  async handleApply() {

    await this.applyFilters();
    this.props.navigation.navigate("Home");   

  }
  
  async applyFilters(){

    var tempAreas = this.props.allAreas;

/*
    for (var area of tempAreas){
      if(area.price > this.state.maxPrice){
        tempAreas.remove(area);
        continue;
      }

      if(area.distance > this.state.maxDistance){
        tempAreas.remove(area);
        continue;
      }

      if(area.time > this.state.maxTime){
        tempAreas.remove(area);
        continue;
      }

      if(this.state.type == "free" && area.price != 0){
        tempAreas.remove(area);
        continue;
      }

      if(this.state.type == "pay" && area.price == 0){
        tempAreas.remove(area);
        continue;
      }

      
      if(this.state.hSpot && area.nHandicap == 0){
        tempAreas.remove(area);
        continue;
      }

      if(this.state.pSpot && area.nPregnant == 0){
        tempAreas.remove(area);
        continue;
      }

      if(this.state.eSpot && area.nElectric == 0){
        tempAreas.remove(area);
        continue;
      }

      
    };
*/
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
                maximumTrackTintColor="rgba(212, 212, 212, 0.10)"
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
              
              {/*
              <Picker
                style={{ backgroundColor: 'white', width: 300, height: 215 }}
                selectedValue='item4'
                pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
                onValueChange={value => { }}
                itemSpace={30} // this only support in android
              />
              */}

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
                maximumTrackTintColor="rgba(212, 212, 212, 0.10)"
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
                maximumTrackTintColor="rgba(212, 212, 212, 0.10)"
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
    allAreas: state.allAreas,
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
