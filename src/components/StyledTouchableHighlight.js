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
  style,
  ...restOfProps
}) {
  const btnStyles = [
    styles.btn,
    color == "secondary" && styles.secondary,
    color == "primary" && styles.primary,
    btnLogin && styles.btnLogin,
    style,
  ];
  return (
    <TouchableHighlight onPress={onPress} {...restOfProps}>
      <View style={btnStyles}>
        <Text>{children}</Text>
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
  secondary: {
    color: "#fefefe",
    backgroundColor: theme.colores.secondary,
  },
  primary: {
    color: "#fff",
    backgroundColor: theme.colores.detaile2,
  },
});