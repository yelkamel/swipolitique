import 'package:flutter/material.dart';

import 'color.dart';

final ThemeData darkTheme = ThemeData(
  backgroundColor: kColorblack,
  scaffoldBackgroundColor: kColorblack,
  dividerColor: kColorgrey,
  dialogBackgroundColor: kColorwhite,
  highlightColor: Colors.transparent,
  splashColor: Colors.transparent,
  inputDecorationTheme: const InputDecorationTheme(
    labelStyle: TextStyle(
      color: kColorwhite,
      fontWeight: FontWeight.w300,
    ),
    border: InputBorder.none,
    focusedBorder: InputBorder.none,
  ),
  primaryIconTheme: const IconThemeData(color: kColorwhite),
  textTheme: const TextTheme(
    button: TextStyle(
      fontSize: 25,
      color: kColorwhite,
      fontWeight: FontWeight.w700,
      letterSpacing: 1.65,
    ),
    bodyText2: TextStyle(
      fontSize: 12,
      color: kColorwhite,
    ),
    bodyText1: TextStyle(
      fontSize: 14,
      color: kColorwhite,
    ),
    subtitle2: TextStyle(
      fontSize: 16,
      color: kColorwhite,
    ),
    subtitle1: TextStyle(
      fontSize: 18,
      color: kColorwhite,
    ),
    headline6: TextStyle(
      fontSize: 22,
      color: kColorwhite,
    ),
    headline5: TextStyle(
      fontSize: 24,
      color: kColorwhite,
    ),
    headline4: TextStyle(
      fontSize: 27,
      color: kColorwhite,
    ),
    headline3: TextStyle(
      fontSize: 38,
      color: kColorwhite,
    ),
    headline1: TextStyle(
      fontSize: 43,
      color: kColorwhite,
      fontWeight: FontWeight.normal,
    ),
  ),
  iconTheme: const IconThemeData(color: kColorwhite),
  unselectedWidgetColor: kColorwhite,
  fontFamily: 'AirbnbCereal',
  cardTheme: CardTheme(
    margin: const EdgeInsets.all(20),
    elevation: 0,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
  ),
  appBarTheme: const AppBarTheme(
    elevation: 0,
    color: Colors.transparent,
    iconTheme: IconThemeData(color: kColorwhite),
  ),
);
