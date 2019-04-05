import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import VoteScreen from './screens/VoteScreen';
import HomeScreen from './screens/HomeScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Vote: {screen: VoteScreen,
        navigationOptions: {
          title: "Votez",
          headerStyle: {
            backgroundColor: '#434360',
          },
          headerTintColor: '#eeebd3',
        }},
});

const App = createAppContainer(MainNavigator);

export default App;