import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import StyledText from "../StyledText";
import theme from "../../theme";
import BadgeLikes from "./BadgeLikes";
import { TouchableOpacity } from "react-native-web";
import StyledTouchableHighlight from "../StyledTouchableHighlight";

export default function FotoCard(props) {
  const { votacion } = props;
  return (
    <View key={props.id}>
      <StyledText aling="center" fontWeight="bold" style={styles.pie}>
        Se sacó el día: {props.fecha}
      </StyledText>
      <Image
        source={{ uri: props.fotoURL.uri }}
        resizeMode="cover"
        style={{ width: Dimensions.get("screen").width, height: 300 }}
      ></Image>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginLeft: 40,
        }}
      >
        <Text style={styles.pie}>Cantidad de votos</Text>
        <BadgeLikes>{props.votos}</BadgeLikes>
        {votacion && (
          <StyledTouchableHighlight color={"secondary"} btnVotar={true}>
            VOTAR!
          </StyledTouchableHighlight>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pie: {
    fontSize: theme.fontSizes.title,
  },
});
