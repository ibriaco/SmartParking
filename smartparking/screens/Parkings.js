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

const { width } = Dimensions.get('screen');


//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class Parkings extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  
    render() {
        return (
          
          <View style={{flex: 1}}>
            <Animated.View style={{justifyContent: 'center', paddingTop: 25, paddingLeft: 20, position:'absolute', left:0, right:0, top:0, height: HEADER_HEIGHT, backgroundColor: 'white', zIndex:1000, elevation:1000, transform: [{translateY: this.headerY}], shadowOpacity: 0.3,
    
    elevation: 6,}}>
               <Text bold style={{ fontSize: 32 }}>
          Parkings
        </Text>
        <Text h3 gray2>Choose the best parking for you</Text>

            </Animated.View>                
           
            <Animated.ScrollView  
              contentContainerStyle={styles.cards}
              showsVerticalScrollIndicator={false}
              style={{paddingTop: HEADER_HEIGHT}}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={Animated.event([
                {
                  nativeEvent: {contentOffset:{y: this.scrollY}}
                }
              ])}>

                {this.props.areas.map((area, index) => (
                     <Animatable.View animation="slideInUp" duration={600} delay={100 + index * 300} key={index} style={{flex: 1, margin: 10}}>
                         <TouchableWithoutFeedback onPress={() => {
                              this.props.mapRef.animateCamera({ center: {latitude: area.latitude, longitude: area.longitude}, zoom: 18 }, { duration: 1000 });
                              this.props.updateTappedArea(area);
                              this.props.updateShowRoute(false)
                              this.props.navigation.navigate("Home");
                            }}>
                         <Card
                            flex
                            borderless
                            shadowColor="black"
                            style={styles.card}
                            title={area.distance + ", " + area.time}
                            avatar="https://i.imgur.com/dQGKmRZ.png"
                            caption={area.price != 0 ? area.price + " €/h" : "FREE"}
                            location={area.address} 
                            image={area.image.uri}
                            imageStyle={styles.rounded}
                            imageBlockStyle={{ padding: theme.sizes.base / 2 }}
                        >


                          <View style={{ flexDirection: "column", justifyContent: "center", alignSelf:"center"}}>
               
                            <FontAwesome5 name="parking" size={24} color="rgba(3, 166, 150,0.5)"> <Text h3 bold secondary> 3</Text><Text title>/10 spots</Text></FontAwesome5>
                          </View>
                            
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>

                            {area.nHandicap > 0 &&
                              <Button style={styles.labels}>
                                <Text>disables</Text>
                              </Button>
                            }

                            {area.nPregnant > 0 &&
                              <Button style={styles.labels}>
                                <Text>pregnant</Text>
                              </Button>
                            }
                            
                            {area.nElectric > 0 &&
                              <Button style={styles.labels}>
                                <Text>electric</Text>
                              </Button>
                            }
                            
                          </View>
              
                        </Card>
                        </TouchableWithoutFeedback>
                         {/*
                         
                         <Image source={area.image} style={{flex: 1, height: null, width: null, borderRadius:10}}></Image>
                         <Text h2 bold black >{area.address}</Text>
                         <Button
                            onPress={() => {
                               this.props.updateTappedArea(area);
                               this.props.updateShowRoute(true);
                               this.props.navigation.navigate("Home");
                            }}

                            style = {styles.route}
                        >
                          <Text white center bold h3>Show Route</Text>
                        </Button>

                          */}


                     </Animatable.View>
                     ))}
                     {this.props.areas.length == 0 && <Animatable.View animation="slideInUp" duration={600} delay={100} style={{flex: 1, margin: 10}}>
                     <FontAwesome5 name="times" size={30} color="red" style={{paddingTop:30}}><Text h1 style={{color: "red"}}> There are no parkings!</Text></FontAwesome5>

                     <Text>Please change location, destination or try using different filter paramenters!</Text>

                     </Animatable.View>
}

            </Animated.ScrollView>
          </View>
        );
    }
}


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base * 4
  },
  container: {
    paddingHorizontal: theme.sizes.base * 2
  },
  cards: {
    width,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: HEADER_HEIGHT
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
  labels: {
    width: 55,
    height: 20,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    marginHorizontal: 10
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
      updateModalVisible: (param) => dispatch({type: "UPDATE_MODAL_VISIBLE", param: param}), 
      updateShowRoute: (param) => dispatch({type: "UPDATE_SHOW_ROUTE", param: param}), 
      updateArea: (param) => dispatch({type: "UPDATE_AREA", param: param}), 
      updateTappedArea: (param) => dispatch({type: "UPDATE_TAPPED_AREA", param: param}),    
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Parkings);
