import React, {Component, PropTypes} from 'react';
import {StyleSheet, Dimensions, View, StatusBar, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images, Metrics } from './../Themes'
import rgb2hex from 'rgb2hex';

// const {height, width} = Dimensions.get('window');

const STATUSBAR_HEIGHT = (Platform.OS === 'ios') ? 20 : 5


class Background extends Component {

  static defaultProps = {
    zIndex: 0
  }

  state = {
  }

  componentDidMount = () => {
  }


  render () {
    return(
      <View
        style={styles.secondback}>

      </View>
    )
  }
}

/*
<LinearGradient
    style={[styles.linearGradient]}
    colors={[Colors.highlightaccent, Colors.highdarkaccent]}
  >
</LinearGradient>
*/

const styles = StyleSheet.create({
  secondback: {
    position: 'absolute',
    alignItems: 'stretch',
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: Metrics.screenHeight+ 300,
    borderTopWidth:  Metrics.screenHeight - 300,
    borderRightColor: 'transparent',
    borderTopColor: Colors.secondary,
},

  linearGradient: {
    position: 'absolute',
    flex : 1,
    alignItems: 'stretch',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});


export default Background
