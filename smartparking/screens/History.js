import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch, Divider } from "../components";
import * as Animatable from 'react-native-animatable';
import { Card } from 'galio-framework';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import { ScrollView } from 'react-native-gesture-handler';


const { width } = Dimensions.get('screen');


//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSections: [],
      animation: new Animated.Value(0),
    }

  }
  scrollY = new Animated.Value(0);
  diffClampScrollY = new Animated.diffClamp(this.scrollY, 0, HEADER_HEIGHT);
  headerY = new Animated.interpolate(this.diffClampScrollY,
    {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
    });

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.distance}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Text h3 bold gray2>Location</Text>
          <Text h3 bold>{section.address}</Text>
          <Text style={styles.headerText}></Text>
          <Text h3 bold gray2>Your parking time</Text>
          <Text h3 bold>10:30 - 12:30</Text>
          <Text style={styles.headerText}></Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text h3 bold gray2>Price</Text>
            <Text h1 secondary bold>{section.price} €</Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Text h3 bold gray2>Tokens</Text>
            <View style = {{flexDirection:"row", alignItems:"center"}}>
            <Text h1 secondary bold style = {{color:"#FFAB5B"}}>40</Text>
            </View>
          </View>
        </View>

        {/**
            <Text style={styles.headerText}></Text>
              <Text style={styles.headerText}>{section.distance}</Text>
              <Text style={styles.headerText}>{section.time}</Text>
             */}
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.price}</Text>
        <Text> PORCODSIDOSAOFSKIDJFC
        VSVVJDFVSDKFJC
        FDIJSFSAKJFAQXHACDUSCDIUCGNISJDGHFCYU
              </Text>

      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (

      <ScrollView style={{ flex: 1 , backgroundColor:"rgba(3, 166, 150,0.02)"}}>
        {/*
          <Animated.View style={{
              justifyContent: 'center', paddingTop: 25, paddingLeft: 20, position: 'absolute', left: 0, right: 0, top: 0, height: HEADER_HEIGHT, backgroundColor: 'white', zIndex: 1000, elevation: 1000, transform: [{ translateY: this.headerY }], shadowOpacity: 0.3,
    
              elevation: 6,
            }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 32 }}>
                Parkings
            </Text>
              <Text h3 style={{ fontFamily: "Montserrat" }} gray2>Choose the best parking for you</Text>
    
            </Animated.View> 
           */}
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <Text h2 gray2 style={{ fontFamily: "Montserrat-Bold" }}>Today</Text>
        </View>


        <Accordion
          touchableComponent={TouchableWithoutFeedback}
          duration={600}
          sections={this.props.areas}
          activeSections={this.state.activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    paddingHorizontal: theme.sizes.base * 2
  },
  cards: {
    width,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: "white",
    width: width - theme.sizes.base * 2,
    elevation: theme.sizes.base / 2,
    borderRadius: theme.sizes.base,
  },
  rounded: {
    borderRadius: theme.sizes.base,
  },
  header: {
    width: width - theme.sizes.base * 2,
    //alignItems: 'center',
    alignSelf: 'center',

    borderRadius: theme.sizes.base,
    elevation: theme.sizes.base / 2,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    mapRef: state.mapRef,
    showRoute: state.showRoute,
    areas: state.areas,
    tappedArea: state.tappedArea
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateModalVisible: (param) => dispatch({ type: "UPDATE_MODAL_VISIBLE", param: param }),
    updateShowRoute: (param) => dispatch({ type: "UPDATE_SHOW_ROUTE", param: param }),
    updateArea: (param) => dispatch({ type: "UPDATE_AREA", param: param }),
    updateTappedArea: (param) => dispatch({ type: "UPDATE_TAPPED_AREA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);