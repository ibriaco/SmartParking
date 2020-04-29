import React, { Component } from "react";
import { StyleSheet, View, Switch, ScrollView, KeyboardAvoidingView } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Block, Text, Button, Divider } from "../components";
import { theme, mocks } from "../constants";
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
    borderBottomColor: '#a5a5a5',

  },
});


export default class Example extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);

  render() {
    return (
      <ScrollView style={styles.header} scrollEnabled={false}>
        <Block top space="between" >
          <Text h1 bold>
            Payment Methods
          </Text>
          <Text></Text>
        </Block>
        <Divider/>
        <Text h2 bold>Paypal</Text>
        <Text></Text>
        <Input
              placeholder ="Email Address"
              right
              icon="envelope"
              family="font-awesome"
              iconSize={18}
              iconColor="#a5a5a5"
              style={styles.input}
            />
            <Text></Text>
          <Text h2 bold>
            Credit Card
          </Text>
          <Text></Text>
        <CreditCardInput
          autoFocus

          requiresName
          requiresCVC
          requiresPostalCode

          cardScale={1.0}
          labelStyle={s.label}
          inputStyle={s.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}

          onFocus={this._onFocus}
          onChange={this._onChange} />

       
        <Block bottom >
        <Button style = {styles.button} onPress = {()=>this.handleApply()}>
                <Text h1 bold white center>
                  Save
                </Text>
            </Button>
          
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.base * 4,
    //justifyContent: 'space-between',
    flex: 1
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    height: 60
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  },
  button:{
    backgroundColor: '#03A696',
    height: 60,
    borderRadius: 16,
    marginHorizontal: 45,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    marginBottom: 30,
    paddingHorizontal: theme.sizes.base * 2,
  },
});
