// @flow

import React, { Component } from 'react'
import { View, Text,Image, BackAndroid,AsyncStorage,AppState,Switch } from 'react-native'
import { Images, Colors, Metrics } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './Styles/MainStyle'
import ResponsiveImage from 'react-native-responsive-image'
import MyProgressBar  from '../Components/MyProgressBar'
import PoliticQuote from './PoliticQuote'
import RoundedButton  from '../Components/RoundedButton'
import ShareButton  from '../Components/ShareButton'
import Chart from 'react-native-chart';

const data = [[
    [0, 1],
    [1, 3],
    [3, 7],
    [4, 9],
]];

class DrawerContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nbGlobalCardSwip: 0,
      progress: 0,
      humourMode: false,
    };
  }

  static defaultProps = {
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  componentDidMount() {
  }
  componentWillMount(){
    AsyncStorage.getItem("nbGlobalCardSwip").then((nbGlobalCardSwip) => {
        this.setState({
          nbGlobalCardSwip: nbGlobalCardSwip == null ? 1 :  parseInt(nbGlobalCardSwip , 10 ),
          progress: parseInt(nbGlobalCardSwip , 10 ) / PoliticQuote.TWEET_LIST.length
         });
    }).done();
  }

  componentWillUpdate (){
    AsyncStorage.getItem("nbGlobalCardSwip").then((nbGlobalCardSwip) => {
      this.setState({
        nbGlobalCardSwip: nbGlobalCardSwip == null ? 1 :  parseInt(nbGlobalCardSwip , 10 ),
        progress: parseInt(nbGlobalCardSwip , 10 ) / PoliticQuote.TWEET_LIST.length
      })
    }).done();
  }

  resetSwipCard  = () => {
    AsyncStorage.setItem("nbGlobalCardSwip", "" + 0);
    this.setState({
      nbGlobalCardSwip: 0,
    })
  }


  componentWillUnmount (){
  }

  render () {
    return (
      <View style={styles.drawerContainer}>
        <ResponsiveImage source={Images.logoBack} style={styles.logoView} initWidth="50" initHeight="50" />


        <View style={styles.drawerGlobalView}>
          <View style={styles.drawerStatsView}>



        </View>

         <View style={styles.drawerOptionView}>
           <View style={styles.switchView}>
             <Text style={styles.progressText}>
               Troll Mode
             </Text>
            <Switch
              onValueChange={(value) => this.setState({humourMode: value})}
              onTintColor={Colors.darkaccent}
              thumbTintColor={Colors.couleurDrap1}
              tintColor={Colors.couleurDrap1}
              value={this.state.humourMode} />
          </View>

           <ShareButton
             shareText= {"J\'ai swiper  " + this.state.nbGlobalCardSwip + " tweets sur SwiPolitique pour ce mois il m\'en reste  "+ PoliticQuote.TWEET_LIST.length + "."}
             shareUrl= "https://www.facebook.com/LaYouCeferie/"
             actionButton={false}/>
           <RoundedButton
             onPress={this.resetSwipCard}
             text= "Réinitialiser"
             icon= "trash-o"
             backgroundColor= {Colors.couleurDrap1}/>
         </View>
       </View>
      </View>
    )
  }

  /*

  <View style={styles.progressView}>
    <View style={styles.progressTextView}>
      <Text style={styles.progressText}>
        {this.state.nbGlobalCardSwip}
      </Text>
    </View>

    <MyProgressBar
     fillStyle={{backgroundColor: Colors.couleurDrap1,height : 10 , borderRadius: 4}}
     backgroundStyle={{backgroundColor: '#cccccc',  height : 10 , borderRadius: 4 }}
     style={{margin: 10, width: Metrics.progressWitdh}}
     easingDuration= {1000}
     progress={this.state.progress}
   />

 <View style={styles.progressTextView}>
   <Text style={styles.progressText}>
     {PoliticQuote.TWEET_LIST.length}
   </Text>
 </View>

  </View>




  <ShareButton
    shareText= {"J\'ai swiper  " + this.state.nbGlobalCardSwip + " tweets sur SwiPolitique pour ce mois il m\'en reste  "+ PoliticQuote.TWEET_LIST.length + "."}
    shareUrl= "https://www.facebook.com/LaYouCeferie/"
    actionButton={false}/>
  <RoundedButton
    onPress={this.resetSwipCard}
    text= "Réinitialiser"
    icon= "trash-o"
    backgroundColor= {Colors.couleurDrap1}/>



  <View style={styles.signatureView}>
    <Text style={styles.signatureText}>
        Fait par amour de la politique.
    </Text>
  </View>
  */

}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
