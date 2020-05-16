import React, { Component, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, TouchableWithoutFeedback, StatusBar } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Input, Icon } from "galio-framework"
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";
import * as firebase from 'firebase';
import PayPal from 'react-native-paypal-wrapper';
import axios from 'axios'
import qs from 'qs';
import { WebView } from 'react-native-webview';
import { Container, Header, Content, Tab, Tabs } from 'native-base';

const HEADER_HEIGHT = Platform.OS == 'ios' ? 55 : 100 + StatusBar.currentHeight;
const { width } = Dimensions.get('screen');


//When loading paypal page it refirects lots of times. This prop to control start loading only first time

class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
      isWebViewLoading: false,
      paypalUrl: '',
      accessToken: "",
      shouldShowWebViewLoading: true,
      currentAmount: 0,
      endDate: 0,

      showPicker: false,
      showModal: false,
      selectedTime: 0,
      timeInMS: 0,
      isTimeSelected: false,
      userProgress: 50,
      notificationsEnabled: false,
      scrollOffset: null,

      settings: {
        url: "https://api.sandbox.paypal.com/v1/oauth2/token",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": ["application/x-www-form-urlencoded", "application/x-www-form-urlencoded"],
          "Authorization": "Basic QVJNeGQzNHFFTkI0aDJwNlp6Q2dfQWFrQ1NLVzR4cmFQQVNITXJmcVZ1Wm4xRzRoV1pEZmtlNGI4UkVXQ2c4VHgxc3EtOGRtV05uak9HMmY6RUhfTzdLZmdGZm1VTU1hNzFWTWJMQXFpNHVRLWFxenBCMldFRXF2cWYwcTZNbjYwZ1RUOVNRMW9QOEotdzN0TUVSLWhZZFNMNk02dmNFQkc="
        },
        data: qs.stringify({
          "grant_type": "client_credentials"
        })
      }
    };
  }

  /*---Paypal checkout section---*/
  buyBook = async () => {

    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "26",
          "details": {
            "shipping": "6",
            "subtotal": "20",
            "shipping_discount": "0",
            "insurance": "0",
            "handling_fee": "0",
            "tax": "0"
          }
        },
        "description": "This is the payment transaction description",
        "payment_options": {
          "allowed_payment_method": "IMMEDIATE_PAY"
        }, "item_list": {
          "items": [{
            "name": "Book",
            "description": "Chasing After The Wind",
            "quantity": "1",
            "price": "20",
            "tax": "0",
            "sku": "product34",
            "currency": "USD"
          }]
        }
      }],
      "redirect_urls": {
        "return_url": "https://blank.org/",
        "cancel_url": "https://blank.org/"
      }
    }

    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: 'client_credentials'

    };

    const auth = {
      username: "ARMxd34qENB4h2p6ZzCg_AakCSKW4xraPASHMrfqVuZn1G4hWZDfke4b8REWCg8Tx1sq-8dmWNnjOG2f",  //"your_paypal-app-client-ID",
      password: "EH_O7KfgFfmUMMa71VMbLAqi4uQ-aqzpB2WEEqvqf0q6Mn60gTT9SQ1oP8J-w3tMER-hYdSL6M6vcEBG"   //"your-paypal-app-secret-ID


    };

    const options = {

      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Credentials': true
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url,
    };

    // Authorise with seller app information (clientId and secret key)
    axios(options).then(response => {
      this.setState({ accessToken: response.data.access_token })

      //Resquest payal payment (It will load login page payment detail on the way)
      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment`, dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        }
      )
        .then(response => {
          const { id, links } = response.data
          const approvalUrl = links.find(data => data.rel == "approval_url").href

          console.log("response", links)
          this.setState({ paypalUrl: approvalUrl })
        }).catch(err => {
          console.log({ ...err })
        })
    }).catch(err => {
      console.log(err)
    })
  };

  /*---End Paypal checkout section---*/

  onWebviewLoadStart = () => {
    if (this.state.shouldShowWebViewLoading) {
      this.setState({ shouldShowWebViewLoading: true })
    }
  }

  _onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState)

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == "") {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      this.setState({ shouldShowWebViewLoading: false })
    }

    if (webViewState.url.includes('https://blank.org/')) {

      this.setState({ paypalUrl: null })
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];


      axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.accessToken}`
          }
        }
      )
        .then(response => {
          this.setState({ shouldShowWebViewLoading: true })
          console.log(response)
          return;
        }).catch(err => {
          this.setState({ shouldShowWebViewLoading: true })
          console.log({ ...err })
        })

    }
  }




  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  handleScrollTo = p => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  render() {
    return (
      <Container style={{ marginTop: HEADER_HEIGHT, marginHorizontal: 20, }}>
        <View style={{ falignContent: "center", flexDirection: "row", alignItems: "center", }}>
          <Text style={{ fontSize: 32 }} bold>Parking details</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text h3 black style={{ fontFamily: 'Montserrat' }}>
            Choose all the options for your stop at
          </Text>

          <Text h2 secondary style={{ fontFamily: 'Montserrat' }}>
            {this.props.tappedArea.address}
          </Text>

          <Button style={{ backgroundColor: "black", width: '80%', alignSelf: "center", top: 10, marginBottom: 20 }} onPress={() => this.setState({ showPicker: true })}>
            <Text h3 white center style={{ fontFamily: 'Montserrat-Bold' }}>
              Select end time
          </Text>
          </Button>

          {this.state.isTimeSelected &&
            <Text h3 black center style={{ fontFamily: 'Montserrat-Bold' }}>
              From now to: {this.state.endDate}
            </Text>
          }
          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&
            <Text h2 secondary center style={{ fontFamily: 'Montserrat-Bold' }}>
              Price: {this.state.currentAmount.toFixed(2) + " €"}
            </Text>
          }



          {/**
           * {this.props.tappedArea.price > 0 &&

            <Input
              label="Vehicle Plate"
              placeholder="DX 999 SS"
              //editable={false}
              right
              icon="car"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
            />
          }
           */}



          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&

            <Text h3 black center style={{ fontFamily: 'Montserrat-Bold' }}>
              Bonus: {this.props.userData.bonus.toFixed(2)} €
            </Text>
          }
          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&

            <Text h2 secondary center style={{ fontFamily: 'Montserrat-Bold' }}>
              Total: {(this.state.currentAmount - this.props.userData.bonus).toFixed(2)} €
            </Text>
          }

          <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
          </Text>

          {this.props.tappedArea.price == 0 &&
            <Button style={{ backgroundColor: "gray" }} onPress={() => {

              //UPDATE NTAKEN FOR THE TAPPED AREA 

              var now = new Date()

              var reservation = {
                startDate: now.getTime(),
                endDate: now.getTime() + 1 * 3600000 ,
                amount: 0,
                parkingAddress: this.props.tappedArea.address,
                parkingCity: this.props.currentCity,
                earnedPoints: 0
              }

              firebase.database().ref('Users/' + this.props.userData.uid + "/reservations").push({
                
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                amount: reservation.amount,
                parkingAddress: reservation.parkingAddress,
                parkingCity: reservation.parkingCity,
                earnedPoints: reservation.earnedPoints

              });


              var userReservations = [];

              if(this.props.userData.reservations){
                userReservations = userReservations.concat(this.props.userData.reservations);
              } 

              userReservations.push(reservation);

              console.log(userReservations)


              var temp = this.props.reservationsArray;
              temp.push(reservation);
              this.props.updateReservationsArray(temp);


              var temp = {
                ...this.props.userData,
                reservations: userReservations
              }
              
              this.props.updateUserData(temp);

            }}>
              <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                Skip
              </Text>
            </Button>
          }

          {(this.state.isTimeSelected && this.props.tappedArea.price == 0) &&
            <Button style={{ backgroundColor: "orange" }} onPress={() => {
              //UPDATE NTAKEN FOR THE TAPPED AREA 

              var now = new Date()

              var reservation = {
                startDate: now.getTime(),
                endDate: this.state.endDate,
                amount: 0,
                parkingAddress: this.props.tappedArea.address,
                parkingCity: this.props.currentCity,
                earnedPoints: 10
              }

              firebase.database().ref('Users/' + this.props.userData.uid + "/reservations").push({
                
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                amount: reservation.amount,
                parkingAddress: reservation.parkingAddress,
                parkingCity: reservation.parkingCity,
                earnedPoints: reservation.earnedPoints

              });


              var userReservations = [];

              if(this.props.userData.reservations){
                userReservations = userReservations.concat(this.props.userData.reservations);
              } 

              userReservations.push(reservation);

              console.log(userReservations)


              var temp = this.props.reservationsArray;
              temp.push(reservation);
              this.props.updateReservationsArray(temp);


              var temp = {
                ...this.props.userData,
                points: this.props.userData.points + 10,
                reservations: userReservations
              }
              
              this.props.updateUserData(temp);

            }}>
              <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                Continue
    </Text>
            </Button>
          }

          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&
            <Button style={{ backgroundColor: "white", width: '80%', shadowOpacity: 0.5, alignSelf: "center" }} onPress={() => {
              
              this.props.navigation.navigate("Purchase");
              
              var now = new Date()

              var reservation = {
                startDate: now.getTime(),
                endDate: this.state.endDate,
                amount: (this.state.currentAmount - this.props.userData.bonus).toFixed(2),
                parkingAddress: this.props.tappedArea.address,
                parkingCity: this.props.currentCity,
                earnedPoints: this.state.currentPoints
              }

              firebase.database().ref('Users/' + this.props.userData.uid + "/reservations").push({
                
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                amount: reservation.amount,
                parkingAddress: reservation.parkingAddress,
                parkingCity: reservation.parkingCity,
                earnedPoints: reservation.earnedPoints

              });


              var userReservations = [];

              if(this.props.userData.reservations){
                userReservations = userReservations.concat(this.props.userData.reservations);
              } 

              userReservations.push(reservation);

              console.log(userReservations)


              var temp = this.props.reservationsArray;
              temp.push(reservation);
              this.props.updateReservationsArray(temp);


              var temp = {
                ...this.props.userData,
                points: this.props.userData.points + this.state.currentPoints,
                reservations: userReservations
              }
              
              console.log(temp)

              this.props.updateUserData(temp);
              
            }}>
              <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                Pay with Credit Card
    </Text>
            </Button>
          }

          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&
            <Button style={{ backgroundColor: "#3b7bbf", width: '80%', alignSelf: "center" }} onPress={() => {

              this.buyBook();

              var now = new Date()

              var reservation = {
                startDate: now.getTime(),
                endDate: this.state.endDate,
                amount: (this.state.currentAmount - this.props.userData.bonus).toFixed(2),
                parkingAddress: this.props.tappedArea.address,
                parkingCity: this.props.currentCity,
                earnedPoints: this.state.currentPoints
              }

              firebase.database().ref('Users/' + this.props.userData.uid + "/reservations").push({
                
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                amount: reservation.amount,
                parkingAddress: reservation.parkingAddress,
                parkingCity: reservation.parkingCity,
                earnedPoints: reservation.earnedPoints

              });


              var userReservations = [];

              if(this.props.userData.reservations){
                userReservations = userReservations.concat(this.props.userData.reservations);
              } 

              userReservations.push(reservation);

              console.log(userReservations)


              var temp = this.props.reservationsArray;
              temp.push(reservation);
              this.props.updateReservationsArray(temp);


              var temp = {
                ...this.props.userData,
                points: this.props.userData.points + this.state.currentPoints,
                reservations: userReservations
              }
              
              console.log(temp)

              this.props.updateUserData(temp);}}>


              <Text h2 white center style={{ fontFamily: 'Montserrat-Bold' }}>
                Pay with Paypal
    </Text>
            </Button>
          }



          <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
          </Text>


          {(this.state.isTimeSelected && this.props.tappedArea.price > 0) &&
            <View>
              <Text h3 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                With this payment you will get
    </Text>

              <Text h1 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                {(this.state.currentAmount - this.props.userData.bonus).toFixed(1) * 5}
              </Text>

              <Text h3 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                bonus points!
    </Text>

            </View>
          }


          {(this.state.isTimeSelected && this.props.tappedArea.price == 0) &&
            <View>
              <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                By telling us when you will leave you will get
    </Text>

              <Text h1 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                10
    </Text>

              <Text h2 black center style={{ fontFamily: 'Montserrat-Bold' }}>
                bonus points!
    </Text>

            </View>
          }

          {this.state.isTimeSelected &&
          <Progress.Bar progress={(this.props.userData.points / 100)} height={10} width={null} color="rgba(3, 166, 150,0.6)" />

          }
        </View>

        <DateTimePickerModal
          isVisible={this.state.showPicker}
          mode="time"
          date={new Date()}
          onCancel={() => this.setState({ showPicker: false })}
          onConfirm={(date) => {

            if (date >= new Date()){
            var x = ((((date.getTime() - (new Date()).getTime()) / 3600000) * this.props.tappedArea.price)); 
              this.setState({
                isTimeSelected: true,
                endDate: date.getTime(),
                currentAmount: x,
                currentPoints: (x - this.props.userData.bonus).toFixed(1) * 5,
                showPicker: false
              })

            }

            else
              this.setState({ showPicker: false })
          }} />




        {this.state.paypalUrl ? (
          <View style={styles.webview}>
            <WebView
              style={{ height: "100%", width: "100%" }}
              source={{ uri: this.state.paypalUrl }}
              onNavigationStateChange={this._onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              onLoadStart={this.onWebviewLoadStart}
              onLoadEnd={() => this.setState({ isWebViewLoading: false })}
            />
          </View>
        ) : null}
        {this.state.isWebViewLoading ? (
          <View style={{ ...StyleSheet.absoluteFill, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
            <ActivityIndicator size="small" color="#A02AE0" />
          </View>
        ) : null}

      </Container>
    );
  };
}

