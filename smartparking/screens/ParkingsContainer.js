import React, { Component } from 'react';
import { Platform, StatusBar, View} from 'react-native'
import { Container, Header, Content, Tab, Tabs, Footer, FooterTab, Button } from 'native-base';
import Parkings from './Parkings';
import { theme, mocks } from "../constants";
import ActiveParkings from './ActiveParkings';
import History from './History'
import { Text, Block } from '../components';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from 'react-native-vector-icons';


const HEADER_HEIGHT = Platform.OS == 'ios' ? 45 : StatusBar.currentHeight;

class ParkingsContainer extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { navigation } = this.props;
    
    return (
      <Container style={{ paddingTop: HEADER_HEIGHT, backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}>
          <View style = {{flex: 0.1, alignContent:"center", flexDirection:"row", alignItems:"center", marginHorizontal:30, backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}>
            <Text style = {{fontSize: 32, fontFamily: "Helvetica-Bold", color:this.props.userData.darkMode ? "#FF9800" : "#000"}} >Parkings</Text>
          </View>
        <Tabs activeTabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} style = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} tabBarUnderlineStyle={{backgroundColor:"#03A696", height: 3}} noShadow tabContainerStyle={{elevation:0, }}>
          <Tab heading="Available" style={{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} textStyle={{color:"#C7CCD5", fontSize:16, fontFamily: "Montserrat", }} activeTextStyle={{color:this.props.userData.darkMode ? "#FF9800" : "#000", fontSize:16 , fontFamily:"Montserrat-Bold"}} tabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff", borderWidth: 0}} activeTabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}  >
            <Parkings navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Active" style={{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} textStyle={{color:"#C7CCD5", fontSize:16, fontFamily: "Montserrat", }} activeTextStyle={{color:this.props.userData.darkMode ? "#FF9800" : "#000", fontSize:16 , fontFamily:"Montserrat-Bold"}} tabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff", borderWidth: 0}} activeTabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}  >
            <ActiveParkings navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="History" style={{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}textStyle={{color:"#C7CCD5", fontSize: 16, fontFamily: "Montserrat"}} activeTextStyle={{color:this.props.userData.darkMode ? "#FF9800" : "#000", fontSize:16, fontFamily:"Montserrat-Bold"}} activeTabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} tabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}} activeTabStyle = {{backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff"}}>
          <History/>
          </Tab>
        </Tabs>
        <Footer style={{ paddingHorizontal: 60, backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff" }}>
            <FooterTab style={{ backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff", alignItems: "center" }}>
              {!this.props.userData.darkMode && <FontAwesome5 name="map" size={28} color="#CDCCCE" onPress={() => navigation.navigate("Home")}/>}
              {this.props.userData.darkMode && <FontAwesome5 name="map" size={28} color="#CDCCCE" onPress={() => navigation.navigate("Home")}/>}
              {this.props.userData.darkMode && <FontAwesome5 name="parking" size={28} color={"#FF9800"} onPress={() => navigation.navigate("ParkingsContainer")} />}
              {!this.props.userData.darkMode && <FontAwesome5 name="parking" size={28} color={"#000"} onPress={() => navigation.navigate("ParkingsContainer")} />}
              {this.props.userData.darkMode && <FontAwesome5 name="user" size={28} color={"#CDCCCE"} onPress={() => navigation.navigate("Profile")} />}
              {!this.props.userData.darkMode && <FontAwesome5 name="user" size={28} color={"#CDCCCE"} onPress={() => navigation.navigate("Profile")} />}
            </FooterTab>
          </Footer>

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    activeParking: state.activeParking,
    userData: state.userData,
    mapRef: state.mapRef,
    showRoute: state.showRoute,
    areas: state.areas,
    tappedArea: state.tappedArea
  }
}


export default connect(mapStateToProps)(ParkingsContainer);