import React, { Component } from 'react';
import {
  View,
  Platform
} from 'react-native'
import {  AdMobBanner } from 'react-native-admob'

//import { BannerView } from 'react-native-fbads';


const AD_MOB_BAN_ID = (Platform.OS === 'ios') ? "ca-app-pub-8940809686708716/6380134826" : "ca-app-pub-8940809686708716/7658391625"

//const FB_ADS_BAN_ID =  "602333829961909_602341646627794"

export default class MyBanAds extends Component {

  static propTypes = {
  };

  static defaultProps= {

  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
    return (
      <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={AD_MOB_BAN_ID}
          testDeviceID="EMULATOR"
          adViewDidReceiveAd={() => {console.log("Ad received");}}
          didFailToReceiveAdWithError={(err) => {console.log("BEGIN Ad mob error: "+ err +"END");}}
        />
    );
  }
}
/*
<View>
  <BannerView
    placementId={FB_ADS_BAN_ID}
    type="standard"
    onClick={() => console.log('click')}
    onError={(err) => console.log('error', err)}
  />
</View>
  */
