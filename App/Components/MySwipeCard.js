/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, { Component } from 'react';

import { Colors, Images,Metrics, Fonts } from '../Themes/'
import RoundedButton from './RoundedButton'
import ShareButton from './ShareButton'

import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'

import {
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  Animated,
  TouchableOpacity,
  PanResponder,
  Image
} from 'react-native';

import clamp from 'clamp';

import Defaults from './Defaults.js';

const SWIPE_THRESHOLD = 120;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  yup: {
    backgroundColor: 'green',
    position: 'absolute',
    padding: 20,
    top:  50,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'white',
  },
  nope: {
    backgroundColor: Colors.notlike,
    position: 'absolute',
    top: 50,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'white',
  },
  doneText: {
    fontSize: 14,
    color: Colors.darkaccent,
  },
  done:{
    backgroundColor: Colors.snow,
    position: 'absolute',
    top: Metrics.screenHeight * 0.57,
    padding: 10,
    borderWidth: 3,
    borderColor: Colors.borderCard,
    borderRadius: 20,
    left: Metrics.screenWidth * 0.30,
  },
  RoundedButtonView : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 10,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0, height: 5,
    },
    shadowColor: '#000',
	  shadowRadius: 3,
	  elevation: 5,
  },
  ButtonIconView: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',

  },
  ButtonText: {
    marginVertical: 10,
    color: Colors.snow,
    fontSize: Fonts.size.medium+2,
    marginHorizontal: Metrics.baseMargin,
  },
  ButtonIcon: {
    color: Colors.snow,
    fontSize: Fonts.size.input+2,
    marginLeft:  Metrics.baseMargin
  },
});

//Components could be unloaded and loaded and we will loose the users currentIndex, we can persist it here.
let currentIndex = {};
let guid = 0;

export default class MySwipeCards extends Component {

  static propTypes = {
    cards: React.PropTypes.array,
    cardKey: React.PropTypes.string,
    loop: React.PropTypes.bool,
    allowGestureTermination: React.PropTypes.bool,
    stack: React.PropTypes.bool,
    stackGuid: React.PropTypes.string,
    stackDepth: React.PropTypes.number,
    stackOffsetX: React.PropTypes.number,
    stackOffsetY: React.PropTypes.number,
    renderNoMoreCards: React.PropTypes.func,
    showYup: React.PropTypes.bool,
    showNope: React.PropTypes.bool,
    handleYup: React.PropTypes.func,
    handleNope: React.PropTypes.func,
    yupText: React.PropTypes.string,
    noText: React.PropTypes.string,
  //  onClickHandler: React.PropTypes.func,
    renderCard: React.PropTypes.func,
    cardRemoved: React.PropTypes.func,
    dragY: React.PropTypes.bool
  };

  static defaultProps = {
    cards: [],
    cardKey: 'key',
    loop: false,
    allowGestureTermination: true,
    stack: false,
    stackDepth: 5,
    stackOffsetX: 25,
    stackOffsetY: 0,
    showYup: true,
    showNope: true,
    handleYup: (card) => null,
    handleNope: (card) => null,
    nopeText: "Nope!",
    yupText: "Yup!",
  //  onClickHandler: () => { alert('tap') },
    goToNextCard: (ix) => null,
    cardRemoved: (ix) => null,
    renderCard: (card) => null,
    style: styles.container,
    dragY: true
  };

  constructor(props) {
    super(props);

    //Use a persistent variable to track currentIndex instead of a local one.
    this.guid = this.props.guid || guid++;
    if (!currentIndex[this.guid]) currentIndex[this.guid] = 0;

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      cards: [].concat(this.props.cards),
      card: this.props.cards[currentIndex[this.guid]],
      isLoading: true,
    };

    this.lastX = 0;
    this.lastY = 0;

