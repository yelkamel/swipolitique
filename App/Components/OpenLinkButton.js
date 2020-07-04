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
  Share,
  IntentAndroid,
  processColor,
  Linking
} from 'react-native';

import RoundedButton from './RoundedButton'

import { Colors } from '../Themes/'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/ComponentStyle'
import Browser from 'react-native-browser';





export default class ShareButton extends Component {
  static propTypes = {
};

static defaultProps= {
  backgroundColor: Colors.accent
}
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }

    this.openBrower= this.openBrower.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }
  _handleOpenURL(event) {
    console.log(event.url);
  }

  openBrower() {


    if (Platform.OS === 'ios') {
      Browser.open(this.props.openUrl, {
        showUrlWhileLoading: true,
        loadingBarTintColor: processColor(Colors.darkaccent),
        navigationButtonsHidden: false,
        showActionButton: true,
        showDoneButton: true,
        doneButtonTitle: 'Done',
        showPageTitles: true,
        disableContextualPopupMenu: false,
        hideWebViewBoundaries: false,
        buttonTintColor: processColor(Colors.darkaccent)
      })
    }
    else {
        Linking.openURL(this.props.openUrl).catch(err => console.error('An error occurred', err));
    }
  }


  render() {
    return (
      <RoundedButton
        onPress={this.openBrower}
        text= "Ouvrir"
        iconOnRight={true}
        icon= "external-link-square"
        backgroundColor= {this.props.backgroundColor}/>
    );
  }
}
