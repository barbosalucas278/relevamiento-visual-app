import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getAllFotosByEmail } from "../../services/FirestoreServices";
import theme from "../../theme";
import { auth } from "../../../firebase";
import FotoCard from "../../components/componentesExclusivos/FotoCard";

export default function ListaPropia({ route }) {
  const [listaDeFotos, setListaDeFotos] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const { tipoDeFoto } = route.params;
  useEffect(() => {
    setSpinner(true);
    getAllFotosByEmail(
      "relevamientoVisual",
      auth.currentUser.email,
      tipoDeFoto,
      (data) => {
        const respuesta = data.docs.map((doc) => doc.data());
        setListaDeFotos(respuesta);
        setSpinner(false);
      },
      (error) => console.log(error)
    );
  }, []);
  return (
    <View>
      {spinner ? (
        <View>
          <ActivityIndicator size={180} color={theme.colores.details} />
        </View>
      ) : (
        <FlatList
          data={listaDeFotos}
          ItemSeparatorComponent={() => <Text> </Text>}
          renderItem={({ item: foto }) => <FotoCard {...foto}></FotoCard>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
