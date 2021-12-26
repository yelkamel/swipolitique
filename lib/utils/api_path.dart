class APIPath {
  static String citizen(String id) => 'citizen/$id';
  static String candidate(String id) => 'info/$id';
  static String info(String id) => 'candidate/$id';

  static String allCandidate() => 'candidate/';
  static String allInfo() => 'info/';
  static String allUser() => 'citizen/';
}
