// @flow

import React from 'react'
import { TouchableOpacity, Text,View,StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics, Fonts } from '../Themes/'


type StatsButtonProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object,
  icon?: Object,
  backgroundColor: string,
}

export default class StatsButton extends React.Component {
  props: StatsButtonProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

getIcon ()
{
  if (this.props.icon == null)
    return ;
  return (
    <Icon style={styles.ButtonIcon} name={this.props.icon}/>)
}

  render () {
    return (
      <TouchableOpacity style={[styles.ButtonGlobalView,{backgroundColor: this.props.backgroundColor == null ? Colors.darkaccent : this.props.backgroundColor  }]} onPress={this.props.onPress}>
        <View style={styles.buttonLeftView}>
        <Text style={styles.ButtonText}>{this.getText()}</Text>
        </View>


        <View style={styles.buttonIconView}>
          {this.getIcon()}
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
ButtonGlobalView: {
  flex: 1,
  width:  Metrics.screenWidth / 3,
  flexDirection: "row",
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
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
  marginRight: 10,
},
ButtonText: {
  color: Colors.snow,
  fontWeight: 'bold',
  fontSize: Fonts.size.regular,
  marginVertical: Metrics.baseMargin,
  marginHorizontal:  Metrics.baseMargin
},
ButtonIcon: {
color: Colors.snow,
fontWeight: 'bold',
fontSize: Fonts.size.regular,
marginHorizontal:  Metrics.baseMargin,
marginVertical: Metrics.baseMargin
},

})
