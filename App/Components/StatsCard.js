import React, { Component,PureComponent } from 'react'
import { View, Text,Image, BackAndroid,AsyncStorage,AppState,Switch, Platform,StyleSheet } from 'react-native'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import ResponsiveImage from 'react-native-responsive-image'
import MyProgressBar  from './MyProgressBar'
import PoliticQuote from '../Containers/PoliticQuote'
import RoundedButton  from './RoundedButton'
import ShareButton  from './ShareButton'
import Chart from 'react-native-chart';
import _ from 'lodash'
import * as Animatable from 'react-native-animatable'

import Row from '../Components/Row'

export default  class StatsCard extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      humourMode: false,
      maxLike: 0,
    };
  }

  static defaultProps = {
  }

  componentDidMount () {

  }


  componentDidMount() {

  }

  componentWillMount(){
    var res = 0
    PoliticQuote.POLITIC_LIST.map((cell,i) =>{
       res = res + this.props.arrayLike[i]

       if (i == PoliticQuote.POLITIC_LIST.length){
         this.setState({
           maxLike: res
         })
       }
    })
  }

  componentWillUpdate (){
  }




  componentWillUnmount (){
  }

  renderStatsBy(){
    var PolOject = []
    PoliticQuote.POLITIC_LIST.map((cell,i) =>{

      var cLike = (this.props.arrayLike[i]/ this.props.arraySwip[i]) * 100
      var maxCard = PoliticQuote.POLITIC_MAX[i]
      var nbSwip = this.props.arraySwip[i]
      var includesCan = this.props.filterCan.includes(cell)

      if (includesCan &&  cLike > 0){
        var nbLike = this.props.arrayLike[i]

        PolOject = PolOject.concat({
          by:cell,
          ratio: 100-cLike  ,
          nbLike:nbLike,
          nbSwip: nbSwip,
          maxCard: maxCard,
          maxLike: this.state.maxLike,
          sortLike : - nbLike,
          likeSubNot :  ((nbLike -(nbSwip - nbLike)) / maxCard) * -1
        })
      }
    })

    var tabTmp = _.sortBy(PolOject,'likeSubNot','sortLike')

    return tabTmp.map((cell,i) =>{
      if (cell.nbSwip >0)
      return (
        <Animatable.View
          key={i}
          animation= {(i%2== 0) ? "bounceInRight" : "bounceInLeft"}
          delay={200 * i}>
        <Row key={i}
        order={i + 1}
        zIndex={tabTmp.length -i}
        by={cell.by}
        nbLike={cell.nbLike}
        nbSwip={cell.nbSwip}
        maxCard={cell.maxCard}
        maxLike={cell.maxLike}/>
      </Animatable.View>
    )
    })
  }

  render () {
    return (
      <View>
        {this.renderStatsBy()}
    </View>)
  }
}


const styles = StyleSheet.create({
  statsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    progressView: {
      flex:1 ,
      flexDirection: 'row',
      justifyContent: 'space-between',

    },
    progressTextView: {
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    progressText: {
      marginTop: 5,
      color: Colors.snow,
      fontSize: Fonts.size.regular,
      textAlign: 'center',

    },

StatsGlobalView:{
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center'
},
switchView: {
  justifyContent: 'space-between',
  flexDirection: 'row'
},

StatsUnitView: {
  borderTopWidth: Metrics.borderWidth,
  borderBottomWidth: Metrics.borderWidth,
  borderTopColor: Colors.snow,
  borderBottomColor:Colors.snow,
},
OptionView: {
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  flex:1
},
logoView: {
  margin: 20,
  borderColor: 'black',
  borderWidth: 2,
  borderRadius: 30,
  width: 128,
  height: 128,
},
buttonLeftView: {
flex: 1,
flexDirection: 'row',
justifyContent: 'flex-start',
},
ButtonIconView: {
  flex: 1,
  justifyContent: 'flex-end',
  flexDirection: 'column',
  alignItems: 'center',
  marginHorizontal: 10,
},
ButtonText: {
  color: Colors.snow,
  fontWeight: 'bold',
  fontSize: Fonts.size.medium,
  marginVertical: Metrics.baseMargin,
  marginHorizontal:  Metrics.section
},
ButtonIcon: {
color: Colors.snow,
fontWeight: 'bold',
fontSize: Fonts.size.regular,
marginHorizontal:  Metrics.baseMargin,
marginVertical: Metrics.baseMargin
},

})
