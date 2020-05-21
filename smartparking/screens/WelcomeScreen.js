import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { ENTRIES1 } from './entries';
import { images } from './images';
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends Component {
  static navigationOptions = {
    header: null, 
  }

  constructor(props) {
    super(props);
    this.state = {

      show_App: false

    };
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderItem = ({ item, dimensions }) => (   
    <View style={styles.mainapp}>
        <Image style={styles.image} source={item.image}/> 
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        
        </View>
  );

  onDone = () => {
    this.props.navigation.navigate('Login');
  };

  onSkip = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    if (this.state.show_App) {
      return (
        <View style={styles.mainapp}>

          <Text style={{ textAlign: 'center', fontSize: 20, color: '#fff' }}>

            This is your main App .

          </Text>

        </View>
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          onDone={this.onDone}
          onSkip={this.onSkip}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      );
    }
  }
}
const styles = StyleSheet.create({

  mainapp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 50,
    //backgroundColor: "#38BC7C",
    backgroundColor:"#03A696"
    //flexDirection: 'row'
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 32,
    color: '#fff',
    //fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    opacity: 1,
    //alignItems: 'flex-end',
    marginBottom: 10
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#fff',
    fontSize: 20,
    opacity: 0.8,
    backgroundColor: 'transparent',
    textAlign: 'center'

  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginTop: 80
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    title:'Search',
    key: 's1',
    text: 'Explore the map, the list or choose your destination.\n We will find all parking slots nearby',
    //image: require("../assets/animations/search.gif"),
    image: require("../assets/icons/search.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    //backgroundColor: 'rgba(13,182,101, 0.9)',
    backgroundColor: "#38BC7C"
  },
  {
    title:'Payment',
    key: 's2',
    text: 'Pay in a few touches with any payment system\n\n',
    image: require("../assets/icons/payment.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: 'rgba(13,182,101, 0.9)',
  },
  {
    title:'Time',
    key: 's3',
    text: 'Save your time searching the perfect parking, pay and extend your stop\nwhenever you want',
    image: require("../assets/icons/time.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: 'rgba(13,182,101, 0.9)',
  },
  {
    title:'Reports',
    key: 's4',
    text: 'If something is wrong, let us know with a simple report.\nThis helps the other users\n',
    image: require("../assets/icons/report.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: 'rgba(13,182,101, 0.9)',
  },
  {
    title:'Reward',
    key: 's5',
    text: 'For every payment,report and stop you will get some points you can convert in bonus €\n',
    image: require("../assets/icons/points.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: 'rgba(13,182,101, 0.9)',
  },
];



//------------------------------------------------------------------
/*
import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ENTRIES1 } from './entries';
import { images } from './images';
import { Dimensions, View, Text, Image, StyleSheet} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class MyCarousel extends Component {

    _renderItem ({item, index}) {
      let x = item.title; 
      if(x == 'search')
     {
        return (
            <View style={styles.container}>
              <Image source={images.search.uri}/> 
              <Text>{item.title}</Text>
            </View>
            
              );
     }
     else if(x == 'pay'){
      return (
        <View style={styles.container}>
          <Image source={images.pay.uri}/> 
          <Text>{item.title}</Text>
        </View>
        
          );
     }
     else{
      return (
        <View style={styles.container}>
          <Image source={images.time.uri}/> 
          <Text>{item.title}</Text>
        </View>
        
          );
     }
    }

    render () {
        return (
            <Carousel
              data={ENTRIES1}
              renderItem={this._renderItem}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              slideStyle={{ width: viewportWidth }}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
            />
        );
    }
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
});
*/

















/*
//-------------------------------------fdgdfshsdf---------------------------------------------
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { images } from './images';
import { ENTRIES1 } from './entries';



const styles = StyleSheet.create({
  mainContent: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});


export default class WelcomeScreen extends React.Component {
  _renderItem = ({ item, dimensions }) => (
    <View style={styles.mainContent, dimensions}>
                <Image source={images.time.uri}/> 

      
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        </View>
  );

  render() {
    return <AppIntroSlider slides={ENTRIES1} renderItem={this._renderItem}  />;
  }
}
*/