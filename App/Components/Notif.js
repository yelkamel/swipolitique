import React from 'react'
import { TouchableOpacity, Text,View,TouchableHighlight,AsyncStorage } from 'react-native'
import { Fonts, Colors, Metrics } from '../Themes/'
import PushNotification from 'react-native-push-notification'
import PoliticQuote from '../Containers/PoliticQuote'
import _ from 'lodash'
import store from 'react-native-simple-store'

export default {

  setGlobalNotification(){
    AsyncStorage.getItem("hasNotif").then( (hasNotif) => {

        PushNotification.cancelAllLocalNotifications()

        if (hasNotif == '1' ){
          var randomNb = _.random(0, PoliticQuote.NOTIF_LIST.length - 1);
          var notifMessage = PoliticQuote.NOTIF_LIST[randomNb]
          var heure = 60 * 1000 * 60
          var day = 24 * heure

          var randomTime = (randomNb * heure) + day

          PushNotification.localNotificationSchedule({
           /* ANDROID */
           ticker: "Swip Politique",
           color: Colors.defaultprimary,
           /* IOS */
           alertAction: <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
           }}/>,
           category: null,
           message: notifMessage, // (required)
           playSound: true, // (optional) default: true
           soundName: "default",
           date: new Date(Date.now() + randomTime) // in 60 secs
       })
      }
    }).done()
   }
}
