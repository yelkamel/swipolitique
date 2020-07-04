// @flow
import { View,AsyncStorage,Alert,Image,BackAndroid, Text } from 'react-native'
import React, { Component } from 'react'
import '../I18n/I18n' // keep before root container
import PresentationScreen from './PresentationScreen'
import AppIntro from 'react-native-app-intro';
import Loading from '../Components/Loading'
import {maxCardWithFilter, convertToSimpleArray} from '../Containers/FunUtils'
import store from 'react-native-simple-store';
import _ from 'lodash'
import codePush from "react-native-code-push";
import { Colors, Fonts, Images, Metrics } from './../Themes'
import PoliticQuote from './PoliticQuote'
import Toast from 'react-native-root-toast';
var moment = require('moment');
import Notif from '../Components/Notif'
import PushNotification from 'react-native-push-notification'

const LOAD_TIMEOUT=5000
const FORMATBYDAY = "YYYY/MM/DD"
const pageArray = [
{
  title: "Glisser les propositions,",
  description: "à droite pour aimer et à gauche dans le cas contraire",
  img: Images.SwipRight,
  imgStyle: {
    height: 150,
    width: 100,
  },
  backgroundColor: Colors.darkaccent,
  fontColor: '#fff',
  level: 20,
},
{
  title: "Filtrer les propositions,",
  description: "avec vos thèmes préférés et candidats favoris.",
  img: Images.ShowOption,
  imgStyle: {
    height: 120,
    width: 120,
  },
  backgroundColor: Colors.darkaccent,
  fontColor: '#fff',
  level: 20,
},
{
  title: "Naviguer avec les onglets,",
  description: "et soyez surpris de votre classement.",
  img: Images.MenuTab,
  imgStyle: {
    height: 140,
    width: 120,
  },
  backgroundColor: Colors.darkaccent,
  fontColor: '#fff',
  level: 20,
},
]


PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
/*
    onNotification: (notification) =>  {
        console.log( 'NOTIFICATION:', notification );
        Toast.show(notification.message, {
        duration: notification.message.length > 150 ? 4000 : 6000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: Colors.background
        });
    },
*/

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      IsFirstCo: '1',
      filterCan:PoliticQuote.POLITIC_LIST,
      filterType:[
         "Économie et développement durable",
         "Société",
         "Institutions",
         "Politique économique et emploi",
         "Diplomatie et défense",
         "Immigration et laïcité",
         "Culture et communication",
         "Sécurité et justice",
         "Protection sociale",
         "Europe",
         "Éducation, recherche et jeunesse",
      ],
      nbGlobalCardSwip: 0,
      nblikeCardSwip:0,
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
    }

    this.backPress=false

  }

  onSkipBtnHandle = (index) => {

  }

  doneBtnHandle = () => {
  AsyncStorage.setItem("IsFirstCo", '0')
  AsyncStorage.setItem("hasNotif", '1')

  this.setState({
      IsFirstCo:'0'
    })

  }
  nextBtnHandle = (index) => {

  }
  onSlideChangeHandle = (index, total) => {

  }

  loadData(){

  }

  componentWillMount(){
    AsyncStorage.getItem("nbGlobalCardSwip").then((nbGlobalCardSwip) => {
      this.setState({
        nbGlobalCardSwip: nbGlobalCardSwip == null ? this.state.nbGlobalCardSwip :  parseInt(nbGlobalCardSwip , 10 ),
      });
    }).done()
    AsyncStorage.getItem("IsFirstCo").then((value) => {
      this.setState({
        IsFirstCo: value == null ? '1' : value
      })
      }).done()
    store.get('swipedCardIds').then ((swipedCardIds) => {
      this.setState({
        swipedCardIds: (swipedCardIds == null) ? this.state.swipedCardIds : swipedCardIds
      })
    }).done()
    AsyncStorage.getItem("nblikeCardSwip").then((nblikeCardSwip) => {
      this.setState({
        nblikeCardSwip: nblikeCardSwip == null ? this.state.nblikeCardSwip :  parseInt(nblikeCardSwip , 10 ),
      });
    }).done()

    store.get('arraySwip').then( (arraySwip) => {
      this.setState({
        arraySwip: (arraySwip == null ) ? this.state.arraySwip : arraySwip
      })
    }).done()
    store.get('arrayLike').then ((arrayLike) => {
      this.setState({
        arrayLike: (arrayLike == null) ? this.state.arrayLike : arrayLike,
      })
    }).done()

    store.get('aDayDate').then ((aDayDate) => {
      this.setState({
        aDayDate: (aDayDate == null) ? this.state.aDayDate : aDayDate,
      })
    }).done()

    store.get('aLikeByDay').then ((aLikeByDay) => {
      this.setState({
        aLikeByDay: (aLikeByDay == null) ? this.state.aLikeByDay : aLikeByDay,
      })
    }).done()
    store.get('aNotLikeByDay').then ((aNotLikeByDay) => {
      this.setState({
        aNotLikeByDay: (aNotLikeByDay == null) ? this.state.aNotLikeByDay : aNotLikeByDay,
      })
    }).done()
    store.get('aSwipByDay').then ((aSwipByDay) => {
      this.setState({
        aSwipByDay: (aSwipByDay == null) ? this.state.aSwipByDay : aSwipByDay,
      })
    }).done()

    store.get('filterType').then( (filterType) => {
       this.setState({
         filterType: (filterType == null ) ? this.state.filterType : convertToSimpleArray(filterType),
       })
     }).done()

     store.get('filterCan').then( (filterCan) => {
        this.setState({
          filterCan: (filterCan == null ) ? this.state.filterCan : convertToSimpleArray(filterCan),
        })
      }).done()


    BackAndroid.addEventListener('hardwareBackPress', function() {

    if(!this.backPress) {

      Toast.show("Appuyer une seconde fois sur retour pour quitter 😭", {
        duration: 2500,
        backgroundColor: Colors.highdarkaccent,
        position: Metrics.screenHeight/2,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      this.backPress=true
      setTimeout(() => {
        this.backPress=false
      },2500);
      } else {
      return false;
    }



    return true;
    }.bind(this));

    Notif.setGlobalNotification()

    setTimeout(() => {
      console.log("BEGIN LOAD:")
      console.log("=> nbGlobalCardSwip: " + (this.state.nbGlobalCardSwip));
      console.log("=> nblikeCardSwip: " + (this.state.nblikeCardSwip));

      console.log('=> arrayLike: '+ this.state.arrayLike);
      console.log('=> arraySwip: '+ this.state.arraySwip);

      console.log("=> aDayDate: " + (this.state.aDayDate));
      console.log("=> aLikeByDay: " + (this.state.aLikeByDay));
      console.log("=> aNotLikeByDay: " + (this.state.aLikeByDay));
      console.log("=> aSwipByDay: " + (this.state.aLikeByDay));

      console.log("=> filterType: " + (this.state.filterType));
      console.log("=> filterCan: " + (this.state.filterCan));

      console.log("END LOAD")

      this.setState({
        isLoading:false
      })
    }, LOAD_TIMEOUT )
  }

  componentDidMount() {
    var rand = _.random(0,PoliticQuote.SENTENCE_MOTIV.length - 1)

    Toast.show(PoliticQuote.SENTENCE_MOTIV[rand], {
      duration: Toast.durations.LONG + 1000,
      backgroundColor: Colors.highdarkaccent,
      position: Toast.positions.TOP + 30,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }


  render () {
    if (this.state.isLoading)
      return <Loading></Loading>

    if(this.state.IsFirstCo == '1'){
      return (
        <AppIntro
          onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
          doneBtnLabel="OK"
          rightTextColor= {Colors.couleurDrap2}
          activeDotColor={Colors.couleurDrap2}

          showSkipButton={false}
          pageArray={pageArray}
        />)
    }
    else {
      return (<PresentationScreen
        filterCan={this.state.filterCan}
        filterType={this.state.filterType}
        nbGlobalCardSwip= {this.state.nbGlobalCardSwip}
        nblikeCardSwip= {this.state.nblikeCardSwip}
        arraySwip= {this.state.arraySwip}
        arrayLike= {this.state.arrayLike}
        aSwipByDay={this.state.aSwipByDay}
        aLikeByDay={this.state.aLikeByDay}
        aNotLikeByDay={this.state.aNotLikeByDay}
        swipedCardIds= {this.state.swipedCardIds}
         />)
    }
  }
}

App = codePush(App);

export default App
