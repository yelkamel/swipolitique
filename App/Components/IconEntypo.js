import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

export default class IconEntypo extends Component {
  static propTypes = {
};

static defaultProps= {
  size: 10,
  color: 'black',
}
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <Icon  style={this.props.style}
             name={this.props.name}
             size={this.props.size}
             color={this.props.color}
      />
    );
  }
}
