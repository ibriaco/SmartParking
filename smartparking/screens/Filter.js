import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput, View } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import Icon from 'react-native-vector-icons/FontAwesome';

class Filter extends Component {
  state = {
    budget: 1,
    monthly: 2,
    weekly: 4,
    notifications: true,
    newsletter: false,
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

  handleApply() {
    const { navigation } = this.props;
    navigation.navigate("Home");
  }

  render() {
    const { profile, editing } = this.state;

    return (
    <View style = {styles.container}>
      <Block style = {{marginTop: 30}}>
        <Block flex={false} row center space="between" style={styles.header}>
        <Button style = {{backgroundColor: '#0DB665'}}>
              <Icon
                  name = "times"
                  color = "#0DB665"
                  size = {24}
              />
          </Button>
          <Text center h1 bold white >
            Filter
          </Text>
          <Button style = {{backgroundColor: '#0DB665', height: 40}} onPress = {()=>this.handleApply()}>
              <Icon
                  name = "times"
                  color = "#fff"
                  size = {24}
              />
          </Button>
        </Block>

          <Block style={styles.sliders}>
            <Block margin={[10, 0]}>
              <Text h3 white style={{ marginBottom: 10, opacity: 0.8 }}>
                Price
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={10}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.white}
                maximumTrackTintColor="rgba(255, 255, 255, 0.40)"
                value={this.state.budget}
                onValueChange={value => this.setState({ budget: value })}
              />
              <Text h3 white right>
                10€
              </Text>
                <Text></Text>
              <Text h3 white style={{ marginBottom: 10, opacity: 0.8 }}>
                Range
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={6}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.white}
                maximumTrackTintColor="rgba(255, 255, 255, 0.40)"
                value={this.state.monthly}
                onValueChange={value => this.setState({ monthly: value })}
              />
              <Text h3 white right>
                6 km
              </Text>
              <Text></Text>
              <Text h3 white style={{ marginBottom: 10, opacity: 0.8 }}>
                Availability
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={9}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={theme.colors.white}
                maximumTrackTintColor="rgba(255, 255, 255, 0.40)"
                value={this.state.weekly}
                onValueChange={value => this.setState({ weekly: value })}
              />
              <Text h3 white right>
                High
              </Text>
            </Block>
          </Block>


          <Block bottom>
          <Button style = {styles.button} onPress = {()=>this.handleApply()}>
                <Text h3 bold secondary center>
                  Apply
                </Text>
            </Button>
          </Block>
      </Block>
      </View>
    );
  }
}

Filter.defaultProps = {
  profile: mocks.profile
};

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0DB665',
    },
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
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
  button:{
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 10,
    marginHorizontal: 25,
    marginBottom: 30
  },
});
