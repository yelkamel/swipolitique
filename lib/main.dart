import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'utils/theme/dark.dart';
import 'utils/theme/light.dart';
import 'presentation/screen/splashcreen.dart';

const isDebug = !kReleaseMode;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Swipolique',
      debugShowCheckedModeBanner: false,
      theme: lightTheme,
      themeMode: isDebug ? ThemeMode.dark : ThemeMode.system,
      darkTheme: darkTheme,
      initialRoute: "/",
      getPages: [
        GetPage(
          name: '/',
          page: () => const Splashscreen(),
          transition: Transition.fadeIn,
        ),
      ],
    );
  }
}
