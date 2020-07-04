import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Clipboard,
  ListView,
  Platform,
  AsyncStorage,
  ScrollView,
  Switch,
} from 'react-native';
import { Colors, Metrics, Fonts } from '../Themes/'
import StatsButton from '../Components/StatsButton'
import ShareButton from '../Components/ShareButton'
import RoundedButton from '../Components/RoundedButton'
import PoliticQuote from './PoliticQuote'
import store from 'react-native-simple-store';
import Pie from '../Components/MyPie'
import AreaSpline from '../Components/charts/AreaSpline';
import _ from 'lodash'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {choicePic, convertToSimpleArray} from '../Containers/FunUtils'
import GridView from 'react-native-gridview';
import ResponsiveImage from 'react-native-responsive-image'

const itemsPerRow = 4;

const height = 200;
const width = Metrics.screenWidth - 90;

const COLORS = [ Colors.darkaccent, Colors.like, Colors.notlike   ]
const SQUARE_DIMENSIONS = Metrics.screenWidth * 0.13


export default class Setting extends PureComponent {
  static propTypes = {

}
  constructor(props) {
    super(props);

    this.state = {
      isLoading: 0,
      filterCan:[
        {
          "name": "Jean-Luc Mélenchon",
          "checked" :false
        },
        {
          "name": "Marine Le Pen",
          "checked" :true
        },
      {
        "name": "Nathalie Arthaud",
        "checked" :false
      },
      {
        "name": "Nicolas Dupont-Aignan",
        "checked" :false
      },
      {
        "name": "Philippe Poutou",
        "checked" :false
      },
      {
        "name": "François Asselineau",
        "checked" :false
      },
      {
        "name": "Jacques Cheminade",
        "checked" :false
      },
      {
        "name": "Jean Lassalle",
        "checked" :false
      },
      {
        "name": "Francois Fillon",
        "checked" :false
      },
      {
        "name": "Benoit Hamon",
        "checked" :false
      },
      {
        "name": "Emmanuel Macron",
        "checked" :true
      }
    ],
      filterType: [
      {
        "name": "Économie et développement durable",
        "checked" :false
      },
      {
        "name": "Société",
        "checked" :true
      },
      {
        "name": "Institutions",
        "checked" :false
      },
      {
        "name": "Politique économique et emploi",
        "checked" :false
      },
      {
        "name": "Diplomatie et défense",
        "checked" :false
      },
      {
        "name": "Immigration et laïcité",
        "checked" :true
      },
      {
        "name": "Culture et communication",
        "checked" :true
      },
      {
        "name": "Sécurité et justice",
        "checked" :false
      },
      {
        "name": "Protection sociale",
        "checked" :false
      },
      {
        "name": "Europe",
        "checked" :false
      },
      {
        "name": "Éducation, recherche et jeunesse",
        "checked" :true
      }
      ]
    }

  }
  componentDidMount(){

  }

  componentWillMount(){
   store.get('filterType').then( (filterType) => {
      this.setState({
        filterType: (filterType == null ) ? this.state.filterType : filterType,
        isLoading: this.state.isLoading + 1
      })
    }).done()

    store.get('filterCan').then( (filterCan) => {
       this.setState({
         filterCan: (filterCan == null ) ? this.state.filterCan : filterCan,
         isLoading: this.state.isLoading + 1
       })
     }).done()
  }

  unCheck (data){
    data.checked = !data.checked;
    store.save('filterType',this.state.filterType)
  }

