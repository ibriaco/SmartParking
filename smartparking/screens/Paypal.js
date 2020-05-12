import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View, Platform} from 'react-native';
import { WebView } from 'react-native-webview';
import { paypalCheckoutHTML } from './paypalCheckout';

class PayPal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false
        }
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
          
            var patchedPostMessage = function(message, targetOrigin, transfer) { 
              originalPostMessage(message, targetOrigin, transfer);
            };
          
            patchedPostMessage.toString = function() { 
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
          
            window.postMessage = patchedPostMessage;
          };
          
          this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
          
      }
    componentWillMount(){
        this.setState({loading: true});
    }

    handleNavigation(event){
        console.log(event)
    }
    handleMessage(event){
        let data = event.nativeEvent.data;
        data = JSON.parse(data);
        if(data.status == 'success'){
            alert(data.reference);
            
        }else{
            this.setState({loading: false});
            alert('Failed, '+ data.message);
            
        }
        
    }
    passValues(){
        const { amount, paypalFundingDetails} = this.props;
        
        let data = {
            amount: 1,
        }
     
        if(!this.state.sent){
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({loading: false, sent: true});
        }
        
    }
    render() {
       
        return (
            <View style={{flex: 1}}>
             <WebView
               style={{overflow: 'scroll'}}
               source={{html: paypalCheckoutHTML()}}
               originWhitelist={["*"]}
               mixedContentMode={'always'}
               useWebKit={Platform.OS == 'ios'}
               onError={() => {alert('Error Occured'); }}
               onLoadEnd={() => this.passValues()}
               ref="webview"
               thirdPartyCookiesEnabled={true}
               scrollEnabled={true}
               domStorageEnabled={true}
               startInLoadingState={true}
               injectedJavaScript={this.patchPostMessageJsCode}
               allowUniversalAccessFromFileURLs={true}
               onMessage={(event) => this.handleMessage(event)}
               onNavigationStateChange={(event) => this.handleNavigation(event)}
               javaScriptEnabled={true}
             />
         </View>
        );

    }
}
function mapStateToProps(state) {
    return {    
      amount: state.amount,
    }
  }
  
export default connect(mapStateToProps, {})(PayPal);