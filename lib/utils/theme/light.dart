import 'package:flutter/material.dart';

import 'color.dart';

final ThemeData lightTheme = ThemeData(
  backgroundColor: kColorwhite,
  scaffoldBackgroundColor: kColorwhite,
  dividerColor: kColorgrey,
  dialogBackgroundColor: kColorwhite,
  highlightColor: Colors.transparent,
  splashColor: Colors.transparent,
  inputDecorationTheme: const InputDecorationTheme(
    labelStyle: TextStyle(
      color: kColorblack,
      fontWeight: FontWeight.w300,
    ),
    border: InputBorder.none,
    focusedBorder: InputBorder.none,
  ),
  primaryIconTheme: const IconThemeData(color: kColorwhite),
  textTheme: const TextTheme(
    button: TextStyle(
      fontSize: 25,
      color: kColorblack,
      fontWeight: FontWeight.w700,
      letterSpacing: 1.65,
    ),
    bodyText2: TextStyle(
      fontSize: 12,
      color: kColorblack,
    ),
    bodyText1: TextStyle(
      fontSize: 14,
      color: kColorblack,
    ),
    subtitle2: TextStyle(
      fontSize: 16,
      color: kColorblack,
    ),
    subtitle1: TextStyle(
      fontSize: 18,
      color: kColorblack,
    ),
    headline6: TextStyle(
      fontSize: 22,
      color: kColorblack,
    ),
    headline5: TextStyle(
      fontSize: 24,
      color: kColorblack,
    ),
    headline4: TextStyle(
      fontSize: 27,
      color: kColorblack,
    ),
    headline3: TextStyle(
      fontSize: 38,
      color: kColorblack,
    ),
    headline1: TextStyle(
      fontSize: 43,
      color: kColorblack,
      fontWeight: FontWeight.normal,
    ),
  ),
  iconTheme: const IconThemeData(color: kColorblack),
  unselectedWidgetColor: kColorblack,
  fontFamily: 'AirbnbCereal',
  cardTheme: CardTheme(
    margin: const EdgeInsets.all(20),
    elevation: 0,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
  ),
  appBarTheme: const AppBarTheme(
    elevation: 0,
    color: Colors.transparent,
    iconTheme: IconThemeData(color: kColorblack),
  ),
);
