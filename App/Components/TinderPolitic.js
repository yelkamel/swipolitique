import React from 'react';
import {StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  AppState
} from 'react-native';
// LAST
import { Colors, Images,Metrics, Fonts } from '../Themes/'
import ResponsiveImage from 'react-native-responsive-image'
import Browser from 'react-native-browser';
import ShareButton from './ShareButton'
import OpenLinkButton from './OpenLinkButton'
import SwipeCards from './MySwipeCard';
import PoliticQuote from '../Containers/PoliticQuote'
import _ from 'lodash'
import {choicePic, convertToSimpleArray} from '../Containers/FunUtils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PIC_SIZE= Metrics.screenHeight * 0.18
export class Card extends React.Component{

  removeUrlFromString(str){
    var res = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
    return res
  }


  renderCross(){

    return (
      <TouchableOpacity
        onPress={this.props.ignoreCard}
        style={styles.crossIconView}>
        <Icon style={styles.crossIcon} name="close-circle"/>
      </TouchableOpacity>
    )

  }

  render() {

    var textSize = 15

    if (this.props.isHide)
    return (
      <View style={styles.tweetContainer}>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            width: Metrics.swiperWidth,
          }}>
          {this.renderCross()}
          <ResponsiveImage style={styles.tweetImageView}
              source={Images.anynome}
              initWidth={PIC_SIZE}
              initHeight={PIC_SIZE}
              />
          <View style={{
              flex:1
          }}>
          </View>
        </View>
        <View style= {styles.tweetGlobalView}>
          <Text style={styles.tweetDateText}>{this.props.type}</Text>
          <View style= {styles.tweetTextView}>
            <Text style={[styles.tweetText,{fontSize: textSize}]}>{this.props.descr}</Text>
          </View>
          <Text style={styles.tweetByText}></Text>
        </View>
      </View>)


      return (
        <View style={styles.tweetContainer}>
          <View style={{
            flexDirection:'row',
            width: Metrics.swiperWidth,
          }}>
            {this.renderCross()}
            <ResponsiveImage style={styles.tweetImageView}
              source={choicePic(this.props.by)}
                initWidth={PIC_SIZE}
                initHeight={PIC_SIZE}
                />
            <View style={{
                flex:1
            }}>
            </View>
          </View>
          <View style= {styles.tweetGlobalView}>
            <Text style={styles.tweetDateText}>{this.props.type}</Text>
            <View style= {styles.tweetTextView}>
              <Text style={[styles.tweetText,{fontSize: textSize}]}>{this.props.descr}</Text>
            </View>
            <Text style={styles.tweetByText}>{this.props.by}</Text>
          </View>
        </View>)
  }
}

let NoMoreCards = React.createClass({

  render() {
    var textSize = 15

    return (
      <View style={styles.tweetContainer}>
        <ResponsiveImage style={styles.tweetImageView}
            source={choicePic("YouYou")}
            initWidth={PIC_SIZE}
            initHeight={PIC_SIZE}
            />
        <View style= {styles.tweetGlobalView}>
          <Text style={styles.tweetDateText}>Remerciement</Text>
          <View style= {styles.tweetTextView}>
            <Text style={[styles.tweetText,{fontSize: textSize}]}>
              Plus de cartes disponibles avec ce filtre.
            </Text>
            <Text style={[styles.tweetText,{fontSize: textSize}]}>
              Merci d'avoir utilisé Swip Politique, j'espère que vous en savez plus sur les candidats à la présidentielle.
            </Text>
          </View>
          <Text style={styles.tweetByText}>Un petit coup de pouce en partageant l'application sur les réseaux sociaux.</Text>
        </View>
      </View>
    )
  }
})


//const CARDS = PoliticQuote.TWEET_LIST
const CARDS2 = [
  {id: '000', by: 'Le Développeur',descr: "Désolé, un problème est survenu veuillé modifier vos filtre de proposition et redemarrer l'application.", image: Images.logoBack, type:'Excuse'},
]


export default class TinderPolitic extends React.Component{


  constructor(props) {
    super(props);

    this.state = {
      cards: _.shuffle(this.filterCards(this.props.filterType, this.props.filterCan)),
      outOfCards: false,
    }

  }

  filterCards(filterType, filterCan){
    return _.filter(PoliticQuote.TWEET_LIST,
    (cell)=>{
      return filterCan.includes(cell.by) && filterType.includes(cell.type) && !this.props.swipedCardIds.includes(cell.id)
    })

  }

  ignoreCard = () =>{
    this.SwipComponent._IgnoreCard()
  }

