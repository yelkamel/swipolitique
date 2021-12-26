import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:layoutools/layoutools.dart';
import 'package:swipolitique/presentation/funnel/onboarding/onboarding_screen.dart';
import 'package:swipolitique/presentation/screen/home/home_screen.dart';
import 'package:swipolitique/service/auth.dart';

class Splashscreen extends StatelessWidget {
  const Splashscreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: Auth.stream,
      builder: (BuildContext context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const LoadingCircle();
        }

        if (snapshot.hasData) return const HomeScreen();

        return const OnboardingFunnel();
      },
    );
  }
}
