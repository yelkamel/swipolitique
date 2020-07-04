// @flow

import React, { Component } from 'react'
import { View,AsyncStorage,Alert,Image, Text } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import AppIntro from 'react-native-app-intro';
import { Images, Colors } from '../Themes'
import simpleStore from 'react-native-simple-store'

//import Loading from '../Components/Loading'
// Styles
import styles from './Styles/MainStyle'
import PresentationScreen from './PresentationScreen'


const pageArray = [

  {
  title: "La vie est un jeu",
  description: "Et sans vous en rendre compte, vous y jouez tous les jours.",
  backgroundColor: Colors.highligtprimary,
  fontColor: '#fff',
  level: 5,
},
{
  title: "Pour gagner",
  description: "Il existe des petites astuces.",
  backgroundColor: Colors.lightprimary,
  fontColor: '#fff',
  level: 10,
},
{
  title: "Je vais vous les expliquer",
  description: "Pour que vous puissiez les utiliser.",
  img: Images.MascotteImg,
  imgStyle: {
    height: 100,
    width: 100,
  },
  backgroundColor: Colors.defaultprimary,
  fontColor: '#fff',
  level: 20,
},
{
  title: "Une fois l'astuce comprise,",
  description: "Utilisez là autour de vous.",
  img: Images.ListSubImg,
  imgStyle: {
    height: 140,
    width: 210,
  },
  backgroundColor: Colors.darkprimary,
  fontColor: '#fff',
  level: 20,
},
{
  title: "Et dites-le moi,",
  description: "Pour avoir accès aux astuces plus avancées...",
  img: Images.PratButtonImg,
  imgStyle: {
    height: 80,
    width: 340,
  },
  backgroundColor: Colors.highdarkprimary,
  fontColor: '#fff',
  level: 20,
},
]

class RootContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      IsFirstCo: 1,
      isloading: true,
  }
}

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }

  /*  setTimeout(()=>{
        SplashScreen.hide();
    }, 1000);*/
  }
  onSkipBtnHandle = (index) => {

  }

  doneBtnHandle = () => {
  AsyncStorage.setItem("hasNotif", '1')
  AsyncStorage.setItem("IsFirstCo", '0')
  this.setState({"IsFirstCo": '0'})

  }
  nextBtnHandle = (index) => {

  }
  onSlideChangeHandle = (index, total) => {

  }

  loadData(){
  AsyncStorage.getItem("IsFirstCo").then((value) => {
    this.setState({
      IsFirstCo: value == null ? '1' : value,
  });
  }).done();
  }

  componentWillMount(){

    this.loadData()
  }

  initialSaveData(){
    /*
    simpleStore.save('dataProfil' ,
    {
      level: 0,
      exp: 0,
      hasNotif: '1',
      hasUnlock: '0'
    })
    */
  }

  render () {

    if (this.state.isloading == true ){
      return (<Loading/>)
    }
    if(this.state.IsFirstCo == '1'){
      this.initialSaveData()
      return (
        <AppIntro
          onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          onSkipBtnClick={this.onSkipBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
          doneBtnLabel="OK 👌"
          rightTextColor= {Colors.accent}
          activeDotColor={Colors.accent}

          showSkipButton={false}
          pageArray={pageArray}
        />
      )
    }

    return (
    <Provider
      store={store}>
      <RootContainer/>
    </Provider>
    )

  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
