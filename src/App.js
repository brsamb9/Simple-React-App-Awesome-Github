import React from 'react';

import WelcomeScreen from './screens/WelcomeScreen';
import ViewHomeScreen from './screens/ViewHomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  // https://reactnative.dev/docs/navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Awesome Github!"
          options={{headerShown: false}}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="List of Awesome Git Repos"
          component={ViewHomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//   let [state, setState] = useState([]);

//   //https://www.pluralsight.com/guides/executing-promises-in-a-react-component
//   useEffect(() => {
//     const fetchGitData = async () => {
//       state = await api.getListOfRepos();
//       setState(state);
//     };
//     fetchGitData();
//   }, []);

//   console.log(state);
//   return <View style={{flex: 1, padding: 30}}>{state.map(printout)}</View>;
// };

// function printout(item) {
//   return (
//     <Text key={item.id}>
//       Repo: {item.repo} & Stars: {item.stars}
//     </Text>
//   );
// }

export default App;
