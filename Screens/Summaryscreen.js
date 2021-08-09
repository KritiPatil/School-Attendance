import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import db from '../config';

export default class SummaryScreen extends React.Component {
    render() {
      return(
        <View>
        <Text>Present : {this.props.navigation.getParam("present")}</Text>
        <Text>Absent : {this.props.navigation.getParam("absent")}</Text>
        </View>
      );
    }
  }