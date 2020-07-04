import { Colors, Images,Metrics, Fonts } from '../Themes/'
import PoliticQuote from './PoliticQuote'
import _ from 'lodash'

export function choicePic(by) {

    switch (by) {
    case "Jean-Luc Mélenchon":
        return Images.Melenchon
    case "Benoit Hamon":
        return Images.Hamon
    case "Emmanuel Macron":
        return Images.Macron
    case "Marine Le Pen":
        return Images.Marine
    case "Francois Fillon":
        return Images.Fillon
    case "Nicolas Dupont-Aignan":
         return Images.Aignan
   case "Jacques Cheminade":
       return Images.Cheminade
   case "François Asselineau":
       return Images.Asselineau
   case "Jean Lassalle":
     return Images.Lassalle
   case "Philippe Poutou":
       return Images.Poutou
   case "Nathalie Arthaud":
       return Images.Arthaud
    default:
      return Images.logoBack
    }
}

/*
export function maxCardWithFilter(filter){
  var nbmax = PoliticQuote.TWEET_LIST.length
  var index = -1
  filter.map((cell,i) => {
    index =_.findIndex(PoliticQuote.LIST_TYPE.name, cell)
    if (index > -1){
      nbmax = nbmax +  PoliticQuote.LIST_TYPE[index].nbmax

      console.log("NBMAX : "+nbmax);
    }
  })

  return nbmax
}*/

export function convertToSimpleArray(arrayType){
  var arrayTmp = []
  arrayType.filter((data)=>{
    if (data.checked == true)
    {
      arrayTmp = arrayTmp.concat(data.name)
    }
  })

  return arrayTmp
}


export function choicePicStats (by) {
  switch (by) {
    case "Jean-Luc Mélenchon":
        return Images.WMelenchon
    case "Benoit Hamon":
        return Images.WHamon
    case "Emmanuel Macron":
        return Images.WMacron
    case "Marine Le Pen":
        return Images.WMarine
    case "Francois Fillon":
        return Images.WFillon
    case "Nicolas Dupont-Aignan":
         return Images.WAignan


    case "JCheminade":
        return Images.WCheminade
    case "n_arthaud":
        return Images.WArthaud
    case "PhilippePoutou":
        return Images.WPoutou
    default:
      return Images.logoBack
  }

}

export function choicePicBan (by) {
  switch (by) {
    case "Jean-Luc Mélenchon":
        return Images.Melenchon_ban
    case "Benoit Hamon":
        return Images.Hamon_ban
    case "Emmanuel Macron":
        return Images.Macron_ban
    case "Marine Le Pen":
        return Images.Marine_ban
    case "Francois Fillon":
        return Images.Fillon_ban
    case "Nicolas Dupont-Aignan":
        return Images.Aignan_ban
    case "Jacques Cheminade":
        return Images.Cheminade_ban
    case "François Asselineau":
        return Images.Asselineau_ban
    case "Jean Lassalle":
      return Images.Lassalle_ban
    case "Philippe Poutou":
        return Images.Poutou_ban
    case "Nathalie Arthaud":
        return Images.Arthaud_ban
    default:
      return Images.logoBack
  }
}

export function choiceSlogan (by) {
  switch (by) {
    case "Jean-Luc Mélenchon":
        return "La France insoumise"
    case "Benoit Hamon":
        return "Faire battre le coeur des Français"
    case "Emmanuel Macron":
        return "Libérer la France, protéger les Français"
    case "Marine Le Pen":
        return  "Au nom du Peuple"
    case "Francois Fillon":
        return "Une volonté pour la France"
    case "Nicolas Dupont-Aignan":
        return "Debout la France !"
    case "Jacques Cheminade":
        return "Libérons-nous de l'occupation financière"
    case "François Asselineau":
        return "Redonner la parole aux gens"
    case "Jean Lassalle":
      return "Le moment est venu de se rassembler"
    case "Philippe Poutou":
        return "Nos vies, pas leurs profits"
    case "Nathalie Arthaud":
        return "Faire entendre les travailleurs"

    default:
      return "YouYou PRésident"
  }
}
