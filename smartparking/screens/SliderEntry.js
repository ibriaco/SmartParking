import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import * as Font from 'expo-font';


export default class SliderEntry extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }
    
    async componentDidMount() {
      await Font.loadAsync({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      });
    
      this.setState({ fontLoaded: true });
    }
    

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={'rgba(255, 255, 255, 0.4)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle } } = this.props;

        
        

        return (
            
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask}/>
                </View>
                <View style={styles.textContainer}>

                {this.state.fontLoaded ? (
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                    { title.toUpperCase() }
                    </Text>
                ): null}
                {this.state.fontLoaded ? (
                    <Text
                      style={styles.subtitle}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                ): null}
                </View>
            </TouchableOpacity>
        );
    }
}