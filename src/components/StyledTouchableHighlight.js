import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import React from "react";
import theme from "../theme";
export default function StyledTouchableHighlight({
  children,
  onPress,
  color,
  btnLogin,
  btnVotar,
  style,
  ...restOfProps
}) {
  const btnStyles = [
    styles.btn,
    color == "secondary" && styles.secondary,
    color == "primary" && styles.primary,
    btnLogin && styles.btnLogin,
    btnVotar && styles.btnVotar,
    style,
  ];
  return (
    <TouchableHighlight onPress={onPress} {...restOfProps}>
      <View style={btnStyles}>
        <Text style={[btnVotar && styles.textVotar]}>{children}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogin: {
    paddingVertical: 15,
    paddingHorizontal:
      Dimensions.get("screen").width / 2 - Dimensions.get("screen").width / 3,
  },
  btnVotar: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 20,
    backgroundColor: "green",
  },
  textVotar: {
    color: "white",
  },
  secondary: {
    color: "#fefefe",
    backgroundColor: theme.colores.secondary,
  },
  primary: {
    color: "#fff",
    backgroundColor: theme.colores.detaile2,
  },
});
