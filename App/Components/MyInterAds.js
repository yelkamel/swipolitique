import React, { Component } from 'react';
import {
  View,
  Platform
} from 'react-native'
import { AdMobInterstitial } from 'react-native-admob'

//import { InterstitialAdManager} from 'react-native-fbads';


const AD_MOB_INTER_ID = (Platform.OS === 'ios') ? "ca-app-pub-8940809686708716/7518790821" : "ca-app-pub-8940809686708716/6042057623"
//const FB_ADS_INTER_ID = "602333829961909_602346426627316"


export default class MyInterAds extends Component {

  static propTypes = {
  };

  static defaultProps= {

  }
  constructor(props) {
    super(props);
    this.state = {
    }

    //AdMobInterstitial.isReady((value) => {
     // if (value){
        AdMobInterstitial.setAdUnitID(AD_MOB_INTER_ID);
        AdMobInterstitial.setTestDeviceID('EMULATOR');
    //  }
    //})
  }

  showInter = () => {
  //  InterstitialAdManager.showAd(FB_ADS_INTER_ID).then(didClick => {}).catch(error => {})
    AdMobInterstitial.requestAd(error => {
      AdMobInterstitial.showAd((error) => {});
    });
  }

  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
  }
}
