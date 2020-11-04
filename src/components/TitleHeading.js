import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colours from '../config/colours';

const TitleHeading = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: colours.primary,
  },
  header: {
    color: colours.secondary,
    fontSize: 45,
  },
});

export default TitleHeading;
