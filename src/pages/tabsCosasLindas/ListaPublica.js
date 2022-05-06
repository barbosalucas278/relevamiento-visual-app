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
import { getAllFotos } from "../../services/FirestoreServices";
import theme from "../../theme";
import FotoCard from "../../components/componentesExclusivos/FotoCard";
export default function ListaPublica({ route }) {
  const { tipoDeFoto } = route.params;
  const [listaDeFotos, setListaDeFotos] = useState([]);
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setSpinner(true);
    getAllFotos(
      "relevamientoVisual",
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
          renderItem={({ item: foto }) => (
            <FotoCard votacion={true} {...foto}></FotoCard>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
