import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch, Divider } from "../components";
import * as Animatable from 'react-native-animatable';
import { Card } from 'galio-framework';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';

const { width } = Dimensions.get('screen');


//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class ParkingsNoImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
      activeSections: [],
      collapsed: true
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
        <Text style={styles.headerText}>{section.address}</Text>
        <Text style={styles.headerText}>{section.distance}</Text>
        <Text style={styles.headerText}>{section.time}</Text>


      </View>
    );
  };

  _renderContent(section, i, isActive, sections) {
    return (
      <View style={styles.content}>
        <Animatable.Text
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : "zoomOut"}>
          Diooooooooooooooooooooooooooooooooooooooo
          canklfenkwejhfoxiuch
              </Animatable.Text>
        <Animatable.Text
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : "zoomOut"}>
          Diooooooooooooooooooooooooooooooooooooooo
          canklfenkwejhfoxiuch
              </Animatable.Text>

      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };


  render() {
    return (

      <Container style={{ flex: 1, backgroundColor:"rgba(3, 166, 150,0.02)" }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ collapsed: !this.state.collapsed })}>

          <View style={styles.header}>
          <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
          <Text h3 bold gray2>Location</Text>
            <Text h3 bold>Via Fabrizio de André, 8</Text>
            <Text style={styles.headerText}></Text>
            <Text h3 bold gray2>Vehicle</Text>
            <Text h3 bold>AB 456CD</Text>
            <Text style={styles.headerText}></Text>
            <Text h3 bold gray2>Start</Text>
            <Text h3 bold>14.30</Text>
            <Text style={styles.headerText}></Text>
          </View>
          <View style = {{flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between"}}>
            <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
            <Text h3 bold gray2>Your parking time</Text>
            <Text h1 secondary bold>02:30:40</Text>
            </View>
            <View style = {{flexDirection:"column", alignItems:"flex-start"}}>
              <Text h3 bold gray2>Price</Text>
              <Text h1 secondary bold>5 €</Text>
            </View>
          </View>
          </View>
        </TouchableWithoutFeedback>
        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>

            <Text style={{ textAlign: 'center' }}>
              Gestisci il tuo parking
              </Text>
            <Button style={styles.end}>
              <Text center white bold h2>Stop parking</Text>
            </Button>
          </View>
        </Collapsible>


      </Container>
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
    width: '95%',
    elevation: theme.sizes.base / 2,
    borderRadius: theme.sizes.base,
  },
  rounded: {
    borderRadius: theme.sizes.base,
  },
  labels: {
    width: 100,
    height: 25,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    marginHorizontal: 10
  },
  end: {
    backgroundColor: '#03A696',
    height: 60,
    width: '95%',
    alignSelf: "center",
    borderRadius: 10,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  extend: {
    backgroundColor: '#4c03a6',
    height: 60,
    width: '80%',
    alignSelf: "center",
    borderRadius: 16,
    marginHorizontal: 25,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    width: width - theme.sizes.base * 3,
    //alignItems: 'center',
    alignSelf: 'center',

    borderRadius: theme.sizes.base / 2,
    elevation: theme.sizes.base / 2,
    shadowOpacity: 0.5,
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkingsNoImage);