import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import { connect } from 'react-redux';
import {  Platform, StatusBar } from 'react-native'

const HEADER_HEIGHT = Platform.OS == 'ios' ? 45 : StatusBar.currentHeight;
class PurchaseProduct extends Component {

  // Called everytime the URL stats to load in the webview
  onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

    console.log(nativeEvent)
    
    if (nativeEvent.url === STRIPE.SUCCESS_URL )  {
        this.props.navigation.navigate("Home");
        return;
    }
    if( nativeEvent.url === STRIPE.CANCELED_URL) {
      this.props.navigation.navigate("Home");
      return;
  }
  };

render(){
  return (      
    <WebView
      style={{marginTop: HEADER_HEIGHT}}
      originWhitelist={['*']}
      source={{ html: stripeCheckoutRedirectHTML(this.props.userData.email) }}
      onLoadStart={this.onLoadStart}
    />
  );
};
  
};

function mapStateToProps(state) {
  return {    
    userData: state.userData,
  }
}

export default connect(mapStateToProps)(PurchaseProduct);