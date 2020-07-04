import React, {
  Component,
} from 'react';

import {
  LayoutAnimation,
  UIManager,
  View,
  TouchableHighlight,
  Text,
  Platform,
  StyleSheet
} from 'react-native';

import FoldView from 'react-native-foldview';
import { Images, Colors, Metrics, Fonts } from '../Themes'
import RoundedButton from './RoundedButton'
import IconEntypo from './IconEntypo'
import ResponsiveImage from 'react-native-responsive-image'
import ProfileCard from './FoldUtils/ProfileCard';
import {choicePicStats,choicePic,choicePicBan,choiceSlogan} from '../Containers/FunUtils'
import Pie from './SmallPie'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const BAN_HEIGHT = Metrics.screenHeight *  0.05
const BAN_WIDTH = Metrics.screenWidth * 0.25
const ROW_HEIGHT =  Metrics.RowHeight
const PIE_RADIUS = Metrics.screenWidth * 0.08
const Spacer = ({ height }) => (
  <View
    pointerEvents="none"
    style={{
      height,
    }}
    />
);
type RowProps = {
  order: number,
  by: string,
  nbLike: number,
  nbSwip: number,
  maxCard: number,
  maxLike:number,
}

export default class Row extends Component {
  props: RowProps


  constructor(props) {
    super(props);

    this.state = {
      height: ROW_HEIGHT,
    };
  }

  componentWillMount() {

  }


  renderThumbs(like){
    var IconSize = 15
    var NumSize = Fonts.size.medium
    var marginNum = 5

    return (
      <View style={{
          flex:1,
        alignItems: 'center',
        flexDirection: 'row',
       }}>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={[styles.swipStatsText, {fontSize: NumSize, marginRight:marginNum }]}>
          {this.props.nbLike}
        </Text>
        <IconEntypo  style={{marginTop: 10}} name="thumbs-up" size={IconSize} color={Colors.like} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={[styles.swipStatsText, {fontSize: NumSize, marginRight:marginNum }]}>
          {this.props.nbSwip - this.props.nbLike }
        </Text>
        <IconEntypo  style={{marginTop: 10}}  name="thumbs-down" size={IconSize} color={Colors.notlike} />
      </View>
      </View>
    )
  }
renderPie(like){
  return (
    <View >
     <Pie
       innerRadius={PIE_RADIUS/2}
       radius={PIE_RADIUS}
       series={[like , 100 - like]}
       colors={[Colors.like, Colors.notlike]}
      />
      <View style={styles.gauge}>
        <Text style={styles.gaugeText}>{(like == 100) ? "99%" : Math.floor(like) + "%"}</Text>
      </View>
    </View>
  )
}


renderPieThumbs(){
    var like = (this.props.nbLike/ this.props.nbSwip) * 100


    return (
      <View style={{
          margin:5,
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      {this.renderPie(like)}
      {this.renderThumbs(like)}

    </View>)
  }

  renderNumRank(){
    return (<Text style={{
        fontSize: Fonts.size.h2,
        color: Colors.highdarkaccent,
        margin: 10,
        fontWeight: 'bold',
      }}>
      {this.props.order}
    </Text>)
  }

  renderPicStats(){
    return(
      <ResponsiveImage style={styles.tweetImageView} source={choicePic(this.props.by)} initWidth="80" initHeight="80" />
    )
  }

  renderSlogan(){
    return (
      <View
        style={{
          width:Metrics.screenWidth * 0.30,
          height: ROW_HEIGHT,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <ResponsiveImage style={styles.benImageView} source={choicePicBan(this.props.by)} initWidth={BAN_WIDTH} initHeight={BAN_HEIGHT} />
          <View
            style={{
              height:ROW_HEIGHT /5,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
        <Icon style={{marginRight: 5}} name="cards" size={20} color={Colors.darkaccent} />
        <Text
          style={styles.sloganText}>
          {this.props.maxCard - this.props.nbSwip}
        </Text>
        </View>
      </View>)
  }
//          {choiceSlogan(this.props.by)}

  renderSimpleRanking(){

    if (this.props.order%2 != 0 )
    return(
      <View
        style={{
          flex:1,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: 'snow'
        }}
        >
          <View style={{flex:1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'}}>

              {this.renderNumRank()}
              {this.renderPicStats()}
              {this.renderPieThumbs()}
              {this.renderSlogan()}
            </View>
          </View>
        )
        else {
        return(
          <View
            style={{
              flex:1,
              flexDirection: 'row',
              alignItems: 'center',
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'snow'
            }}
            >
              <View style={{flex:1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'}}>

                  {this.renderSlogan()}
                  {this.renderPieThumbs()}
                  {this.renderPicStats()}
                  {this.renderNumRank()}
                </View>
              </View>
            )
        }
      }

      renderBackface() {

        return (
          <ProfileCard
            onPress={this.flip}
            nbLike={this.props.nbLike}
            nbSwip={this.props.nbSwip}
            maxCard={this.props.maxCard}
            maxLike={this.props.maxLike}
            />
        )
      }


      render() {
        const { height } = this.state;
        const { zIndex } = this.props;

        const spacerHeight = height - ROW_HEIGHT;

        return (
          <View
            style={{
              flex: 1,
              zIndex,
              height: ROW_HEIGHT,
              marginVertical: 8,
              marginRight:  (this.props.order%2 != 0) ? 0: 20,
              marginLeft: (this.props.order%2 != 0) ? 20: 0,
            }}
            >
            {this.renderSimpleRanking()}
          </View>
        );
      }
    }

const styles = StyleSheet.create({
  benImageView: {
    width: BAN_WIDTH,
    alignItems: 'flex-start',
    height: BAN_HEIGHT,
    margin: 10,
  },
  sloganText:{
    color: Colors.darkaccent,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Italic',
    fontSize: 15,
  },
  tweetImageView:{
    borderRadius: (Platform.OS == 'ios') ? 30 : 0,
    borderColor: Colors.highdarkaccent,
    borderWidth: 2,
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#33373B',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
  // PIE
  gauge: {
    position: 'absolute',
    width: PIE_RADIUS * 2,
    height: PIE_RADIUS * 2,
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
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    marginTop: 10
  },
});
