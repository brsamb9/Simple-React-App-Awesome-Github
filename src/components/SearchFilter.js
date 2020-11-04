import React, {useState, setState, useEffect} from 'react';
import {FlatList, List, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CardView from '../components/CardView';
import api from '../api/index';

// https://www.freecodecamp.org/news/how-to-build-a-react-native-flatlist-with-realtime-searching-ability-81ad100f6699/
//thewebdev.info/2020/09/30/react-native%E2%80%8A-%E2%80%8Asection-list-and-back-button-handling/
//reactjs.org/docs/hooks-effect.html

const SearchFilter = () => {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');
  const [enterKey, setKey] = useState(0);

  useEffect(() => {
    api.getListOfRepos(search).then((state) => setState(state));
  }, [enterKey]);

  const renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        onChangeText={(text) => {
          setSearch(text);
        }}
        // https://github.com/callstack/react-native-paper/issues/712
        onSubmitEditing={() => {
          setKey((enterKey) => enterKey + 1);
        }}
        autoCorrect={false}
        value={search}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={state}
        renderItem={({item}) => <CardView item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader()}
      />
    </View>
  );
};

export default SearchFilter;
