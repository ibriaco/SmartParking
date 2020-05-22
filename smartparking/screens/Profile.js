import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container, Header, Content, Tab, Tabs, Footer, FooterTab } from 'native-base';
import { FontAwesome5 } from 'react-native-vector-icons';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null,
      profile: {},
    };
  };


  signOutUser() {
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
}


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
          style={{ borderBottomColor: "#d3d3d3", borderBottomWidth: 1, height: 30 }}
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  render() {
    const { profile, editing } = this.state;
    const { navigation } = this.props;

    return (
      <Block style={this.props.userData.darkMode ? styles.darkContainer : styles.container}>
        <View style={styles.header}>
            <View>
            <Text style={{ fontSize: 32, fontFamily: 'Helvetica-Bold', color:this.props.userData.darkMode ? "#FF9800" : "#000" }}>
              Profile
            </Text>
            <Text h3 secondary style={{ fontFamily: 'Montserrat' }}>Hello {this.props.userData.name}!</Text>
            </View>
            <View>
              <Text h2 style ={{color:"#FFAB5B", fontFamily: 'Montserrat',}} >{this.props.userData.points} points</Text>
            </View>

        </View>
        <View style={{paddingHorizontal: theme.sizes.base * 2, flex: 0.2, marginTop: 10, alignContent: "center", justifyContent: "space-between", flexDirection:"row" }}>
          <Text h1 bold style={{ fontFamily: 'Helvetica-Bold', color: this.props.userData.darkMode ? "#FF9800" : "#000" }}>Account</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: theme.sizes.base * 2, alignItems: "center" }}>
          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ fontFamily: 'Montserrat' }}>
                Email Address
                </Text>
              {this.renderEdit("email")}
            </Block>
            <Icon name = {editing === "email" ? "floppy" : "pencil-outline"} color="#03A696" size = {24} style = {{alignSelf:"flex-start"}} onPress={() => this.toggleEdit("email")}/>
          </Block>


          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ fontFamily: 'Montserrat' }}>
                Vehicle Plate
                </Text>
              {this.renderEdit("plate")}
            </Block>
            <Icon name = {editing === "plate" ? "floppy" : "pencil-outline"} color="#03A696" size = {24} style = {{alignSelf:"flex-start"}} onPress={() => this.toggleEdit("plate")}/>
          </Block>
          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ fontFamily: 'Montserrat' }}>
                Driving License
                </Text>
              {this.renderEdit("license")}
            </Block>
            <Icon name = {editing === "license" ? "floppy" : "pencil-outline"} color="#03A696" size = {24} style = {{alignSelf:"flex-start"}} onPress={() => this.toggleEdit("license")}/>
          </Block>
          <View style={{ flex: 0.1, marginTop: 10, alignSelf: "flex-start", justifyContent: "center", }}>
            <Text h1 style={{ fontFamily: 'Helvetica-Bold', color:this.props.userData.darkMode ? "#FF9800" : "#000" }}>Settings</Text>
          </View>
          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
            >
              <Text gray2 style={{ fontFamily: 'Montserrat' }}>Enable Notifications</Text>
              <Switch
                value={this.props.userData.notifications}
                onValueChange={value => {
                  this.props.updateUserData({
                    ...this.props.userData,
                    notifications: value
                  });

                  firebase.database().ref('Users/' + this.props.userData.uid).update({
                
                    notifications: value
            
                  });
                }}
              />
            </Block>
          </Block>
          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
            >
              <Text gray2 style={{ fontFamily: 'Montserrat' }}>Dark Mode</Text>
              <Switch
                value={this.props.userData.darkMode}
                onValueChange={value => {
                  this.props.updateUserData({
                    ...this.props.userData,
                    darkMode: value
                  });

                  firebase.database().ref('Users/' + this.props.userData.uid).update({
                
                    darkMode: value
            
                  });
                }}
              />
            </Block>

          </Block>
          
        </View>
        <View style={{ flex: 0.2, marginTop: 10, justifyContent: "space-between", alignItems:"center", flexDirection: "row", paddingHorizontal: theme.sizes.base * 2, }}>
            <Text secondary h1 style={{ fontFamily: 'Montserrat' }}>Logout</Text>
              <Icon name="exit-to-app" size = {32} color="#C02501" onPress = {()=>this.signOutUser()}/>
          </View>
          <Footer style={{ paddingHorizontal: 60, backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff" }}>
            <FooterTab style={{ backgroundColor: this.props.userData.darkMode ? "#303030" : "#fff", alignItems: "center" }}>
              {!this.props.userData.darkMode && <FontAwesome5 name="map" size={28} color="#CDCCCE" onPress={() => navigation.navigate("Home")}/>}
              {this.props.userData.darkMode && <FontAwesome5 name="map" size={28} color="#CDCCCE" onPress={() => navigation.navigate("Home")}/>}
              {this.props.userData.darkMode && <FontAwesome5 name="parking" size={28} color={"#CDCCCE"} onPress={() => navigation.navigate("ParkingsContainer")} />}
              {!this.props.userData.darkMode && <FontAwesome5 name="parking" size={28} color={"#CDCCCE"} onPress={() => navigation.navigate("ParkingsContainer")} />}
              {this.props.userData.darkMode && <FontAwesome5 name="user" size={28} color={"#FF9800"} onPress={() => navigation.navigate("Profile")} />}
              {!this.props.userData.darkMode && <FontAwesome5 name="user" size={28} color={"#000"} onPress={() => navigation.navigate("Profile")} />}
            </FooterTab>
          </Footer>

      </Block>
    );
  }
}

Profile.defaultProps = {
  profile: mocks.profile
};


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: theme.sizes.base * 4,
    paddingBottom: 10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.9)',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"

  },
  bottom: {
    paddingHorizontal: theme.sizes.base * 2,
    flexDirection: "column",
    paddingBottom: 20,
    alignSelf: "center",
    flex: 0.1
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    //marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    //alignItems: "flex-end"
    flex: 0.2
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
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    //paddingHorizontal: theme.sizes.base * 2,
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 0.2
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    alignSelf: "center",
    flexDirection: 'row'
  },
  container: {
    backgroundColor: "white",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1
  },
  darkContainer: {
    backgroundColor: "#202020",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1
  }
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    userData: state.userData,
    darkTheme: state.darkTheme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserData: (param) => dispatch({ type: "UPDATE_USER_DATA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);