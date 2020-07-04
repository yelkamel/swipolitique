import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { Images, Colors, Metrics, Fonts } from '../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import Chart from 'react-native-chart';

import FoldView from 'react-native-foldview';
import Pie from '../SmallPie'
import * as Animatable from 'react-native-animatable'
import MyProgressBar  from '../MyProgressBar'



import {
  ThinGrayLine,
  ThickGrayLine,
  ThickDarkGrayLine,
} from './Lines';

type ProfileCardProps = {
  by: string,
  nbLike: number,
  nbSwip: number,
  maxCard: number,
  maxLike: number,
}


export default class Row extends Component {
  props: ProfileCardProps

  componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);


  }



  renderBlankFace() {
    // transition backgroundColor Gris Clair
    if (Platform.OS === 'android'){

    }
    else {
    return (
      <View
        style={{
          backgroundColor: '#BDC2C9',
          flex: 1,
        }}
      />
    )
  }
  }

  renderBlankFace2(){
    if (Platform.OS === 'android'){

    }
    else {
    return (
            <View style={{
                flex: 1,
                backgroundColor: '#BDC2C9',
                justifyContent: 'center',
              }}>
              <Text style={styles.swipStatsText}>
               Merci
              </Text>
            </View>
    )
  }
  }

  easingBar(){
    this.refs.barView.fadeInLeftBig(1500)
  }

  renderBackface() {
    const onPress = this.props.onPress;
    return (
      <View style={{ flex: 1 }}>
        <FoldView
          renderFrontface={this.renderBlankFace}
          renderBackface={this.renderInnerBackFace}
        >

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#BDC2C9',
          }}
        >


        </View>
        </FoldView>

      </View>
    );
  }



  renderInnerBackFace() {
    const onPress = this.props.onPress;
    return (
      <View
       style={{
         backgroundColor: '#fff',
         flex: 1,
         borderTopWidth: StyleSheet.hairlineWidth,
         borderTopColor: '#BDC2C9',
         borderBottomRightRadius: 10,
         borderBottomLeftRadius: 10,
       }}
     >

         <TouchableHighlight
           style={{
             flex: 1,
             backgroundColor: '#FFFFFF',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'flex-end',
             marginRight: Metrics.marginFirstPage,
             borderBottomLeftRadius: 10,
             borderBottomRightRadius: 10,
           }}
           onPress={onPress}
         >
         <Icon name="minus-square" size={30} color={Colors.highdarkaccent} />

         </TouchableHighlight>
     </View>
    );
  }

  renderFoldView (data){
      return (<View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent : 'center',
                  flexDirection: 'row',
                  backgroundColor: '#FFFFFF',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
              >
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>



                <View style={{ marginLeft: 5,
                    flex: 3,
                    flexDirection: 'row' }}>
                  <View style={{width: Metrics.screenWidth / 8, marginRight: 5}}>
                  <Text style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: Colors.highdarkaccent ,
                      fontSize: Fonts.size.small}}>
                    Swipé
                  </Text>
                  </View>
                  <View style={{width: Metrics.screenWidth / 8, marginHorizontal: 5}}>
                  <Text style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: Colors.highdarkaccent ,
                      fontSize: Fonts.size.small}}>
                    Aimé
                  </Text>
                </View>

                  <View style={{width: Metrics.screenWidth / 8, marginHorizontal: 5}}>
                  <Text style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: Colors.highdarkaccent  ,
                      fontSize: Fonts.size.small}}>
                    Ignoré
                  </Text>
                </View>

                  <View style={{width: Metrics.screenWidth / 8, marginHorizontal: 5}}>
                  <Text style={{
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: Colors.highdarkaccent ,
                      fontSize: Fonts.size.small}}>
                    Reste
                  </Text>
                </View>

                </View>

                <TouchableWithoutFeedback
                  onPress={this.props.onPress}>
                <View  style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginHorizontal: Metrics.marginFirstPage,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Icon name="minus-square" size={30} color={Colors.highdarkaccent} />
                </View>
                </TouchableWithoutFeedback>
                </View>
              </View>)
