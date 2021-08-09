import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import db from './config';
import HomeScreen from './Screens/Homescreen';
import SummaryScreen from './Screens/Summaryscreen';

export default class App extends React.Component {
  render(){
    return (
     <View>
      <AppContainer/>
     </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen : HomeScreen,
  SummaryScreen : SummaryScreen,
});

const AppContainer = createAppContainer(AppNavigator);