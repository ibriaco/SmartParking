import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ListScreen extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount(){
    console.log("moooooounttt")
  }


    render() {

        return (
          <View style={styles.container}>
            
            <Text>{this.props.navigation.getParam()}</Text>
          
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38BC7C',
      flexDirection: 'column',
      alignItems: 'center'
    },
    logo: {
      width: 80,
      height: 80,
      position: 'absolute',
      top: 250
    },
    title: {
      width: 300,
      height: 200,
      position: 'absolute',
      top: 250,
      left: 50
    }
  });
