import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

import 'step/login.dart';

class OnboardingFunnel extends StatelessWidget {
  const OnboardingFunnel({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LoginStep();
  }
}
