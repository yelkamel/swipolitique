// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({

  RoundedButtonView : {
  width: Metrics.buttonWidth,
  height: Metrics.buttonHeight,
  borderRadius: Metrics.buttonRadius,
  marginHorizontal: Metrics.marginRoundedButton,
  marginVertical: Metrics.baseMargin,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

button: {

  width: Metrics.buttonWidth,
  height: Metrics.buttonHeight,
  borderRadius: Metrics.buttonRadius,
  marginHorizontal: Metrics.marginRoundedButton,
  marginVertical: Metrics.baseMargin,
  backgroundColor: Colors.darkaccent,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
buttonTextView: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'

},
buttonLeftView: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
},
ButtonIconView: {
  flex: 1,
  justifyContent: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
},
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
