import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Slider, TextInput } from 'react-native'

const window = Dimensions.get("window");

export default class Test extends Component {
    
render() {
    return(
      <View style={styles.containerStyle} >
        <View style={styles.sliderContainerStyle} >
            <View style = {styles.slider}>
            <TextInput
            placeholder="EMAIL"
            backgroundColor="#fff"></TextInput>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
containerStyle: {
    alignSelf: 'center',
    width: window.width,
    overflow: 'hidden',
    height: window.width / 1.7,
},
sliderContainerStyle: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -(window.width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
},
slider: {
    height: window.width / 1.7,
    width: window.width,
    position: 'absolute',
    bottom: 0,
    marginLeft: window.width / 2,
    backgroundColor: '#3EBB60',
    flex: 0.5,
    flexDirection:"column",
    justifyContent:"center"
}});


