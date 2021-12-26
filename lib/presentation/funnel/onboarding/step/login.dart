import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:layoutools/model/swipolitique/citizen.dart';
import 'package:swipolitique/presentation/common/main_button.dart';
import 'package:swipolitique/service/auth.dart';
import 'package:swipolitique/service/database.dart';

class LoginStep extends StatelessWidget {
  const LoginStep({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(15.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const SizedBox(width: 10),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.all(13.0),
                        child: Column(
                          children: [
                            Text(
                              "Bienvenu, citoyen",
                              textAlign: TextAlign.center,
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyText1!
                                  .copyWith(
                                    fontWeight: FontWeight.w400,
                                    fontSize: 22,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: MainButton(
                    text: "Valider",
                    onPress: () async {
                      final res = await Auth.signInAnonymously();

                      if (res != null) {
                        final citizen = Citizen(
                          id: res.uid,
                          createDate: DateTime.now(),
                        );
                        Database.setCitizen(citizen);
                      }
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
