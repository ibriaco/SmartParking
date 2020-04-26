import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

class Profile extends Component {
  state = {
    darkmode: true,
    editing: null,
    profile: {}
  };

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
      <Block>
        <Block flex={false} top space="between" style={styles.header}>
          <Text h1 bold>
            Profile
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Full Name
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

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Street Address
                </Text>
                {this.renderEdit("street")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("street")}
              >
                {editing === "street" ? "Save" : "Edit"}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Phone Number
                </Text>
                {this.renderEdit("phone")}
              </Block>
              <Text
                medium
                secondary
                onPress={() => this.toggleEdit("phone")}
              >
                {editing === "phone" ? "Save" : "Edit"}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
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

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Plate Number
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
                value={this.state.darkmode}
                onValueChange={value => this.setState({ darkmode: value })}
              />
            </Block>

          </Block>
          <Block style = {styles.toggles}>

          <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text h3 bold>Logout</Text>
              <Button style = {{backgroundColor:"#fff", width: 30, height:30}} center>
              <Icon
                name ="sign-out"
                size = {24}
              />

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

export default Profile;

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
  }
});
