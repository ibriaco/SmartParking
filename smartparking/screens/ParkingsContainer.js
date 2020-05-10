import React, { Component } from 'react';
import {Text, Platform, StatusBar} from 'react-native'
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Parkings from './Parkings';
import { theme, mocks } from "../constants";
import ActiveParkings from './ActiveParkings';
import History from './History'

export default class TabsExample extends Component {
  render() {
    return (
      <Container style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Tabs activeTabStyle = {{backgroundColor:"#fff"}} style = {{backgroundColor:"#fff"}} tabBarUnderlineStyle={{backgroundColor:"#03A696"}} >
          <Tab heading="Available" style={{backgroundColor:"#fff"}} textStyle={{color:"#000", fontSize:16 }} activeTextStyle={{color:"#03A696", fontSize:16 , fontWeight:"bold"}} tabStyle = {{backgroundColor:"#fff"}} activeTabStyle = {{backgroundColor:"#fff"}} style = {{backgroundColor:"#fff"}} >
            <Parkings />
          </Tab>
          <Tab heading="Active" style={{backgroundColor:"#fff"}} textStyle={{color:"#000", fontSize: 16}} activeTextStyle={{color:"#03A696", fontSize: 16, fontWeight:"bold"}} activeTabStyle = {{backgroundColor:"#fff"}} tabStyle = {{backgroundColor:"#fff"}} style = {{backgroundColor:"#fff"}}>
            <ActiveParkings/>
          </Tab>
          <Tab heading="History" style={{backgroundColor:"#fff"}}textStyle={{color:"#000", fontSize: 16}} activeTextStyle={{color:"#03A696", fontSize:16, fontWeight:"bold" }} activeTabStyle = {{backgroundColor:"#fff"}} tabStyle = {{backgroundColor:"#fff"}} style = {{backgroundColor:"#fff"}}>
          <History/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}