    this.cardAnimation = null;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        this.lastX = gestureState.moveX;
        this.lastY = gestureState.moveY;
        return false;
      },
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        return (gestureState.dx != 0 && gestureState.dy != 0)
        &&(Math.abs(this.lastX - gestureState.moveX) > 5 || Math.abs(this.lastY - gestureState.moveY) > 5);
      },
      //(gestureState.dx < Metrics.swiperWidth - Metrics.crossSize && gestureState.dy <Metrics.swiperHeight - Metrics.crossSize)

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderTerminationRequest: (evt, gestureState) => this.props.allowGestureTermination,

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.props.dragY ? this.state.pan.y : 0 },
      ]),

      onPanResponderRelease: (e, {vx, vy, dx, dy}) => {
        this.state.pan.flattenOffset();
        let velocity;
    /*    if ((dx === 0) && (dy === 0))   //meaning the gesture did not cover any distance
        {
          this.props.onClickHandler(this.state.card)
        }
        */

        if (vx > 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

              if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD && vx !== 0) {

          let cancelled = false;

          if (this.state.pan.x._value > 0) {
            cancelled = this.props.handleYup(this.state.card);
          } else {
            cancelled = this.props.handleNope(this.state.card);
          }

          //Yup or nope was cancelled, return the card to normal.
          if (cancelled) {
            this._resetPan();
            return;
          };

          this.props.cardRemoved(currentIndex[this.guid]);

          this.cardAnimation = Animated.decay(this.state.pan, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          });
          this.cardAnimation.start(status => {
            if (status.finished) this._advanceState();
            else this._resetState();

            this.cardAnimation = null;
          }
          );

        } else {
          this._resetPan();
        }
      }
    });
  }

  _forceDownSwipe(){

  }


  componentWillMount(){


  }
  componentWillUnmount() {
  }


  _forceLeftSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: -500, y: 0 },
    }).start(status => {
      if (status.finished) this._advanceState();
      else this._resetState();

      this.cardAnimation = null;
    }
      );
    this.props.cardRemoved(currentIndex[this.guid]);
  }

  _forceRightSwipe() {
    this.cardAnimation = Animated.timing(this.state.pan, {
      toValue: { x: 500, y: 0 }
    }).start(status => {
      if (status.finished) this._advanceState();
      else this._resetState();

      this.cardAnimation = null;
    }
      );
    this.props.cardRemoved(currentIndex[this.guid]);
  }

  _IgnoreCard() {
    currentIndex[this.guid]++;

    Animated.sequence([
      Animated.timing(this.state.enter,
      {
        toValue: 0,
        friction: 8,
        duration: 300
      }),
      Animated.timing(
        this.state.enter,
        {
          toValue: 1,
          friction: 8,
          duration: 700
        }
      )
    ]).start();


    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    if (currentIndex[this.guid] > this.state.cards.length - 1 && this.props.loop) {
      currentIndex[this.guid] = 0;
    }
/*
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance(); */

    this.props.goToNextCard(currentIndex[this.guid])

    this.setState({
      card: this.state.cards[currentIndex[this.guid]]
    });


  }

  _goToNextCard() {
    this.state.pan.setValue({ x: 0, y: 0 });
  //  this.state.enter.setValue(0);
    this._animateEntrance();

    currentIndex[this.guid]++;

    if (currentIndex[this.guid] > this.state.cards.length - 1 && this.props.loop) {
      currentIndex[this.guid] = 0;
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]]
    });
  }

  _goToPrevCard() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();

    currentIndex[this.guid]--;

    if (currentIndex[this.guid] < 0) {
      currentIndex[this.guid] = 0;
    }

    this.setState({
      card: this.state.cards[currentIndex[this.guid]]
    });
  }


  componentDidMount() {
    this._animateEntrance();

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 200)
  }


  _animateEntrance() {
    /*
    Animated.sequence([
      Animated.spring(
        this.state.enter,
        { toValue: 1, friction: 8}
      ),
    ]).start();
    */

    Animated.spring(
      this.state.enter,
      {
        toValue: 1,
        friction: 8,
        delay: 300,
        duration: 1100
      }
    ).start()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cards !== this.props.cards) {

      if (this.cardAnimation) {
        this.cardAnimation.stop();
        this.cardAnimation = null;
      }

      currentIndex[this.guid] = 0;
      this.setState({
        cards: [].concat(nextProps.cards),
        card: nextProps.cards[0]
      });
    }
  }

  _resetPan() {
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start();
  }

  _resetState() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();
  }

  _advanceState() {
    this.state.pan.setValue({ x: 0, y: 0 });
    this.state.enter.setValue(0);
    this._animateEntrance();
    this._goToNextCard();
  }

  /**
   * Returns current card object
   */
  getCurrentCard() {


    return this.state.cards[currentIndex[this.guid]];
  }

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards) {
      return this.props.renderNoMoreCards();
    }

    return <Defaults.NoMoreCards />;
  }

  /**
   * Renders the cards as a stack with props.stackDepth cards deep.
   */
  renderStack() {
    if (!this.state.card) {
      return this.renderNoMoreCards();
    }

    //Get the next stack of cards to render.
    let cards = this.state.cards.slice(currentIndex[this.guid], currentIndex[this.guid] + this.props.stackDepth).reverse();

    return cards.map((card, i) => {

      let offsetX = this.props.stackOffsetX * cards.length - i * this.props.stackOffsetX;
      let lastOffsetX = offsetX + this.props.stackOffsetX;

      let offsetY = this.props.stackOffsetY * cards.length - i * this.props.stackOffsetY;
      let lastOffsetY = offsetY + this.props.stackOffsetY;

      let opacity = 0.25 + (0.75 / cards.length) * (i + 1);
      let lastOpacity = 0.25 + (0.75 / cards.length) * i;

      let scale = 0.85 + (0.15 / cards.length) * (i + 1);
      let lastScale = 0.85 + (0.15 / cards.length) * i;

      let style = {
        position: 'absolute',
        top: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOffsetY, offsetY] }),
        left: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOffsetX, offsetX] }),
        opacity: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastOpacity, opacity] }),
        transform: [{ scale: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastScale, scale] }) }],
        elevation: i * 10
      };

      //Is this the top card?  If so animate it and hook up the pan handlers.
      if (i + 1 === cards.length) {
        let {pan} = this.state;
        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"] });
        let opacity = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] });

        let animatedCardStyles = {
          ...style,
          transform: [
            { translateX: translateX },
            { translateY: translateY },
            { rotate: rotate },
            { scale: this.state.enter.interpolate({ inputRange: [0, 1], outputRange: [lastScale, scale] }) }
          ]
        };

        return <Animated.View key={card[this.props.cardKey]} style={[styles.card, animatedCardStyles]} {... this._panResponder.panHandlers}>
          {this.props.renderCard(this.state.card)}
        </Animated.View>;
      }
      return <Animated.View key={card[this.props.cardKey]} style={style}>{this.props.renderCard(card)}</Animated.View>;
    });
  }

  renderCard() {
    if (!this.state.card) {
      return this.renderNoMoreCards();
    }

    let {pan, enter} = this.state;
    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"] });
    let opacity = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] });

    let scale = enter;

    let animatedCardStyles = { transform: [{ translateX }, { translateY }, { rotate }, { scale }], opacity };

    return <Animated.View key={"top"} style={[styles.card, animatedCardStyles]} {... this._panResponder.panHandlers}>
      {this.props.renderCard(this.state.card)}
    </Animated.View>;
  }

  renderDoneYes() {
    let {pan} = this.state;

    let yupOpacity = pan.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    let yupScale = pan.x.interpolate({ inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp' });
    let animatedYupStyles = { transform: [{ scale: yupScale }], opacity: yupOpacity };

    if (this.props.showDone && this.state.isLoading == false) {
      return <Animated.View style={[styles.done,animatedYupStyles]}>
        <Text style={styles.doneText}>{this.props.doneText}</Text>
      </Animated.View>;
    }

    return null;
  }
  renderDoneNope() {
    let {pan} = this.state;

    let nopeOpacity = pan.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    let nopeScale = pan.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp' });
    let animatedNopeStyles = { transform: [{ scale: nopeScale }], opacity: nopeOpacity };

    if (this.props.showDone && this.state.isLoading == false) {
      return <Animated.View style={[styles.done, animatedNopeStyles]}>
        <Text style={styles.doneText}>{this.props.doneText}</Text>
      </Animated.View>;
    }

    return null;
  }

  renderNope() {
    let {pan} = this.state;

    let nopeOpacity = pan.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    let nopeScale = pan.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp' });
    let animatedNopeStyles = { transform: [{ scale: nopeScale }], opacity: nopeOpacity };



    if (this.props.renderNope) {
      return this.props.renderNope(pan);
    }

    if (this.props.showNope) {
      return <Animated.View style={[styles.nope, animatedNopeStyles]}>
        <Text style={styles.nopeText}>{this.props.nopeText}</Text>
      </Animated.View>;
    }


    return null;
  }

  renderYup() {
    let {pan} = this.state;

    let yupOpacity = pan.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    let yupScale = pan.x.interpolate({ inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp' });
    let animatedYupStyles = { transform: [{ scale: yupScale }], opacity: yupOpacity };

    if (this.props.renderYup) {
      return this.props.renderYup(pan);
    }

    if (this.props.showYup) {
      return <Animated.View style={[styles.yup, animatedYupStyles]}>
        <Text style={styles.yupText}>{this.props.yupText}</Text>
      </Animated.View>;
    }

    return null;
  }


  renderIgnorer(){
    if (!_.isEmpty(this.state.card)){
    return (
      <TouchableOpacity
        style={styles.RoundedButtonView}
        onPress={()=>{
          this._IgnoreCard()
        }}>
      <View style={styles.buttonIconView}>
        <Icon
          style={styles.ButtonIcon} name="times-circle"/>
      </View>
      <Text style={styles.ButtonText}>Ignorer</Text>
      </TouchableOpacity>
    )
    }
    else{
      return(<ShareButton
        backgroundColor={Colors.accent}
        shareText="N’hésitez plus et affirmez votre choix pour les présidentielles 2017 avec l'apps Swip Politique gratuit sur Android et iPhone"
        shareUrl="http://onelink.to/swip_politique"
        />)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.stack ? this.renderStack() : this.renderCard()}
        {this.renderNope()}
        {this.renderYup()}
      </View>
    );
  }
}
