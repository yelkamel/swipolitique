// @flow

import React from 'react'
import { ScrollView,
  Text,
  View ,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  AppState,
  AsyncStorage
} from 'react-native'
import { Colors, Fonts, Images, Metrics } from './../Themes'
import Background from '../Components/Background'
import TinderPolitic from '../Components/TinderPolitic'
import StatsCard from '../Components/StatsCard'
import MyTabBar from '../Components/MyTabBar'
import MainActionButton from '../Components/MainActionButton'
import SettingActionButton from '../Components/SettingActionButton'
import store from 'react-native-simple-store';
import _ from 'lodash'
import Setting from './Setting'
import ActionButton from 'react-native-action-button';
import SwipeCards from '../Components/MySwipeCard';
import FilterCard from './FilterCard'
import PoliticQuote from './PoliticQuote'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import MyBanAds from '../Components/MyBanAds'
import MyInterAds from '../Components/MyInterAds'
import {maxCardWithFilter, convertToSimpleArray} from '../Containers/FunUtils'
import ExplosePicture from '../Components/ExplosePicture'
import styles from './Styles/MainStyle'

var moment = require('moment');

const SAVE_SWIPEDIDS=200
const SAVE_TIMEOUT=200
const INTER_TIMEOUT=5*60

const FORMATBYDAY = "YYYY/MM/DD"
const urlRegex = require('url-regex');
const normalizeUrl = require('normalize-url');
const STATUSBAR_HEIGHT = (Platform.OS === 'ios') ? 20 : 5

export default class PresentationScreen extends React.Component {

