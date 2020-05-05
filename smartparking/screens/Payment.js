import React, { Component } from 'react';
import {View, StyleSheet,} from 'react-native'
import {Block, Text, Button} from '../components'
import { Container, Header, Content, List, ListItem,Thumbnail, Left, Body, Right, Switch, Form, Picker } from 'native-base';
import { theme } from "../constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ListIconExample extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block padding={[0, theme.sizes.base * 2]} style={{justifyContent:"space-between", top: 50}}>
      <Text bold style = {{fontSize: 32}}>
      Payment Methods
      </Text>
      <Text h3 gray2>Add and edit your payment methods</Text>
      <View style = {{flex: 0.1}}></View>
      <Container>
         <Content>
          <List itemDivider={true} style = {{top: 10, alignContent:"space-between", backgroundColor:"#fff"}}>
            <ListItem thumbnail style = {styles.itemList}>
              <Left style = {{alignSelf:"center"}}>
                <Icon name ="credit-card" size = {29} color = "#423189" style = {{alignSelf:"flex-start"}}/>
              </Left>
              
              <Body>
                <Text bold>Card Number</Text>
                <Text note numberOfLines={1}>4242 4242 4242 4242</Text>
              </Body>
              <Right >
                <Icon name ="pencil-outline" color="#03A696" size = {24} style = {{alignSelf:"flex-start"}}/>
              </Right>
              <Right >
                <Icon name ="heart" color="#FF6347" size = {24} style = {{alignSelf:"flex-start"}}/>
              </Right>
            </ListItem>
            <ListItem thumbnail style = {styles.itemList}>
              <Left>
                <Icon name ="paypal" size = {29} color="#3b7bbf"/>
              </Left>
              <Body>
                <Text bold>Email Address</Text>
                <Text note numberOfLines={1}>info@paypal.com</Text>
              </Body>
              <Right >
                <Icon name ="pencil-outline" color="#03A696" size = {24} style = {{alignSelf:"flex-start"}}/>
              </Right>
              <Right >
                <Icon name ="heart-outline" color="#000" size = {24} style = {{alignSelf:"flex-start"}}/>
              </Right>
            </ListItem>
           
            
            
            
          </List>
        </Content>
      </Container>
     

      <View >
      <Button style = {styles.add}>
        <Icon name="plus" size = {42} color="#03A696" style = {{alignSelf:"center", fontWeight:"bold", }} onPress={()=>this.props.navigation.navigate("CardPage")}/>
      </Button>
      </View>
    </Block>
      
    );
  }
}

const styles = StyleSheet.create({
  add: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignSelf:"flex-end",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 6,
    bottom: 60
  },
  itemList: {
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3, 
    backgroundColor:"#fff",
    borderRadius: 10,
    marginBottom: 5,
  }
})
