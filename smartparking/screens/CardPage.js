import React, { Component } from 'react';
import {View, StyleSheet, Image} from 'react-native'
import {Block, Text, Button} from '../components'
import { Container, Header, Content, Form, Picker } from 'native-base';
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreditCardInput } from "react-native-credit-card-input";
import {Input} from 'galio-framework'

const s = StyleSheet.create({
    switch: {
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    container: {
      backgroundColor: "#ffff",
      marginTop: 60,
    },
    label: {
      color: "#a5a5a5",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "#a5a5a5",
      borderTopWidth: 0,
      borderBottomWidth: 0,
      textDecorationLine: "underline"
    },
  });


export default class CardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected: "key0"
        };
      }
      onValueChange(value: string) {
        this.setState({
          selected: value,
          paypalCard: !this.state.paypalCard
        });
      }

    state = { paypalCard: false,
    selected: "" };
    //_setUseLiteCreditCardInput = (paypalCard) => this.setState({ paypalCard });
    _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    _onFocus = (field) => console.log("focusing", field);

    render(){
        const { navigation } = this.props;

        return (
            <Block padding={[0, theme.sizes.base * 2]} style={{top: 50, flex: 1}}>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text bold style = {{fontSize: 28}}>
            Select payment method
            </Text>
            <Icon name="close" size = {28} style={{alignSelf:"center",}} onPress={()=>this.props.navigation.goBack()}/>
            </View>
            <Text></Text>
            <View style = {{flex: 0.2}}>
       
        <Content>
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined, }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Credit Card" value="key0" />
              <Picker.Item label="Paypal" value="key1" />
            </Picker>
          </Form>
        </Content>
      </View>
      <View style = {{flex: 0.8}}>

       { this.state.paypalCard ?
          (
            <View>
           <Input
              placeholder="Full Name"
              right
              icon = "user"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
              style={styles.paypal}
            />
            <Input
              placeholder ="Email Address"
              right
              icon="envelope"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
              style={styles.paypal}
            />
            <Input
              password
              viewPass
              iconColor ="#a5a5a5"
              iconSize = {20}
              placeholder="Password"
              style={[styles.paypal]}
            />
            </View>
          ) : (
              <View style = {{width: '90%', alignSelf:"center"}}>
            <CreditCardInput
              requiresCVC
              cardScale={1.0}
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"green"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
              </View>
          )
        }
        <Block bottom style = {{flex: 0.8, justifyContent:"flex-end", flexDirection:"column"}}>
            <Button style = {styles.button} onPress = {()=>this.props.navigation.goBack()}>
                <Text h1 bold white center>Save</Text>
            </Button>
        </Block>
      </View>
          </Block>
        )
    }
}

const styles = StyleSheet.create({
    paypal: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        elevation: 3,
        height: 60
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
    }
})
