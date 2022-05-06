import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import StyledText from "../StyledText";
import theme from "../../theme";
import BadgeLikes from "./BadgeLikes";
import { TouchableOpacity } from "react-native-web";
import StyledTouchableHighlight from "../StyledTouchableHighlight";
import { updateVotos } from "../../services/FirestoreServices";
import { auth } from "../../../firebase";

export default function FotoCard(props) {
  const onVotarFoto = () => {
    updateVotos("relevamientoVisual", props.id, auth.currentUser.email, props.votos);
  };
  const mostrarBotonVotar = () => {
    console.log(props.votos.includes(props.email));
    console.log(props.email);
    return votacion && !props.votos.includes(auth.currentUser.email);
  };
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
        <BadgeLikes>{props.votos.length}</BadgeLikes>
        {mostrarBotonVotar() && (
          <StyledTouchableHighlight color={"secondary"} btnVotar={true} onPress={() => onVotarFoto()}>
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
