import React from 'react';
import {View, StyleSheet} from 'react-native';
import colours from '../config/colours';

export default function Separator(props) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: colours.secondary,
  },
});
