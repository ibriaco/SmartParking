import React, { Component } from 'react'
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
        <SliderEntry
          data={item}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
}

  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <ImageBackground source={require('../assets/sfondo2.png')} style={styles.container}>

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


      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: heightPercentageToDP(5),
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


