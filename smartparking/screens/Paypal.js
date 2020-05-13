import React, { Component } from 'react'
import {
    View,
    WebView,
    ActivityIndicator
} from 'react-native'
import axios from 'axios'
const qs = require('qs');

const url = 'https://api.sandbox.paypal.com/v1/oauth2/token';

const data = {
  
  grant_type: 'client_credentials'
  
};

const auth = {

  username: 'AWTXlwkP0FG2LXsu78_UzNz2nlbB99ks5_28PnAd8LBZL3wWAk2x98xz_fpIBl7eP671MvHseIxAsuu-',
    password: 'EJ15MZGb9CGuLNRk1mSJFxG0JddgyDPWiMIyi9wMX5U0E3N3wPjfC2zBnY9ffUt0OOVvhKfL0YlTVHE_'
  
};

const options = {

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': true
  },
  data: qs.stringify(data),
  auth: auth,
};
export default class Paypal extends Component {

    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null
    }


    componentDidMount() {
        axios.post(url, {options}).then((response) => {

            console.log(response);
        
        }).catch((err) => {console.log(err);});
    }

    _onNavigationStateChange = (webViewState) => {

        if (webViewState.url.includes('https://example.com/')) {

            this.setState({
                approvalUrl: null
            })

            const { PayerID, paymentId } = webViewState.url

            axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: PayerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.accessToken}`
                    }
                }
            )
                .then(response => {
                    console.log(response)

                }).catch(err => {
                    console.log({ ...err })
                })

        }
    }

    render() {

        const { approvalUrl } = this.state
        return (
            <View style={{ flex: 1 }}>
                {
                    approvalUrl ? <WebView
                        style={{ height: 400, width: 300 }}
                        source={{ uri: approvalUrl }}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{ marginTop: 20 }}
                    /> : <ActivityIndicator />
                }
            </View>
        )
    }
}