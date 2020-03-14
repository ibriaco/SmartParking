import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {SearchBar} from 'react-native-elements'

export default class SearchHeader extends Component<{}>{


    render(){
  
      return(
        <View style={styles.Container} >
        <SearchBar
          containerStyle={{backgroundColor:'white', margin:0,padding:0,borderWidth:0,borderBottomWidth:0}}
          inputStyle={{backgroundColor: 'white',paddingLeft:36,fontSize:16,color:'#171F33'}}
          lightTheme
          round
          onChangeText={this.onChangeText}
          icon={{style:{color:'black', fontSize:22 ,margin:0}}}
          placeholder='Search..' />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    Container:{
      flex:1
    }
  });
