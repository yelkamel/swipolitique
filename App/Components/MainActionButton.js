import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  Share,
  IntentAndroid,
  processColor,
  Linking
} from 'react-native';
import { Colors, Metrics } from '../Themes/'
import ActionButton from 'react-native-action-button';
import styles from './Styles/ComponentStyle'
import * as Animatable from 'react-native-animatable'
import StatsButton from './StatsButton'
import ShareButton from './ShareButton'
import OpenLinkButton from './OpenLinkButton'
import ResetButton from './ResetButton'
import RoundedButton from './RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Browser from 'react-native-browser';
import MyProgressBar from './MyProgressBar'
import _ from 'lodash'

export default class MainActionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
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


    shareText = ()=> {

     var shareText = "Un point du Programme de " +this.props.currentCard.by + ": \"" + this.props.currentCard.descr + "\" via l'app SwiPolitique"
     var shareUrl = this.props.currentCard.url

        Share.share({
          message: shareText,
          title: shareText,
          url: shareUrl,
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

    openBrower = () => {


      if (Platform.OS === 'ios') {
        Browser.open(this.props.currentCard.url, {
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
          Linking.openURL(this.props.currentCard.url).catch(err => console.error('An error occurred', err));
      }
    }


/*
  showWhoButton(){
    if (this.props.isHide){
      this.props.showWho
      return (
        <Animatable.View
          ref="showButton"
          >
        <TouchableOpacity
          style={[styles.showButtonView,{backgroundColor: Colors.accent}]}
          onPress={() => {
            this.props.showWho()
          }}>
            <View
              style={styles.buttonIconView}>
              <Icon style={styles.showButtonIcon} name="eye"/>
            </View>
        </TouchableOpacity>
        </Animatable.View>)
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

    lunchAnimation(){
     this.refs.ActionButtonview.zoomInDown(800)
     if (this.props.isHide)
       this.refs.showButton.zoomInDown(2000)
    }*/

    hasSwiped(){
     this.refs.swiped.hasSwiped()
   }


    render() {
      return (
        <ActionButton
          buttonColor={Colors.accent}
          icon={<Icon style={styles.actionButtonIcon} name={"plus-circle"}/> }
          position='right'
          onPress={this.props.showWho}
          offsetY={60}>
          <ActionButton.Item buttonColor={Colors.darkaccent} title="Partager" onPress={this.shareText}>
             <Icon style={styles.actionButtonIcon} name="share-alt"/>
           </ActionButton.Item>
           <ActionButton.Item buttonColor={Colors.darkaccent} title="Ouvrir" onPress={this.openBrower}>
             <Icon style={styles.actionButtonIcon} name="external-link-square"/>
           </ActionButton.Item>
        </ActionButton>)
      /*
      /*
        return (
          <View   style={{
                justifyContent: 'flex-end',
                flexDirection: 'column',
                marginTop: 10,
                marginBottom: 10,
                height: Metrics.screenHeight / 20,
            }}>
          <Animatable.View
            animation="bounceInUp"
            ref="ActionButtonview"
            style={{
                width: Metrics.screenWidth,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
            <ShareButton
              shareText= {"Un point du Programme de " +this.props.currentCard.by + ": \"" + this.props.currentCard.descr + "\" via l'app SwiPolitique"}
              shareUrl= {this.props.currentCard.url}
              isRounded={this.props.isRounded}
              backgroundColor= {Colors.accent} />
            {this.showWhoButton()}


            {this.hasUrl(this.props.currentCard.url)}
          </Animatable.View>
          </View>
        )*/
      }
    }