  renderCheckSquare(isCheck){
    return (
      <View style={{
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Icon style={styles.checkStyle} name={(isCheck==true) ? "checkbox-marked" :"checkbox-blank-outline"}/>
      </View>
    )
  }

  unCheckCandidat  (data, i) {
    data.checked = !data.checked;
    store.save('filterCan',this.state.filterCan)

    this.forceUpdate()
  }

  renderCandidatR1(){
    return this.state.filterCan.map((data,i) =>{
      if (i <= 5)
        return(
          <TouchableHighlight
            key={i}
            onPress={() => this.unCheckCandidat(data, i)}>
            <View style={styles.boxView}>
              <ResponsiveImage
                style={{height:SQUARE_DIMENSIONS,
                  width:SQUARE_DIMENSIONS,
                  borderRadius: 10,
                  opacity: data.checked ? 1 : 0.4,
                }}
                source={choicePic(data.name)}
                initWidth={SQUARE_DIMENSIONS}
                initHeight={SQUARE_DIMENSIONS} />

             </View>
          </TouchableHighlight>
        )
    })
  }

  renderCandidatR2(){
    return this.state.filterCan.map((data,i) =>{
      if (i > 5)
        return(
          <TouchableHighlight
            key={i}
            onPress={() => this.unCheckCandidat(data, i)}>
            <View style={styles.boxView}>
             <ResponsiveImage
               style={{
                 height:SQUARE_DIMENSIONS,
                 opacity: data.checked ? 1 : 0.4,
                 borderRadius: 10,
                 width:SQUARE_DIMENSIONS}}
               source={choicePic(data.name)}
               initWidth={SQUARE_DIMENSIONS}
               initHeight={SQUARE_DIMENSIONS} />
             </View>

          </TouchableHighlight>
        )
    })
  }

  renderType(){
      return this.state.filterType.map((data,i) =>{
          return(
            <View key={i} >
              <CheckBox
                  style={{width: Metrics.screenWidth * 0.8, marginBottom: 5}}
                  onClick={()=>this.unCheck(data)}
                  rightTextStyle={styles.typeText}
                  rightText={data.name}
                  isChecked={data.checked}
                  checkedImage={this.renderCheckSquare(true)}
                  unCheckedImage={this.renderCheckSquare(false)}
              />
            </View>
          )
      })
  }


  getArrayFilterCan = () => {
    return this.state.filterCan
  }

  getArrayFilterType = () => {
    return this.state.filterType
  }



  render() {
    if (this.state.isLoading < 2)
    return (<View></View>)

    return (
        <View style={styles.containerFilterGlobal} >

          <Text style={styles.chartTitle}>Selectionnez vos candidats</Text>
            <View style={styles.rowView}>
              {this.renderCandidatR1()}
            </View>
            <View style={styles.rowView}>
              {this.renderCandidatR2()}
            </View>
          <Text style={styles.chartTitle}>Catégorie de Propositions</Text>
            {this.renderType()}
       </View>
    );
  }
}

const styles = StyleSheet.create({
  rowView: {
    flex:1,
    flexDirection: 'row',

  },
  boxView: {
    height:SQUARE_DIMENSIONS,
    width:SQUARE_DIMENSIONS,
    borderRadius: Platform.OS === 'ios' ? 10 : 0,
    backgroundColor: Colors.darkaccent,
    borderWidth:1,
    margin:2,
    borderColor:Colors.darkaccent,
  },
  containerFilterGlobal:
  {
    alignItems: 'center',
    flex:1,
    width: Metrics.screenWidth - 40,
    backgroundColor: Colors.snow,
    borderColor: Colors.borderCard,
    marginTop:  Metrics.marginTopSetting,
    marginBottom:Metrics.baseMargin,
    borderWidth: Metrics.CardsBorderWitdh,
    borderRadius: Metrics.cardBorderRadius,
  },
  chartTitle :
  {
    margin: 10,
    textAlign: 'left',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    color: Colors.darkaccent,
    fontWeight:'bold',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: Colors.darkaccent,
  },
  checkStyle:{
    color: Colors.highdarkaccent,
    fontSize: 25
  },
  ImagesView:{
   width: SQUARE_DIMENSIONS,
   height: SQUARE_DIMENSIONS
  },
  typeText :
  {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
    color: Colors.darkaccent,
  }

})
