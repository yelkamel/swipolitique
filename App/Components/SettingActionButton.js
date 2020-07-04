import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
} from 'react-native';
import { Colors, Metrics } from '../Themes/'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/ComponentStyle'
import * as Animatable from 'react-native-animatable'
import StatsButton from './StatsButton'
import ShareButton from './ShareButton'
import OpenLinkButton from './OpenLinkButton'
import ResetButton from './ResetButton'

export default class MainActionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  hasUrl(url){
    if (url === null | url === "")
    return;

    return (<OpenLinkButton
      backgroundColor={Colors.accent}
      openUrl={url}
      actionButton={this.props.isRounded}/>)
    }


    render() {

        return (
          <Animatable.View  animation="bounceInUp"
            style={{width: Metrics.screenWidth,
              height: Metrics.screenHeight * 0.14,
              justifyContent: 'space-between',
              flexDirection: 'row'}}>

              <View>
                <ShareButton
                  actionButton={true}
                  shareText= {this.props.shareText}
                  shareUrl= {this.props.shareUrl}
                  backgroundColor= {Colors.accent} />

              </View>
              <View>
                <ResetButton onPress={this.props.resetData}
                  actionButton={false}
                  backgroundColor= {Colors.accent}
                  />
              </View>
            </Animatable.View>
          )
      }
    }
