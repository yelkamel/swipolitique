// @flow

import React from 'react'
import { TouchableOpacity,TouchableWithoutFeedback, Text,View } from 'react-native'
import styles from './Styles/ComponentStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../Themes/'


type RoundedButtonProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object,
  icon?: Object,
  backgroundColor: string,
}

export default class RoundedButton extends React.Component {
  props: RoundedButtonProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

getIcon ()
{

  if (this.props.icon == null)
    return ;
  return (
    <Icon
      style={[styles.ButtonIcon,
      {
      }]
    } name={this.props.icon}/>)
}

  render () {


    return (
      <TouchableOpacity style={[
          styles.RoundedButtonView,
          {
            backgroundColor: this.props.backgroundColor == null ? Colors.darkaccent : this.props.backgroundColor,
            borderWidth: 3,
            borderRadius: 10,
            borderColor: Colors.borderCard
          }]}
          onPress={this.props.onPress}>
        <View style={styles.buttonIconView}>
          {this.getIcon()}
        </View>
        <Text style={styles.ButtonText}>{this.getText()}</Text>
          <View style={styles.buttonLeftView}>
          </View>
      </TouchableOpacity>
    )
  }
}
