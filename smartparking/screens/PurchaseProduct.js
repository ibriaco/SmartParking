import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { STRIPE } from './stripeSettings';
import { stripeCheckoutRedirectHTML } from './stripeCheckout';
import { View } from "react-native";



class PurchaseProduct extends Component {


  // Called everytime the URL stats to load in the webview
  onLoadStart = (syntheticEvent) => {
      console.log("eccolooo")
    const { nativeEvent } = syntheticEvent;
    
    if (nativeEvent.url === STRIPE.SUCCESS_URL) {
        this.props.navigation.navigate("Details")
      return;
    }
    if (nativeEvent.url === STRIPE.CANCELED_URL) {
        this.props.navigation.navigate("Details")
    }
  };

render(){
  return (
      
    <WebView
      originWhitelist={['*']}
      source={{ html: stripeCheckoutRedirectHTML() }}
      onLoadStart={this.onLoadStart}
    />
  );
};
  
};

export default PurchaseProduct;