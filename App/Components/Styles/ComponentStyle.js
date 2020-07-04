import { StyleSheet, Image, Dimensions } from 'react-native'
import { Colors, Metrics,Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  actionButtonIcon: {
  color: Colors.secondColor,
//  fontWeight: 'bold',
  fontSize: 20,
},
  showButtonView:{
      width: Metrics.buttonShowHeight,
      height: Metrics.buttonShowHeight,
      borderColor: Colors.borderCard,
      borderWidth: Metrics.CardsBorderWitdh-1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },

  // PRAT SECTION
  pratText:{
    ...ApplicationStyles.darkLabel
  },

  shareButtonIcon: {
    fontSize: Fonts.size.regular,
    color: Colors.snow
  },
  PratButtonView: {
    height: Metrics.buttonHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex:1
  },
  PratButtonBackground : {
    flex: 1,
    height: Metrics.buttonHeight,
    borderRadius: Metrics.buttonRadius
  },

  PratButtonLabel: {
    color: Colors.snow
  },

  sectionHeaderView: {
  ...ApplicationStyles.darkLabelContainer,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  sectionHeaderText: {
    ...ApplicationStyles.darkLabel,
  },

  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  sectionHeaderContainer: {
    ...ApplicationStyles.darkLabelContainer
  },


  sectionHeader: {
    ...ApplicationStyles.darkLabel
  },
  // MODAL STYLE
  noteModal:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkaccent,
    height: Metrics.swiperNoteSize + 25,
    width : Metrics.modalWidth,
  },
  swipperWrapper:{
  },
  swiperText :{
    ...ApplicationStyles.darkLabel,
    marginHorizontal:  Metrics.marginHoriNoteSection,
    marginVertical: Metrics.baseMargin,
  },
  swiperView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChart: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  chart: {
      width: 200,
      height: 200,
  },

  noteCursor: {
    fontWeight: 'bold',
    opacity: 0
  },
  noteDisplay: {
    opacity: 1
  },
  shareButtonView: {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
  },
  RoundedButtonView : {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
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
    backgroundColor: 'red'
  },
  ButtonIconView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonText: {
    color: Colors.secondColor,
    fontWeight: 'bold',
    fontSize: Fonts.size.small,
    marginVertical: Metrics.baseMargin,
  },
  ButtonIcon: {
  color: Colors.secondColor,
  fontWeight: 'bold',
  fontSize: Fonts.size.regular,
  marginVertical: Metrics.baseMargin,
  marginHorizontal: (Metrics.screenWidth < 350) ?  Metrics.smallMargin : Metrics.baseMargin
  },
  PratSwitch:{
  justifyContent : 'flex-end',
  alignItems : 'flex-end',
  marginHorizontal:  Metrics.section,
  marginVertical: Metrics.baseMargin
  },

  PratButtonActIndicator: {
    marginLeft: 20,
  },

  SubjectRowImage:{
  width : Dimensions.get('window').width * 0.8,
  height : Dimensions.get('window').height * 0.2,
  resizeMode:'contain'
  },

  PratButtonBackground : {
    flex: 1,
    height: 40,
    borderRadius: 5
  },

  PratButtonText:{
    textAlign: 'center',
    color: Colors.textprimary,
    justifyContent : 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,

  },

  sectionText :{
    color: Colors.snow
  },

  CollapsedHeader: {
  ...ApplicationStyles.darkLabelContainer,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },

  CollapsedIconHeader: {
  color:'white',
  alignItems: 'flex-end'
  },

  CollapsedHeaderContent: {
    ...ApplicationStyles.darkLabel
  },

  groupContainer: {
    ...ApplicationStyles.groupContainer
  },
  sectionHeaderContainer: {
    ...ApplicationStyles.darkLabelContainer
  },
  sectionHeader: {
    ...ApplicationStyles.darkLabel
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  backgroundContainer: {
    position: 'relative',
    width: 102,
    height: 102,
    borderWidth: 1,
    borderColor: Colors.frost
  },
  backerImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    resizeMode: 'stretch'
  },
  colorContainer: {
    height: 130,
    padding: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin
  },
  colorSquare: {
    width: 100,
    height: 100
  },
  colorName: {
    width: 100,
    height: Metrics.doubleBaseMargin,
    lineHeight: Metrics.doubleBaseMargin,
    color: Colors.charcoal,
    textAlign: 'center'
  },
  fontRow: {
    padding: Metrics.smallMargin,
    marginHorizontal: Metrics.smallMargin,
    color: Colors.snow
  },



  container: {
    flex: 1,
  },

})
