import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Image, Dimensions, KeyboardAvoidingView } from 'react-native'
import { Button } from 'galio-framework';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Welcome extends Component {
    
    render() {
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: wp(1),
                padding: hp(10),
              }}>
        
                <View style={styles.container}>
                  <Text style={styles.titleLeft}>Smart<Text style={styles.titleRight} >Parking</Text></Text>
                  <Text style={styles.subtitle}>Simplify your life.</Text>
                  
                </View>
                <View style={styles.buttons}>
                  <Button style={styles.button} color="#009688" size="small">
                    <Text style = {{color:'#ffffff', fontSize: wp(6), fontWeight:'400'}}>Login</Text>
                  </Button>
                  <Button style={styles.button} color="#FCFCFC"size="small">
                    <Text style = {{color: '#212121', fontSize: wp(6), fontWeight:'400'}}>Sign up</Text>
                  </Button>
                  <Text style={{ textAlign: 'center', padding: hp(2),fontSize:wp(4), color:'#BDBDBD'}}>Terms of service</Text>
                </View>
              </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },
    titleLeft: {
      fontFamily: 'sans-serif',
      fontSize: wp(13),
      fontWeight: 'bold',
      color: '#212121'
    },
    titleRight: {
      fontFamily: 'sans-serif',
      fontSize: wp(13),
      fontWeight: 'bold',
      color: '#009688'
  
    },
    subtitle: {
      fontFamily: 'sans-serif',
      fontSize: wp(6),
      fontWeight: 'normal',
      color: '#BDBDBD',
    },
    logo: {
      flex: 10,
      padding: hp(10),
      alignItems: 'center',
      //justifyContent: 'flex-start'
    },
    buttons: {
      flex: 0.35,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    button: {
      borderRadius: hp(2),
      padding: hp(4.5)
    }
  });