  static propTypes = {

  };

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isLoading: true,
      isHide: true,
      filterCan:this.props.filterCan,
      filterType:this.props.filterType,
      nbGlobalCardSwip:this.props.nbGlobalCardSwip,
      nblikeCardSwip: this.props.nblikeCardSwip,
      arraySwip: this.props.arraySwip,
      arrayLike: this.props.arrayLike,
      aSwipByDay:this.props.aSwipByDay,
      aLikeByDay:this.props.aLikeByDay,
      aNotLikeByDay:this.props.aNotLikeByDay,
      swipedCardIds: this.props.swipedCardIds,
    }

    this.currentCard= {
        by: "",
        date: "",
        descr: "",
        url: "",
        id: 0,
      }

      this.oldCard = this.currentCard
      this.currentSwip = 0
      this.MyInterPresAds = new MyInterAds ()
      this.isBackgrounded = false
  }


  componentWillMount(){
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }


  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    setInterval(()=>{
      if (this.isBackgrounded == false && this.state.nbGlobalCardSwip > 40)
        this.MyInterPresAds.showInter()
   }, INTER_TIMEOUT * 1000)

  }


  _handleAppStateChange = (nextAppState) => {
    console.log('AppState changed to', nextAppState)

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      /*
      this.setState({
        isBackgrounded: true,
        appState: nextAppState
      }) */
      console.log('App has come to the foreground!')
    }
    else {
      /*
      this.setState({
        isBackgrounded: false,
        appState: nextAppState
      }) */
    }
  }

  onChangeTab = () => {

    if (this.refs.FilterComponent != null) {
      var arrayTmpFilterType = convertToSimpleArray(this.refs.FilterComponent.getArrayFilterType())
      var arrayTmpFilterCan = convertToSimpleArray(this.refs.FilterComponent.getArrayFilterCan())

      var hasChangeType = this.refs.FilterComponent != null && !_.isEqual(arrayTmpFilterType, this.state.filterType)
      var hasChangeCan = this.refs.FilterComponent != null &&  !_.isEqual(arrayTmpFilterCan, this.state.filterCan)

      if (hasChangeType || hasChangeCan){
        this.setState({
          filterCan: arrayTmpFilterCan,
          filterType: arrayTmpFilterType
        })


      }
    }
  }


  resetData  = () => {
    this.setState({
      nbGlobalCardSwip : 0,
      nblikeCardSwip: 0,
      arraySwip: [0,0,0,0,0,0,0,0,0,0,0],
      arrayLike: [0,0,0,0,0,0,0,0,0,0,0],
      aSwipByDay:[{
        date: moment().format(FORMATBYDAY),
        value: 0
      }],
      aLikeByDay:[{
        date: moment().format(FORMATBYDAY),
        value: 0
      }],
      aNotLikeByDay: [{
        date: moment().format(FORMATBYDAY),
        value: 0
      }],
      swipedCardIds: []
    })

    setTimeout(() => {
      this.saveData()
    }, SAVE_TIMEOUT)
    store.save('aDayDate',moment().format(FORMATBYDAY));
  }


  getCurrentCard = (nextCard) =>{
    if (!_.isEqual(this.currentCard, nextCard)){
        this.currentCard = nextCard
    }
  }

  manageIteration(nb : string){
    var nbTmp = (nb == null || nb == "") ? 0 : nb
    var res =  parseInt(nbTmp , 10 ) + 1
    return (res + "")
  }

  updateArraySwip(item) {
    var arraySwipTmp = _.clone(this.state.arraySwip);
    var index = _.indexOf(PoliticQuote.POLITIC_LIST, item)

    arraySwipTmp[index] = this.manageIteration(this.state.arraySwip[index])

    this.setState({
      arraySwip :  arraySwipTmp,
      isHide: true,
    })
  }

  updateArrayLike(item) {
    var arrayLikeTmp = _.clone(this.state.arrayLike);
    var index = _.indexOf(PoliticQuote.POLITIC_LIST, item)

    arrayLikeTmp[index] = this.manageIteration(this.state.arrayLike[index])

    this.setState({
      arrayLike:  arrayLikeTmp
    })
  }

  updateaLikeByDay (){
    store.get('aDayDate').then(aDayDate =>{
      var strDate = moment().format(FORMATBYDAY)
      console.log("BEGIN LIKEbyDAY : " + " -D1: " + aDayDate + " -D2: " +  strDate)
      if (aDayDate === strDate ) {
        var aLikeByDayTmp = _.clone(this.state.aLikeByDay)
        var indexToReplace = this.state.aLikeByDay.length -1
        var value = aLikeByDayTmp[indexToReplace].value +1
        console.log("=> Same Date: -index: "+ indexToReplace +" -value: "+ value)
        aLikeByDayTmp[indexToReplace].value =  value
        aLikeByDayTmp[indexToReplace].date = strDate
        this.setState({
          aLikeByDay :  aLikeByDayTmp
        })
      } else {
        console.log("=> Not Same Date!")
        this.setState({
          aLikeByDay :  this.state.aLikeByDay.concat({
            date: strDate,
            value: 1
          })
        })
        store.save('aDayDate',strDate);
      }
      console.log("aLikeByDay arrayValue: " +this.state.aLikeByDay + "\n END" )
      return ;
    })
  }
  updateaNotLikeByDay (){
    store.get('aDayDate').then(aDayDate =>{
      var strDate = moment().format(FORMATBYDAY)
      console.log("BEGIN LIKEbyDAY : " + " -D1: " + aDayDate + " -D2: " +  strDate)
      if (aDayDate === strDate ) {
        var aNotLikeByDayTmp = _.clone(this.state.aNotLikeByDay)
        var indexToReplace = this.state.aNotLikeByDay.length -1
        var value = aNotLikeByDayTmp[indexToReplace].value +1
        console.log("=> Same Date: -index: "+ indexToReplace +" -value: "+ value)
        aNotLikeByDayTmp[indexToReplace].value =  value
        aNotLikeByDayTmp[indexToReplace].date = strDate
        this.setState({
          aNotLikeByDay :  aNotLikeByDayTmp
        })
      } else {
        console.log("=> Not Same Date!")
        this.setState({
          aNotLikeByDay :  this.state.aNotLikeByDay.concat({
            date: strDate,
            value: 1
          })
        })
        store.save('aDayDate',strDate);
      }
      console.log("aNotLikeByDay arrayValue: " +this.state.aNotLikeByDay + "\n END")
      return ;
    })
  }

  updateaSwipByDay (){
    store.get('aDayDate').then(aDayDate =>{
      var strDate = moment().format(FORMATBYDAY)
      console.log("BEGIN LIKEbyDAY : " + " -D1: " + aDayDate + " -D2: " +  strDate)
      if (aDayDate === strDate ) {
        var aSwipByDayTmp = _.clone(this.state.aSwipByDay)
        var indexToReplace = this.state.aSwipByDay.length -1
        var value = aSwipByDayTmp[indexToReplace].value +1
        console.log("=> Same Date: -index: "+ indexToReplace +" -value: "+ value)
        aSwipByDayTmp[indexToReplace].value =  value
        aSwipByDayTmp[indexToReplace].date = strDate
        this.setState({
          aSwipByDay :  aSwipByDayTmp
        })
      } else {
        console.log("=> Not Same Date!")
        this.setState({
          aSwipByDay :  this.state.aSwipByDay.concat({
            date: strDate,
            value: 1
          })
        })
        store.save('aDayDate',strDate);
      }
      console.log("aSwipByDay arrayValue: " +this.state.aSwipByDay + "\n END" )
      return ;
    })
  }


  componentWillUpdate(){
  }

  saveData(){
    store.save('swipedCardIds', this.state.swipedCardIds)

    AsyncStorage.setItem("nbGlobalCardSwip", "" + (this.state.nbGlobalCardSwip));
    AsyncStorage.setItem("nblikeCardSwip", "" + (this.state.nblikeCardSwip));

    store.save('arrayLike', this.state.arrayLike)
    store.save('arraySwip', this.state.arraySwip)

    store.save('aSwipByDay', this.state.aSwipByDay)
    store.save('aLikeByDay', this.state.aLikeByDay)
    store.save('aNotLikeByDay', this.state.aNotLikeByDay)



  }

  showWho = ()=> {
    this.setState({
      isHide :  false
    })
  }


  cardRemoved(by){
    // Get Prev for animation
    this.oldCard = this.currentCard
    // CANDIDAT
    this.updateArraySwip(by)
    // GENERAL
    this.updateaSwipByDay()
    setTimeout(() => {
      this.saveData()
    }, SAVE_TIMEOUT)


//    if(this.currentSwip >= 7){
//        this.MyInterPresAds.showInter()
//        this.currentSwip = 0
//    } else {
//        this.currentSwip = this.currentSwip + 1
//    }

  }
  TurnRight  = () => {
    // ANIMATION
   if (this.state.isHide)
      this.refs.AutoShow.lunchAnimation(true)
    // AIME CANDIDAT
    this.updateArrayLike(this.currentCard.by)

    // GENERAL
    this.updateaLikeByDay()
    var arrayTmp = this.state.swipedCardIds.concat(this.currentCard.id)
    this.setState({
      nbGlobalCardSwip : this.state.nbGlobalCardSwip +1,
      nblikeCardSwip: this.state.nblikeCardSwip + 1,
      swipedCardIds: arrayTmp
    })
    this.cardRemoved(this.currentCard.by)

  }
  TurnLeft  = () => {
    // ANIMATION
    if (this.state.isHide)
     this.refs.AutoShow.lunchAnimation(false)
    // AIME PAS
    this.updateaNotLikeByDay()
    var arrayTmp = this.state.swipedCardIds.concat(this.currentCard.id)
    this.setState({
      nbGlobalCardSwip : this.state.nbGlobalCardSwip +1,
      swipedCardIds: arrayTmp
    })
    this.cardRemoved(this.currentCard.by)
  }

  goToNextCard = ()=> {

    this.setState({
      isHide: true
    })

  }

  renderActionButtoun(){
    return (
     <MainActionButton
        ref="ActionButtonview"
        isSetting= {false}
        isHide={this.state.isHide}
        showWho={this.showWho}
        currentCard={this.currentCard}
        />)
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar
          backgroundColor={Colors.highdarkaccent}
          barStyle="light-content"
          networkActivityIndicatorVisible= {false}
          />
        <Background />
            <ScrollableTabView
              initialPage={2}
              style={{
                marginTop: STATUSBAR_HEIGHT,
                backgroundColor: 'transparent'
              }}
              locked={true}
              renderTabBar={() => <MyTabBar />}
              onChangeTab={this.onChangeTab}
              >


              <ScrollView  tabLabel="chart-arc"
                     style={styles.SettingView}
                     contentContainerStyle={{
                       alignItems: 'center'}}>
              <Setting
                aNotLikeByDay={this.state.aNotLikeByDay}
                nbMaxCard= {PoliticQuote.TWEET_LIST.length}
                aLikeByDay={this.state.aLikeByDay}
                aSwipByDay= {this.state.aSwipByDay}
                arrayData={[
                  {"number":  (PoliticQuote.TWEET_LIST.length - this.state.nbGlobalCardSwip), "name": 'Restantes',icon:'cards'},
                  {"number":  this.state.nblikeCardSwip, "name": 'Aimées', icon:'thumbs-up'},
                  {"number":  this.state.nbGlobalCardSwip - this.state.nblikeCardSwip, "name": 'Ignorées', icon:'thumbs-down' },
                ]}
                nbGlobalCardSwip= {this.state.nbGlobalCardSwip}
                nblikeCardSwip={this.state.nblikeCardSwip}
                resetData={this.resetData}/>
                <View style={{
                    marginTop:Metrics.smallMargin,
                  }}>
                    <SettingActionButton
                    shareText= {"J\'ai swiper  " + this.state.nbGlobalCardSwip+ " cartes sur #SwiPolitique, il m\'en reste  "+ (PoliticQuote.TWEET_LIST.length - this.state.nbGlobalCardSwip) + "."}
                    shareUrl= "https://yelkamel.github.io/work/swiperie/"
                    resetData={this.resetData}
                    isSetting={true}
                    />
                  </View>
                </ScrollView>

                <ScrollView  tabLabel="filter"
                             style={styles.SettingView}
                             contentContainerStyle={{alignItems: 'center'}}>

                <FilterCard
                  ref="FilterComponent"
                  />
                </ScrollView>

              <View tabLabel="cards" style={styles.tinderContainer}>
                <TinderPolitic
                  goToNextCard={this.goToNextCard}
                  swipedCardIds={this.state.swipedCardIds}
                  filterCan={this.state.filterCan}
                  filterType={this.state.filterType}
                  isHide={this.state.isHide}
                  nbGlobalCardSwip={this.state.nbGlobalCardSwip}
                  TurnLeft={this.TurnLeft}
                  getCurrentCard= {this.getCurrentCard}
                  TurnRight={this.TurnRight}/>
                {this.renderActionButtoun()}
                <MyBanAds/>

              </View>
              <ScrollView  tabLabel="account-card-details" style={styles.tabView}>
                  <StatsCard
                    nbGlobalCardSwip={this.state.nbGlobalCardSwip}
                    nblikeCardSwip={this.state.nblikeCardSwip}
                    arraySwip={this.state.arraySwip}
                    filterCan={this.state.filterCan}
                    arrayLike={this.state.arrayLike}/>
              </ScrollView>

            </ScrollableTabView>
            <ExplosePicture by={this.oldCard.by} ref="AutoShow" />
      </View>
    )
  }
}
//



/*


*/
