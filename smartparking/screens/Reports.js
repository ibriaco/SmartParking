import React, { Component } from 'react'
import { StyleSheet, View, Image, Dimensions, Platform, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme, mocks } from "../constants";
import Animated from 'react-native-reanimated';
import { Button, Block, Text, Switch, Divider } from "../components";
import * as Animatable from 'react-native-animatable';
import { Checkbox } from 'galio-framework';
import Modal from "react-native-modal";

const { width } = Dimensions.get('screen');


//const HEADER_HEIGHT = Platform.OS == 'ios' ? 115 : 70 + StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS == 'ios' ? 145 : 100 + StatusBar.currentHeight;

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(0),
      reportSent: false,
    }

  }

  async handleSend(){

    //show modal
    this.setState({reportSent: true});

    //increment user points (in the local copy)
    //questo valore sarà quello collegato a PROGRESS della progressbar

    //and dismiss modal
    setTimeout(() => {
      setTimeout(() => {
        //this.props.updateUserData(this.props.userData.points + 10);
      }, 1000);
      this.setState({reportSent: false});
    }, 2000);


    //this.props.navigation.navigate("Home");
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
          Reports
        </Text>
        <Text h3 gray2>Make us know if there's something wrong</Text>

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

            <Animatable.View animation="slideInRight" duration={600} delay={100}>
            <View style = {{flexDirection:"column", justifyContent:"space-around"}}>
              <Checkbox label = "The price is different" style = {{paddingVertical: 20}} labelStyle={{fontSize: 20}} checkboxStyle={{borderColor:"#03A696", borderWidth: 2}}/>
              <Checkbox label = "The time is different" style = {{paddingVertical: 20}} labelStyle={{fontSize: 20}} checkboxStyle={{borderColor:"#03A696", borderWidth: 2}}/>
              <Checkbox label = "The road is unaccessible" style = {{paddingVertical: 20}} labelStyle={{fontSize: 20}} checkboxStyle={{borderColor:"#03A696", borderWidth: 2}}/>
              <Checkbox label = "The parking has been removed" style = {{paddingVertical: 20}} labelStyle={{fontSize: 20}} checkboxStyle={{borderColor:"#03A696", borderWidth: 2}}/>
            </View>
           

            </Animatable.View>
            <Block bottom style={{ marginBottom: 30 }}>

            <Animatable.View animation="bounceIn" duration={600} delay={100}>
            <Block bottom style = {{alignSelf:"flex-end"}}>
            <Button style={styles.button} onPress={() => this.handleSend()}>
              <Text h1 bold black center>
                Send
              </Text>
            </Button>
            </Block>
            
            </Animatable.View>

</Block>

            
            

            </Animated.ScrollView>

            <Modal isVisible={this.state.reportSent} style={{ flex: 0.5, justifyContent: "flex-end", alignSelf: "center", width: '100%',}}>
              
              <Animatable.View animation="bounceIn" duration={600} delay={200}>
                <Text h3 gray2>+ 10 points!</Text>
              </Animatable.View>

              <Animatable.View animation="bounceIn" duration={600} delay={200}>
                <Text h3 gray2>here the progress bar</Text>
              </Animatable.View>

            </Modal>
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
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
