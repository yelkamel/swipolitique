import 'package:layoutools/layoutools.dart';
import 'package:layoutools/model/swipolitique/citizen.dart';
import 'package:swipolitique/utils/api_path.dart';

class Database {
  static Future<void> setCitizen(Citizen citizen) async =>
      Firestore.instance.setData(
        path: APIPath.citizen(citizen.id),
        data: citizen.toJson(),
      );

  static Future<void> updateCitizen(
    String citizenId,
    Map<String, dynamic> data,
  ) async =>
      Firestore.instance.updateData(
        path: APIPath.citizen(citizenId),
        data: data,
      );
}
