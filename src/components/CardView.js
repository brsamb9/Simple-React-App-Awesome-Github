import React, {useEffect, useState} from 'react';

import {View, Text, Linking, Button} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import colours from '../config/colours';
import Separator from './Seperator';
import api from '../api/index';

import Modal from 'react-native-modal';
import HTMLView from 'react-native-htmlview';
import {ScrollView} from 'react-native-gesture-handler';

const CardView = ({item}) => {
  const [readmeData, setReadme] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateReadMe = () => {
    return (
      <View style={{flex: 1}}>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1, backgroundColor: colours.primary}}>
            <Button title="Hide README.md" onPress={toggleModal} />
            <ScrollView>
              <HTMLView value={readmeData} />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <Text style={style.title} onPress={() => Linking.openURL(item.url)}>
        {item.repo}
      </Text>
      <View style={style.starContainer}>
        <SimpleLineIcon
          name="notebook"
          size={35}
          onPress={() => {
            api
              .getRepoREADME(item.user, item.repo)
              .then((res) => setReadme(res))
              .catch((error) => console.error(error));
            toggleModal();
          }}
          color={colours.secondary}
          style={{position: 'absolute', padding: 10, right: 115}}
        />
        <View>{navigateReadMe()}</View>
        <Text style={style.starText}>{item.stars}</Text>
        <AntDesignIcon name="star" size={20} color={colours.secondary} />
      </View>
      <Text style={style.description} numberOfLines={3}>
        {item.description}
      </Text>
      <Separator />
    </View>
  );
};

const style = {
  container: {
    paddingTop: 10,
    flex: 1,
    fontSize: 20,
    backgroundColor: colours.primary,
  },
  starContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    right: -10,
  },
  title: {
    width: 220,
    height: 35,
    fontSize: 20,
    fontWeight: 'bold',
    color: colours.secondary,
    left: 10,
    borderWidth: 1.5,
    paddingLeft: 10,
  },
  starText: {
    color: colours.secondary,
    position: 'absolute',
    right: 40,
    top: 10,
    fontSize: 22,
  },
  description: {
    top: -5,
    color: colours.secondary,
    fontSize: 18,
    padding: 10,
  },
};

export default CardView;

// <View style={{ flex: 1, width: '100%' }}>
//     <FlatList
//         data={this.state.data}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => this.renderItem(item)}
//         onEndReached={this._handleLoadMore}
//     />
// </View>
// function ViewHomeScreen(props) {}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   rowContainer: {
//     flexDirection: 'column',
//     flex: 1,
//     padding: 10,
//   },

//
//   description: {
//     fontSize: 14,
//     paddingBottom: 5,
//   },
//   separator: {
//     flex: 1,
//     backgroundColor: '#E4E4E4',
//     height: 1,
//     marginLeft: 15,
//   },
// });

// export default ViewHomeScreen;
