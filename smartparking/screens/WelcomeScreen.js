/*import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, UIManager } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ENTRIES1 } from './entries';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import stylesC, { colors } from './index.style';
import * as Font from 'expo-font';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const data = []
const SLIDER_1_FIRST_ITEM = 0;

export default class WelcomeScreen extends Component {
 
  constructor (props) {
    super(props);
    this.state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        fontLoaded: false
    };
}

async componentDidMount() {
  await Font.loadAsync({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  this.setState({ fontLoaded: true });
}


  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
      <View style={{ height: viewportHeight }} />
        <SliderEntry
          data={item}
          parallax={true}
          parallaxProps={parallaxProps}
        />
        </View>
    );
}

  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.title}>
        {this.state.fontLoaded ? (
          <Text style={{ color: '#fff', fontFamily: 'Montserrat-Regular', fontSize: 35,  }}>
            SmartParking
          </Text>
        ) : null }
        {this.state.fontLoaded ? (
          <Text style={{ color: '#fff', fontFamily: 'Montserrat-Regular', fontSize: 18,  }}>
            Simplify your life.
          </Text>
        ) : null }
        </View>
        <View style={styles.middle}>

          <Carousel
          ref={c => this._slider1Ref = c}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={15}
          containerCustomStyle={stylesC.slider}
          contentContainerCustomStyle={stylesC.sliderContentContainer}
          loop={true}
          loopClonesPerSide={3}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }/>
        <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={this.state.slider1ActiveSlide}
                  //containerStyle={styles.paginationContainer}
                  dotColor={'rgba(250, 250, 250, 1)'}
                  dotStyle={stylesC.paginationDot}
                  inactiveDotColor={"white"}
                  inactiveDotOpacity={0.8}
                  inactiveDotScale={0.5}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
        
        </View>
        
        <View style={styles.bottom}>
        {this.state.fontLoaded ? (
          <Button
            title="Get Started"
            type="solid"
            buttonStyle={{ paddingHorizontal: widthPercentageToDP(16), paddingVertical: heightPercentageToDP(2), borderRadius: 25, backgroundColor: '#ffffff' }}
            titleStyle={{ color: '#000000', fontFamily: 'Montserrat-Regular', fontSize: 20}}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          ) : null }
          {this.state.fontLoaded ? (
          <Button
            title="Terms of Service"
            type="clear"
            buttonStyle={{ paddingHorizontal: widthPercentageToDP(18), paddingVertical: heightPercentageToDP(2), }}
            titleStyle={{ color: '#ffff', fontFamily: 'Montserrat-Regular', fontSize: 18 }}
          />
          ) : null }
        </View>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: heightPercentageToDP(5),
    backgroundColor: '#009788'
  },
  title: {
    height: HEIGHT / 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    height: HEIGHT * (15 / 30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    height: HEIGHT / 6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
})
*/

//--------------------------------------------------------------

import React, { Component } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import { ENTRIES1 } from './entries';
import { images } from './images';

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
          showSkipButton={true}
          onSkip={this.onSkip}
          
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
    padding: 100,
    backgroundColor: "#38BC7C"
    //flexDirection: 'row'
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
    opacity: 1,
    //alignItems: 'flex-end',
    marginBottom: 10
  },
  text: {
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
    marginBottom: 80
  }
});

const slides = [
  {
    title:'Search',
    key: 's1',
    text: 'Choose your destination\nand we will find an available\nparking slot nearby',
    image: require("../assets/images/comp_1.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    //backgroundColor: 'rgba(13,182,101, 0.9)',
    backgroundColor: "#38BC7C"
  },
  {
    title:'Payment',
    key: 's2',
    text: 'Pay in a few touches\nwith any payment system',
    image: require("../assets/images/comp_2.png"),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: 'rgba(13,182,101, 0.9)',
  },
  {
    title:'Time',
    key: 's3',
    text: 'Save your time searching\nthe perfect parking',
    image: require("../assets/images/comp_2.png"),
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