  handleYup =(card) =>{
    this.props.TurnRight()
  }
  handleNope =(card)=> {
    this.props.TurnLeft()

  }

  componentWillMount(){

  }

  shouldComponentUpdate(nextProps,nextState){

    return true
  }

  componentWillReceiveProps(nextProps) {
    /*
    var arrayTmpCard = PoliticQuote.TWEET_LIST

      arrayTmpCard= this.filterCards(nextProps.filterType,nextProps.filterCan)
    }

    if (nextProps.filterCan != null && !_.isEqual(this.props.filterCan, nextProps.filterCan) ){
      arrayTmpCard=this.filterCardCan(nextProps.filterCan, arrayTmpCard)
    }
    */
    /*
    if (this.props.filterCan.length < 1 || this.props.filterType.length < 1){
      this.setState({
        cards: this.filterCards(nextProps.filterType,nextProps.filterCan).sort(() => {return 0.5 - Math.random()})
      })

    }
    */


    if ( !_.isEqual(nextProps.filterCan,this.props.filterCan)
      || !_.isEqual(nextProps.filterType,this.props.filterType)){

      var arrayTmpCard = _.shuffle(this.filterCards(nextProps.filterType,nextProps.filterCan))

      this.setState({
        cards: arrayTmpCard
      })

      if (arrayTmpCard[0] != null){
        this.props.getCurrentCard(arrayTmpCard[0])
      }

    }
  }

  cardRemoved = (index)=> {

    let CARD_REFRESH_LIMIT = 3
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${CARDS2.length} more cards`)

        this.setState({
          cards: CARDS2,
          outOfCards: true,
        })
      }

    }

    this.props.getCurrentCard(this.state.cards[index+1])
  }

  componentDidMount() {
    if (this.state.cards[0] != null){
        this.props.getCurrentCard(this.state.cards[0])
       }
  }

  componentWillMount(){

  }

  componentWillUnmount (){
  }

  _handleAppStateChange(currentAppState) {

  }

  goToNextCard = (index ) => {
    if (this.state.cards[index] != null ){
      this.props.goToNextCard()
      this.props.getCurrentCard(this.state.cards[index])

   }
  }


  render() {
    return (
      <SwipeCards
        ref={SwipComponent => this.SwipComponent = SwipComponent}
        goToNextCard={this.goToNextCard}
        cards={this.state.cards}
        loop={false}
        renderCard={(cardData) => <Card {...cardData} isHide={this.props.isHide} ignoreCard={this.ignoreCard} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        nopeText="J'aime PAS "
        yupText="J'aime "
        showDone={this.props.isHide}
        smoothTransition={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
}

const styles = StyleSheet.create({
  tweetImageView:{
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderCard,
    borderWidth: 2,
    borderRadius: Metrics.cardBorderRadius,
    width: PIC_SIZE,
    height: PIC_SIZE,
  },
  tweetGlobalView:{
    width: Metrics.randomWidth,
    marginBottom: Metrics.cardBorderRadius,
    borderRadius: 10,
    height: Metrics.randomHeight,
  },
  tweetTextView:{
    marginTop: 10,
/*  borderTopWidth: Metrics.borderWidth,
    borderBottomWidth: Metrics.borderWidth,
    borderTopColor: Colors.darkaccent,
    borderBottomColor:Colors.darkaccent, */
  },
  tweetText:{
    color: Colors.darksecondary,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  tweetDateText:{
    color: Colors.darkaccent,
    marginVertical: Metrics.smallMargin,
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: Fonts.size.input + 2,
    fontFamily: 'Rubik-Regular'
  },
  tweetByText:{
    color: Colors.darkaccent,
    marginVertical: Metrics.smallMargin,
    textAlign: 'right',
    marginRight: 10,
    fontSize: Fonts.size.input - 2,
    marginTop: 5,
  },
  tweetContainer: {
    alignItems: 'center',
    borderRadius: Metrics.cardBorderRadius,
    overflow: 'hidden',
    backgroundColor: Colors.snow,
//    borderColor: Colors.borderCard,
//    borderWidth: Metrics.CardsBorderWitdh,
    height: Metrics.swiperHeight,
    width: Metrics.swiperWidth,
    marginBottom: Metrics.marginCardBottom,
    elevation: 10,
    zIndex: 5,
    top: 0,
    bottom: 0,
    left:0,
    right:0
  },

  crossIconView:{
    marginTop:  (Platform.OS === 'ios') ? 0 : 20,
    alignItems: 'flex-start',
    flex:1,
  },

  crossIcon: {
    color: Colors.accent,
    margin: 10,
    fontSize: 40,
  },

  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
