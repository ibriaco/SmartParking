import React from "react";

import { View, Text } from "react-native";


export default class ParkCard extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
    <View>
    <View
      style={{
        width: "100%",
        padding: 16,
        backgroundColor: "rgb(255, 255, 255)"
      }}
    >
      <Text
        style={{
          fontSize: 12,
          marginBottom: 5,
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        {this.props.item.distance}, {this.props.item.time}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "rgb(51, 51, 51)"
        }}
      >
        {this.props.item.address} 
      </Text>
    </View>
  </View>
);}}