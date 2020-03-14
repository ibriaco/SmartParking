import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Search extends Component{    
    constructor(props){
      super(props);
    }
 
    onChangeText = (newText) => {
      //your custom logic here
      console.log(newText);
    }
 
    render(){    
     return(
      <View style={styles.Container}>
       <SearchHeader 
         onChangeText={this.onChangeText}
       />
      </View>
     );
    }
  }
 
  const styles = StyleSheet.create({
    Container:{
     flex:1,
    },
   StatusBar:{
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    backgroundColor:'#171F33'
   }
 });