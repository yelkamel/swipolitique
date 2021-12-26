import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

class Auth {
  static Future<User?> signInAnonymously() async {
    try {
      final UserCredential res =
          await FirebaseAuth.instance.signInAnonymously();
      return res.user;
    } catch (e) {
      Get.snackbar("Oups", "Une erreur est apparu à l'identification anonyme");
      return null;
    }
  }

  static Future<bool> signOut() async {
    try {
      await FirebaseAuth.instance.signOut();
      Get.toNamed('/');
      return true;
    } catch (e) {
      return false;
    }
  }

  static Future<bool> isLoggedIn() async {
    final user = await FirebaseAuth.instance.userChanges().first;
    if (user == null) {
      return false;
    }
    return true;
  }

  static String? get uid => FirebaseAuth.instance.currentUser?.uid;
  static User? get currentUser => FirebaseAuth.instance.currentUser;

  static Stream<User?> get stream => FirebaseAuth.instance.authStateChanges();
}
