import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform,
  Share
} from 'react-native';
import RoundedButton from './RoundedButton'
import { Colors } from '../Themes/'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/ComponentStyle'


export default class ResetButton extends Component {
  static propTypes = {
}
static defaultProps= {
  backgroundColor: Colors.accent
}

  constructor(props) {
    super(props);
    this.state = {

    }


  }



  render() {

    return (
      <RoundedButton
        onPress={this.props.onPress}
        text= "Supprimer"
        iconOnRight= {true}
        icon= "trash-o"
        backgroundColor= {this.props.backgroundColor}/>
    );
  }
}
