import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import colours from '../config/colours';
import TitleHeading from '../components/TitleHeading';
// https://wallpapercave.com/w/wp3082346

const WelcomeScreen = ({navigation}) => {
  const handleOnPress = () => {
    navigation.navigate('List of Awesome Git Repos');
  };

  return (
    <View style={styles.homeContainer}>
      <TitleHeading>Awesome Github!</TitleHeading>
      <ImageBackground
        style={styles.background}
        source={require('../assets/WelcomeImage2.jpg')}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleOnPress}>
          <Text style={styles.buttonText}> Embrace the Awesomeness!</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1.0,
  },
  background: {
    flex: 1.0,
    width: '100%',
    justifyContent: 'flex-end',
    resizeMode: 'contain',
  },
  buttonStyle: {
    flex: 1,
    position: 'absolute',
    bottom: 50,
    backgroundColor: colours.secondary,
    padding: 10,
    borderRadius: 30,
    width: '55%',
    alignSelf: 'center',
  },
  buttonText: {
    color: colours.primary,
    fontSize: 26,
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
