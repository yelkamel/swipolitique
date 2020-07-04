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


export default class ShareButton extends Component {
  static propTypes = {
}
static defaultProps= {
  backgroundColor: Colors.darkaccent
}

  constructor(props) {
    super(props);
    this.state = {
      result: ''
    }

    this.shareText = this.shareText.bind(this);
    this.showResult = this.showResult.bind(this);

  }

  showResult (result) {
   console.log(result)
 }

  shareText () {
      Share.share({
        message: this.props.shareText,
        title: this.props.shareText,
        url: this.props.shareUrl,
        social: ["facebook","twitter", "whatsapp"]
      }, {
        dialogTitle: this.props.shareText,
        excludedActivityTypes: [
          'com.apple.reminders.RemindersEditorExtension',
          'com.apple.mobilenotes.SharingExtension',
          'com.google.Drive.ShareExtension',
          'com.apple.mobileslideshow.StreamShareService',
        ],
        tintColor: Colors.darkaccent
      })
      .then(this._showResult)
      .catch(err => console.log(err))
    }
  render() {

    return (
      <RoundedButton
        onPress={this.shareText}
        text= "Partager"
        icon= "share-alt"
        backgroundColor= {this.props.backgroundColor}/>
    );


  }
}
