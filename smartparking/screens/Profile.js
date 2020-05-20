import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { TouchableOpacity } from "react-native-gesture-handler";


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dark: false,
      editing: null,
      profile: {},
    };
  };

  getStyle = function (dTheme) {
    return {
      backgroundColor: dTheme ? "black" : "white",
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1
    }
  }

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
      <Block style={[this.getStyle(this.props.darkTheme)]}>
        <View style={styles.header}>
          <View>
            <Text bold style={{ fontSize: 32 }}>
              Profile
          </Text>
            <Text h3 secondary>Hello Ibrahim!</Text>
          </View>

        </View>
        <View style={{paddingHorizontal: theme.sizes.base * 2, flex: 0.2, marginTop: 10, alignContent: "center", justifyContent: "space-between", flexDirection:"row" }}>
          <Text h1 bold style={{  }}>Account</Text>
        </View>
        <View style={{ flex: 1, paddingHorizontal: theme.sizes.base * 2, alignItems: "center" }}>
          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2 >
                Email Address
                </Text>
              {this.renderEdit("email")}
            </Block>
            <Text
              medium
              secondary
              onPress={() => this.toggleEdit("email")}
            >
              {editing === "email" ? "Save" : "Edit"}
            </Text>
          </Block>


          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2>
                Vehicle Plate
                </Text>
              {this.renderEdit("plate")}
            </Block>
            <Text
              medium
              secondary
              onPress={() => this.toggleEdit("plate")}
            >
              {editing === "plate" ? "Save" : "Edit"}
            </Text>
          </Block>
          <Block row space="between" style={styles.inputRow}>
            <Block>
              <Text gray2 >
                Driving License
                </Text>
              {this.renderEdit("license")}
            </Block>
            <Text
              medium
              secondary
              onPress={() => this.toggleEdit("license")}
            >
              {editing === "license" ? "Save" : "Edit"}
            </Text>
          </Block>
          <View style={{ flex: 0.1, marginTop: 10, alignSelf: "flex-start", justifyContent: "center", }}>
            <Text h1 bold>Settings</Text>
          </View>
          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
            >
              <Text gray2>Enable Notifications</Text>
              <Switch
                value={this.state.dark}
                onValueChange={value => {
                  this.setState({ dark: value })
                  this.props.updateDarkTheme(value);
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
              <Text gray2>Dark Mode</Text>
              <Switch
                value={this.state.dark}
                onValueChange={value => {
                  this.setState({ dark: value })
                  this.props.updateDarkTheme(value);
                }}
              />
            </Block>

          </Block>
          
        </View>
        <View style={{ flex: 0.2, marginTop: 10, justifyContent: "space-between", alignItems:"center", flexDirection: "row", paddingHorizontal: theme.sizes.base * 2, }}>
            <Text secondary h1 bold>Logout</Text>
              <Button style = {styles.modalContent} onPress = {()=>this.signOutUser()}>
              <Icon name="exit-to-app" size = {32} color="#C02501"/>
              </Button>
          </View>

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
});

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    darkTheme: state.darkTheme
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDarkTheme: (param) => dispatch({ type: "UPDATE_DARK_THEME", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);