function mapStateToProps(state) {
  return {
    //state.areas gets data from the store
    //and we are mapping that data to the prop named areas
    reservationsArray: state.reservationsArray,
    currentCity: state.currentCity,
    userData: state.userData,
    tappedArea: state.tappedArea
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateReservationsArray: (param) => dispatch({ type: "UPDATE_RESERVATIONS_ARRAY", param: param }),
    updateUserData: (param) => dispatch({ type: "UPDATE_USER_DATA", param: param }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 2,
    //paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base * 1.2,
    height: theme.sizes.base * 1.2,
    borderRadius: theme.sizes.base * 1.2,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "white",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  button: {
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 20,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    marginBottom: 30,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    height: 40,
    width: 70,
    borderRadius: 8,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    marginBottom: 30,
  },
  filterButtonTriggered: {
    backgroundColor: 'rgba(3, 166, 150, 0.10)',
    borderWidth: 1,
    borderColor: "#03A696",
    height: 40,
    width: 70,
    borderRadius: 8,
    marginHorizontal: 45,
    marginBottom: 30
  },
  add: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    bottom: 60,
    position: "absolute"


  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    backgroundColor: "white",
    height: 300,
  },
  scrollableModalContent: {
    width: width - theme.sizes.base * 2,
    alignItems: 'center',
    alignSelf: 'center',

    borderRadius: theme.sizes.base,
    elevation: theme.sizes.base / 2,
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    marginBottom: 10
  },

  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

});
