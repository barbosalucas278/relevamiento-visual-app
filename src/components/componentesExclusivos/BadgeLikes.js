import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import theme from "../../theme";
export default function BadgeLikes(props) {
  const { children } = props;
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faHeart} color={"red"} size={60} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  text: {
    fontSize: theme.fontSizes.subHeading,
    position: "absolute",
    top: 20,
    left: 32,
    color: "white",
  },
});
