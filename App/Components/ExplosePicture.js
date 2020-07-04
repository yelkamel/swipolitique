import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
  Animated,
  Clipboard,
  Platform,
} from 'react-native';
import { Colors, Metrics,Images, Fonts } from '../Themes/'
import ResponsiveImage from 'react-native-responsive-image'

import * as Animatable from 'react-native-animatable'
import {choicePic} from '../Containers/FunUtils'

import Icon from 'react-native-vector-icons/FontAwesome'

var SQUARE_DIMENSIONS = Metrics.screenWidth* 0.3
var SHOWTIME = 2000
var ANIMATION_CONFIG = {easing: Easing.ease,  friction: 1, duration: 1000}
var height = Metrics.screenHeight * 0.3
var width = Metrics.screenWidth* 0.3

var GLOBALE_INIT = {x: 0, y : - 10000 }

var LEFT_POS_INITIAL = {x: -SQUARE_DIMENSIONS, y: Metrics.screenHeight/2 - SQUARE_DIMENSIONS/2}
var LEFT_POS_TO = {x: Metrics.screenWidth/2-SQUARE_DIMENSIONS, y: Metrics.screenHeight/2 - SQUARE_DIMENSIONS/2}

var RIGHT_POS_INITIAL = {x: Metrics.screenWidth + SQUARE_DIMENSIONS, y: Metrics.screenHeight/2 - SQUARE_DIMENSIONS/2}
var RIGHT_POS_TO = {x: Metrics.screenWidth/2, y: Metrics.screenHeight/2 - SQUARE_DIMENSIONS/2}
const PIC_SIZE = SQUARE_DIMENSIONS - 20

export default class ExplosePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pan:  new Animated.ValueXY({x:0,y:-10000}),
      enter: new Animated.Value(0.5),
      isShowingPicture:false
    }
  }


  getStyle () {
    const hidden = this.state.isShowingPicture === false && styles.hidden;

    return [
      styles.square,
      hidden,
      {
        transform: this.state.pan.getTranslateTransform()
      }
    ];
  }
  componentWillMount () {
  }

  componentDidMount() {
  }

  startAndRepeat () {
  }


  lunchAnimation(isLinking){
    console.log("BEGIN AutoShow Animation");

    this.setState({
      isShowingPicture: true
    })

    this.state.pan.setValue(isLinking ? RIGHT_POS_INITIAL : LEFT_POS_INITIAL)
    Animated.sequence([
      Animated.timing(this.state.pan, {
        ...ANIMATION_CONFIG,
        toValue: isLinking ? RIGHT_POS_TO: LEFT_POS_TO//animate to bottom left
      }),

      Animated.timing(this.state.pan, {
        ...ANIMATION_CONFIG,
        toValue: isLinking ? RIGHT_POS_INITIAL : LEFT_POS_INITIAL// animated to bottom right
      })
    ]).start();

    setTimeout(()=>{
      this.setState({
        isShowingPicture: false
      })
    }, SHOWTIME)


  }


showPicture(){

  console.log("=> isShowingPicture: "+ this.state.isShowingPicture + " by: "+ this.props.by);

  if (this.state.isShowingPicture  == true)
    return (<ResponsiveImage style={styles.ImagesView}
        source={choicePic(this.props.by)}
        initWidth={PIC_SIZE}
        initHeight={PIC_SIZE}
        />)

    return (<ResponsiveImage style={styles.ImagesView}
        source={Images.logoBack}
        initWidth={PIC_SIZE}
        initHeight={PIC_SIZE}
        />)

}

render() {

    return (
      <View style={styles.GlobaleView}>
        <Animated.View style={this.getStyle()}>
          {this.showPicture()}
          <Text style={styles.textStyle}>
            {this.props.by}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  GlobaleView: {
    position: 'absolute',
    bottom: 0,
    left:0,
    height: Metrics.screenHeight ,
  },
  textStyle:{
    color: Colors.darkaccent,
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.smallMargin + 1,

  },
  ImagesView:{
   marginTop: 10,
   borderRadius: Metrics.cardBorderRadius,
   borderColor: Colors.borderCard,
   borderWidth: 2,
   borderRadius: Metrics.cardBorderRadius,
   width: PIC_SIZE,
   height: PIC_SIZE,
  },
  container: {
    flex: 1
  },
  hidden: {
  top: -10000,
  left: 0,
  height: 0,
  width: 0,
},
  square: {
    borderRadius: Metrics.cardBorderRadius,
    width: SQUARE_DIMENSIONS ,
    height: SQUARE_DIMENSIONS +SQUARE_DIMENSIONS/2,
    alignItems:'center',

    shadowOpacity: 0.35,
    shadowOffset: {
      width: 10, height: 10,
    },
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 10,
    borderColor: Colors.borderCard,
    borderWidth: 1,
    borderRadius: Metrics.cardBorderRadius,
    backgroundColor: Colors.snow,
  }
});
