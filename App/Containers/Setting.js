import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  Platform,
  AsyncStorage,
  ScrollView,
  Switch,
} from 'react-native';
import { Colors, Metrics, Fonts } from '../Themes/'
import Icon from 'react-native-vector-icons/FontAwesome';
import StatsButton from '../Components/StatsButton'
import ShareButton from '../Components/ShareButton'
import RoundedButton from '../Components/RoundedButton'
import PoliticQuote from './PoliticQuote'
import store from 'react-native-simple-store';
import Pie from '../Components/MyPie'
import AreaSpline from '../Components/charts/AreaSpline';
import _ from 'lodash'
import PushNotification from 'react-native-push-notification'

const height = 200;
const width = Metrics.screenWidth - 90;

const COLORS = [ Colors.darkaccent, Colors.like, Colors.notlike   ]


export default class Setting extends PureComponent {
  static propTypes = {
    aLikeByDay: React.PropTypes.arrayOf(React.PropTypes.object),
    aNotLikeByDay: React.PropTypes.arrayOf(React.PropTypes.object),
    aSwipByDay: React.PropTypes.arrayOf(React.PropTypes.object),
    arrayData: React.PropTypes.arrayOf(React.PropTypes.object),
    nblikeCardSwip: React.PropTypes.number,
    nbGlobalCardSwip: React.PropTypes.number,
    resetData: React.PropTypes.func,

}
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      hasNotif: true,
      isLoading: true,
      swipPerDay: this.getArrayCardRest(this.props.aSwipByDay)
    }
    this._onPieItemSelected = this._onPieItemSelected.bind(this)
    this._shuffle = this._shuffle.bind(this)
  }
/*
getArrayCardRest(array : Array<Object>){
  return (
    array.map(item => {
      return({
    date: item.date,
    value:  100 - (item.value/this.props.nbMaxCard) * 100
  })})
  )
}
*/
getArrayCardRest(array : Array<Object>){
  var som = 0
  return (
    array.map((item, i) => {

      som = som + item.value

      return({
        date: item.date,
        value:  100-  ((som/this.props.nbMaxCard) * 100)
      })
    })
  )
}

convertArray(array : Array<Object>){
  var som = 0
  return (
    array.map((item, i) => {

      som = som + item.value

      return({
        date: item.date,
        value:  ((som/this.props.nbMaxCard) * 100)
      })
    })
  )

  /*
  return (
    array.map(item => { return({
    date: item.date,
    value:  (item.value/this.props.nbMaxCard) * 100
  })})
  )
  */
}


  onSwithPress (value) {

    var hasNotifTmp = value ? '1' : '0'

    AsyncStorage.setItem("hasNotif", hasNotifTmp)


    this.setState({
      hasNotif:  value
    })

    if (value ===  false)
      PushNotification.cancelAllLocalNotifications()
  }


getArray(index){
  switch (index) {
    case 0:
      return  this.getArrayCardRest(this.props.aSwipByDay)
    case 1:
      return this.convertArray(this.props.aLikeByDay)
    case 2:
      return this.convertArray(this.props.aNotLikeByDay)
    default:
      return this.convertArray(this.props.aLikeByDay)

  }
}


  componentWillMount(){
    console.log("BEGIN SETING" );

    AsyncStorage.getItem("hasNotif").then((hasNotif) => {
      console.log("=> HASNOTIF" + hasNotif);
       this.setState(
        {
          hasNotif: (hasNotif == '1'),
          isLoading: false
        })
    }).done()
    console.log("END SETING");

  }

  componentDidMount(){
    console.log("BEGIN Setting: "+'\n'
  //  +" aLikeByDay " +this.props.aLikeByDay.map(n => n.value)+'\n'
  //  +" aSwipByDay " +this.props.aSwipByDay.map(n => n.value)+'\n'
  //  +" aNotLikeByDay " + this.props.aNotLikeByDay.map(n => n.value) +'\n'
    +" arrayData "+ this.props.arrayData);
  }

_onPieItemSelected(newIndex){
  this.setState({...this.state,
    activeIndex: newIndex,
    swipPerDay: this.getArray(newIndex)});
}

_shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}



  render() {
  //    if (this.state.isLoading)
  //      return (<View></View>)

    return (
        <View style={styles.containerStatsGlobal} >
          <Text style={styles.chart_title}>Statistique Globale</Text>
          <Pie
            style={{
              backgroundColor: Colors.snow,
            }}
            pieWidth={120}
            pieHeight={120}
            onItemSelected={this._onPieItemSelected}
            colors={COLORS}
            width={width }
            height={height}
            data={this.props.arrayData} />
          <Text style={styles.chart_title}>Cartes {this.props.arrayData[this.state.activeIndex].name} par jour</Text>
          <View  style={{
            borderLeftWidth : 3,
            borderLeftColor: Colors.accent,
            borderBottomWidth : 3,
            borderBottomColor: Colors.accent,
            backgroundColor: Colors.snow}}>
          <AreaSpline
            nWitdh={4}
            width={Metrics.screenWidth - 80}
            height={Metrics.screenWidth * 0.36}
            data={this.state.swipPerDay}
            color={COLORS[this.state.activeIndex]} />
          </View>
          <View style={styles.settingSwitchView}>
            <Text style={styles.switchText}> Notification </Text>
            <Switch
              onValueChange={(value) => {this.onSwithPress(value)}}
              style={styles.settingSwitch}
              value={this.state.hasNotif}
              onTintColor={Colors.accent}
              thumbTintColor={Colors.secondaryaccent}
              tintColor={Colors.accent}
              />
          </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  // SWITH STYLE
  switchText: {
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 15,
    color: Colors.darkaccent,
    fontWeight:'bold',
        fontFamily: 'Rubik-Regular',
  },
  settingSwitch:{
    justifyContent : 'flex-end',
    alignItems : 'flex-end',
    marginHorizontal:  Metrics.smallMargin,
    marginVertical: Metrics.baseMargin
  },
  settingSwitchView: {
    width: Metrics.screenWidth - 45,
    height: Metrics.buttonHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal:  Metrics.section,
    marginVertical: Metrics.baseMargin
  },

  containerStatsGlobal:
  {
    alignItems: 'center',
    flex:1,
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.snow,
    borderColor: Colors.borderCard,
    marginTop:  Metrics.marginTopSetting,
    marginBottom:Metrics.baseMargin,
    borderWidth: Metrics.CardsBorderWitdh,
    borderRadius: Metrics.cardBorderRadius,
  },
  chart_title :
  {
    fontFamily: 'Rubik-Regular',
    marginTop: 15,
    textAlign: 'right',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 16,
    color: Colors.darkaccent,
    fontWeight:'bold',
  }

})
