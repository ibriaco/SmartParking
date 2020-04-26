import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput, View, FlatList } from "react-native";
import Slider from "react-native-slider";
import Card from "react-native-elements"

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";



class Filter extends Component {
    
  state = {
    hour: 0,
    minute: 0,
    type: 0
  };


  handleApply() {
    const { navigation } = this.props;

    navigation.navigate("Home");
  }


  handleClose() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }

  onChange = (event, selectedDate) => {
    console.log(selectedDate)
  };

  onCardChange(form) {
      console.log(form);
  }

  renderCard = item => {
    <Card image={item} />
  }

  render() {

    return (
    <View style = {styles.container}>
      <Block style = {{marginTop: 30}}>
        <Block flex={false} row center space="between" style={styles.header}>
        
          <Text center h1 bold black >
            Payment methods
          </Text>
          
        </Block>

          <Block style={styles.sliders}>
       

            
          </Block>
          <CreditCardInput onChange={this.onCardChange} />

          
          <Block bottom>
          <Button style = {styles.button} onPress = {()=>this.handleApply()}>
                <Text h1 bold secondary center>
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
    backgroundColor: theme.colors.accent
  },
  button:{
    backgroundColor: '#ffffff',
    height: 60,
    borderRadius: 16,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    marginBottom: 30
  },
});
