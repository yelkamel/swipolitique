import 'package:flutter/material.dart';

class MainButton extends StatelessWidget {
  final void Function()? onPress;
  final String text;
  const MainButton({
    Key? key,
    required this.onPress,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return RawMaterialButton(
      onPressed: onPress,
      child: Text(
        text,
        style: Theme.of(context).textTheme.button,
      ),
    );
  }
}
