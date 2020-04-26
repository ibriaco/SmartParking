import React, { Component } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Button } from 'native-base'
import Text from "../components/Text";
import { FontAwesome5 } from 'react-native-vector-icons';
import { connect } from 'react-redux';

class Parkings extends Component {
    render() {
        return (
            <Container style={{ marginVertical: 20 }}>
                <Content >
                     {this.props.areas.map((area, index) => (
                         <TouchableWithoutFeedback onPress={() => console.log("diocane")}>
                         <Card key={index} >
                         <CardItem >
                             <Text bold h2>{area.address}</Text>
                         </CardItem>
 
                         <CardItem cardBody>
                             <Image style={{height: 150, width: null, flex: 1}} source={area.image} />
                         </CardItem>
 
                         <CardItem>
                            <Text>{area.id}</Text>
                         </CardItem>
                        
                     </Card>
                     </TouchableWithoutFeedback>
                     ))}
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
      //state.areas gets data from the store
      //and we are mapping that data to the prop named areas
      areas: state.areas, 
      tappedArea: state.tappedArea
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      updateArea: (param) => dispatch({type: "UPDATE_AREA", param: param}), 
      updateTappedArea: (param) => dispatch({type: "UPDATE_TAPPED_AREA", param: param}),    
    }
  }
const styles = StyleSheet.create({})

export default connect(mapStateToProps, mapDispatchToProps)(Parkings);
