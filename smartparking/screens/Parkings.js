import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Container, Content, Card, CardItem, Thumbnail, Button } from 'native-base'
import Text from "../components/Text";
import { FontAwesome5 } from 'react-native-vector-icons';

export default class Parkings extends Component {
    render() {
        return (
            <Container style={{ marginVertical: 20 }}>
                <Content>
                    <Card>
                        <CardItem >
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem >
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem >
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem >
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem >
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text bold h2>Corso XXV Aprile, 1</Text>
                        </CardItem>

                        <CardItem cardBody>
                            <Image style={{ resizeMode: 'cover' }} source={require('../assets/images/xxv.jpg')} />
                        </CardItem>

                        <CardItem>
                            <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({})