/*
    return (
      <View style={{flex:1,backgroundColor: 'red'}}>
      <FoldView
                renderFrontface={this.renderBlankFace2}
                renderBackface={this.renderBackface}
              >
            </FoldView>
            </View>
          )*/
  }

  renderBarList(tab : Array<Object>){
    return (
        tab.map((cell, i) => {
          return (
            <View key={i} style={{
                width: Metrics.screenWidth / 10,
                marginHorizontal: 10,
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <View style={{
                    justifyContent: 'flex-end',
                    flex:1,
                  }}>
                  <View
                    style={{
                      height: cell.score* Metrics.barUnitCol,
                      width: Metrics.screenWidth / 12,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8,
                      backgroundColor: cell.color}}>
                  </View>
                </View>
      </View>
        )
          })
        )
  }/*
  innerRadius={0}
  radius={30}
  series={[like , 100 - like]}
  colors={[Colors.like, Colors.tweetColor]} */
  renderPie(like){

    var IconSize = 15
    var NumSize = Fonts.size.small
    var marginNum = 2
    return (
      <View style={{
          flex:1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>

      <View >
       <Pie
         innerRadius={15}
         radius={30}
         series={[like , 100 - like]}
         colors={[Colors.like, Colors.notlike]}
        />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>{(like == 100) ? "99%" : Math.floor(like) + "%"}</Text>
        </View>
      </View>


          <View style={{
              flex:1,
            alignItems: 'center',
            flexDirection: 'column',
            marginLeft: 10,
           }} >
           <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
             <Text style={[styles.swipStatsText, {fontSize: NumSize, marginRight:marginNum }]}>
            {this.props.nbLike}
           </Text>
           <Icon style={{marginTop: 10}} name="thumbs-up" size={IconSize} color={Colors.like} />
         </View>
    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
      <Text style={[styles.swipStatsText, {fontSize: NumSize, marginRight:marginNum }]}>
       {this.props.nbSwip - this.props.nbLike }
      </Text>
      <Icon  style={{marginTop: 10}}  name="thumbs-down" size={IconSize} color={Colors.notlike} />
      </View>


    </View>

   </View>)
  }

  render() {

    const onPress = this.props.onPress

    var pLike = (this.props.nbLike / this.props.maxCard) * 100
    var pNot = ( (this.props.nbSwip - this.props.nbLike) / this.props.maxCard) * 100

    var cardrest = (this.props.maxCard - this.props.nbSwip / this.props.maxCard) * 100
    var cLike = (this.props.nbLike/ this.props.nbSwip) * 100

    var data = [{
      score: pLike + pNot,
      title: "Swipé",
      color: Colors.swipColor
    },

    {
      score: pLike,
      title: "Aimé",
      color: Colors.like
    },
    {
      score: pNot,
      title: "Ignoré",
      color: Colors.notlike
    },
    {
      score: 100 - (pLike + pNot),
      title: "Restant",
      color: Colors.tweetColor
    }
  ]
    var preparedData = [[ pLike + pNot,'Swipé'], [100 - (pLike + pNot),'Restante'], [pLike,'Aimé' ], ['Ignoré', pNot]]

    return (
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'column',
          flex:1,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >

      <View style={{
        flex:2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
       }} >

       <View style={{
         flex:2,
         flexDirection: 'row',
         alignItems:'flex-start',
         justifyContent: 'center',
         borderBottomWidth: Metrics.graphWidth,
         borderBottomColor: Colors.accent,
         marginLeft: 5
        }} >

         {this.renderBarList(data)}
       </View>
        {this.renderPie(cLike)}
      </View>

        <View style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: '#FFFFFF',

         }} >

         {this.renderFoldView(data)}

        </View>

      </View>

    );
  }
}
//          {this.renderBarList(data)}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },

  gauge: {
    position: 'absolute',
    width: 60,
    height: 60,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: Colors.highdarkaccent,
    fontSize: 12,
  },
  swipStatsText:{
    color: Colors.highdarkaccent,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Italic',
    marginTop: 10
  },
  // BAR
});
