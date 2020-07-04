// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles,Colors, Fonts} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
/// TAB
  tabView: {
    flex:1
  },

  SettingView: {
    flex:1
  },
  tinderContainer:{
    flex:1
  },

 card: {
   borderWidth: 1,
   backgroundColor: '#fff',
   borderColor: 'rgba(0,0,0,0.1)',
   margin: 5,
   height: 150,
   padding: 15,
   shadowColor: '#ccc',
   shadowOffset: { width: 2, height: 2, },
   shadowOpacity: 0.5,
   shadowRadius: 3,
 },
// END TAB


  displayButtonMenu: {
    position:'absolute',
    bottom: 0,
    left: Metrics.screenWidth / 2 - Metrics.screenWidth / 6
  },
  displayButtonView: {
    flex: 1,
    flexDirection: "row",
  },
  displayView: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
circle: {
  borderRadius: 50,
  height: 100,
  width: 100,
  margin: 15
},
  applicationView: {
    flex: 1,
    backgroundColor: Colors.highdarkaccent
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
  },
  chart: {
      width: 200,
      height: 200,
  },




  drawerText: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
  },

  listButtonView:{

  },
  actionButtonIcon: {
    fontSize: Fonts.size.regular,
    color: Colors.snow
  },
  signatureView: {
    justifyContent: 'flex-end'
  },
  signatureText: {
    color: Colors.snow,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
        fontFamily: 'HelveticaNeue-Italic',
        textAlign: 'right',

  },
  quoteText:{
    color: Colors.snow,
    marginVertical: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    fontSize: Fonts.size.input,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  byText:{
    color: Colors.snow,
    marginVertical: Metrics.smallMargin,
    textAlign: 'right',
    marginTop: 10,
    fontFamily: 'HelveticaNeue-Italic'
  },

  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },


  quoteContainer:{
    margin: Metrics.section,
    borderRadius: 10,
    alignItems:'flex-start'
  },
  randomButtonContainer:{
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  randomButtonView:{
    width: Metrics.randomWidth,
    marginBottom: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.randomHeight,
    backgroundColor: Colors.randomButton
  },
  randomButtonText:{
    fontSize: Fonts.size.regular,
    color: Colors.snow
  },


  logoView: {
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
  },
  quoteView: {
    margin: 10,
  },
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
})
