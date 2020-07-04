// @flow

import {Dimensions, Platform, PixelRatio} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  buttonShowHeight: height * 0.12,
  buttonWidth: width * 0.32,
  buttonHeight: height * 0.08,
  marginHorizontal: 10,
  marginVertical: 10,
  marginFirstPage: 20,
  RowHeight: 100,
  marginTopSetting: height * 0.03,
  section: 25,
  graphWidth: PixelRatio.get() * 1,
  baseMargin: 10,
  doubleBaseMargin: 20,
  CardsBorderWitdh: PixelRatio.get() ,
  OnePix: PixelRatio.get(),
  heightCardTinder: height * 0.5,
  marginCardBottom: height * 0.05,
  swiperWidth: width * 0.8,
  swiperHeight: height * 0.65,
  smallMargin: 5,
  cardWidth: width - 20,
  barUnitCol: 65 / 100,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  borderWidth: 2,
  cardBorderRadius: 10,
  progressWitdh: width * 0.3,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? height * 0.07 :height * 0.07 ,
  spaceNavBack : (Platform.OS === 'ios') ? height * 0.09 :height * 0.07 ,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  }
}

export default metrics
