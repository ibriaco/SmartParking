import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback, Platform, StatusBar } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail} from 'native-base'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch } from "../components";
import * as Animatable from 'react-native-animatable';


const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;

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
            <Animated.View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 25, position:'absolute', left:0, right:0, top:0, height: HEADER_HEIGHT, backgroundColor: 'rgba(255,255,255,0.8)', zIndex:1000, elevation:1000, transform: [{translateY: this.headerY}]}}>
              <Text h1 bold black>Parkings</Text>
            </Animated.View>                
           
            <Animated.ScrollView 
              showsVerticalScrollIndicator={false}
              style={{paddingTop: HEADER_HEIGHT}}
              contentContainerStyle= {{paddingBottom: HEADER_HEIGHT}}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={Animated.event([
                {
                  nativeEvent: {contentOffset:{y: this.scrollY}}
                }
              ])}>

                {this.props.areas.map((area, index) => (
                     <Animatable.View animation="slideInRight" duration={600} delay={100 + index * 400} key={index} style={{height: 300, margin: 20}}>
                         <Image source={area.image} style={{flex: 1, height: null, width: null, borderRadius:10}}></Image>
                         <Text h2 bold black >{area.address}</Text>
                         <Button
                            onPress={() => {
                               this.props.updateTappedArea(area);
                               this.props.updateShowRoute(true);
                               this.props.navigation.navigate("Home");
                            }}
                            color="#841584"
                        />
                     </Animatable.View>
                     ))}

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
  card: {
    borderRadius: 20,
    borderWidth: 10
  }
});

function mapStateToProps(state) {
    return {
      //state.areas gets data from the store
      //and we are mapping that data to the prop named areas
      showRoute: state.showRoute,
      areas: state.areas, 
      tappedArea: state.tappedArea
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      updateShowRoute: (param) => dispatch({type: "UPDATE_SHOW_ROUTE", param: param}), 
      updateArea: (param) => dispatch({type: "UPDATE_AREA", param: param}), 
      updateTappedArea: (param) => dispatch({type: "UPDATE_TAPPED_AREA", param: param}),    
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Parkings);
