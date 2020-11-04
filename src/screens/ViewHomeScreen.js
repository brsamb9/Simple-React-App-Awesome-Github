import React from 'react';
import {View} from 'react-native';

import colours from '../config/colours';
// import TitleHeading from '../components/TitleHeading';
import SearchFilter from '../components/SearchFilter';

const ViewHomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <TitleHeading>List of Awesome Git Repos</TitleHeading> */}
      <SearchFilter style={{flex: 1}} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colours.primary,
  },
};

export default ViewHomeScreen;
