import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dark: false,
      editing: null,
      profile: {},
    };
  };

  getStyle = function(dTheme) {
    return {
      backgroundColor: dTheme ? "black" : "white",
      flexDirection: "column", 
      justifyContent:"space-between"
    }
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
        />
      );
    }

    return <Text bold>{profile[name]}</Text>;
  }

  render() {
    const { profile, editing } = this.state;

    return (
      <Block style={[this.getStyle(this.props.darkTheme)]}>
        <Block flex={false} top space="between" style={styles.header}>
          <Text bold style = {{fontSize:32}}>
            Profile
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  FULL NAME
                </Text>
                {this.renderEdit("fullname")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("fullname")}
              >
                {editing === "fullname" ? "Save" : "Edit"}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  DRIVING LICENSE
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

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  PLATE NUMBER
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


          </Block>

          
          <Divider />

          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
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
          <Block style={styles.toggles}>
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
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
          <Block style = {styles.toggles}>

          <Block bottom
            >
             <Button style = {styles.modalContent}>
               <Text h2 bold>LOGOUT   </Text>
               <Icon name="exit-to-app" size = {26}/>
             </Button>
            </Block>
          </Block>

        </ScrollView>
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
    paddingVertical: theme.sizes.base * 4
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    //marginTop: theme.sizes.base * 0.7,
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
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    alignSelf:"center",
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
    updateDarkTheme: (param) => dispatch({type: "UPDATE_DARK_THEME", param: param}), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);