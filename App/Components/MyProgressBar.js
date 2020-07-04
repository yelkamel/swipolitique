import React, { Component } from 'react'
import { View, Text,Animated,
Easing,
StyleSheet
} from 'react-native'

import * as Progress from 'react-native-progress';


var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 3,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 3
  }
});
export default class MyProgressBar extends Component {
  static propTypes = {
};

static defaultProps= {
}
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      level: 0,
    }
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _handleOpenURL(event) {
    console.log(event.url);
  }

  hasSwiped(){

  }

  render() {
    return (
    <View>
      <Text>
        Niveau
      </Text>
      <Progress.Bar progress={0.5} width={200} />
    </View>
    );
  }
}
