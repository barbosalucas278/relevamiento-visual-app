import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { guardarImagenStorage } from "../../services/StorageServices";
import { guardarFotoEnCollection } from "../../services/FirestoreServices";
import { auth } from "../../../firebase";
import { useIsFocused } from "@react-navigation/native";
import theme from "../../theme";
export default function CamaraView({ route, navigation }) {
  const [fotoTomada, setFotoTomada] = useState(false);
  const [hideCamara, setHideCamara] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [spinnerGuardado, setSpinnerGuardado] = useState(false);
  const [uriFotoSacadaPreview, setUriFotoSacadaPreview] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState("");
  const isFocused = useIsFocused();
  const camaraRef = useRef();
  const { tipoDeFoto } = route.params;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No tengo acceso para usar la camara</Text>;
  }
  const snap = async () => {
    try {
      if (camaraRef) {
        const options = { quality: 1, skipProcessing: true };
        const foto = await camaraRef.current.takePictureAsync(options);
        setHideCamara(true);
        setSpinner(true);
        const { uri } = foto;
        const manipResult = await manipulateAsync(uri, [{ resize: { width: 1024, height: 1024 } }], { format: "png" });
        setUriFotoSacadaPreview(manipResult.uri);
        setFotoTomada(true);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const resetearCamara = () => {
    setSpinnerGuardado(false);
    setSpinner(false);
    setHideCamara(false);
    setFotoTomada(false);
    setUriFotoSacadaPreview(null);
  };
  const guardarFoto = async () => {
    try {
      setSpinnerGuardado(true);
      const blob = await (await fetch(uriFotoSacadaPreview)).blob();
      const imgRefName = `relevamientoVisual/${auth.currentUser.email}/${tipoDeFoto}`;
      const { ref, docName } = await guardarImagenStorage(imgRefName, blob);
      const fotoStorage = await ref.getDownloadURL();
      const foto = {
        id: docName,
        email: auth.currentUser.email,
        fotoURL: { uri: fotoStorage },
        tipo: tipoDeFoto,
        fecha: new Date().toLocaleString(),
        votos: [],
      };
      await guardarFotoEnCollection("relevamientoVisual", docName, foto);
      resetearCamara();
    } catch (error) {
      console.log("aca" + error);
    }
  };
  return (
    <View style={styles.container}>
      {fotoTomada ? (
        <>
          <View style={styles.container}>
            <Image
              source={{ uri: uriFotoSacadaPreview }}
              style={{ width: Dimensions.get("screen").width, height: 550 }}
            ></Image>

            {spinnerGuardado ? (
              <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size={180} color={theme.colores.details} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Dimensions.get("screen").width,
                  marginBottom: 50,
                }}
              >
                <TouchableOpacity style={styles.button} onPress={() => guardarFoto()}>
                  <Text style={styles.text}> Guardar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => resetearCamara()}>
                  <Text style={styles.text}> Eliminar Foto </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          {isFocused ? (
            <View style={{ flex: 1 }}>
              <View>
                <Camera
                  pictureSize=""
                  ref={camaraRef}
                  style={[styles.camera, hideCamara && styles.hideCamera]}
                  type={type}
                  ratio="1:1"
                ></Camera>
                <View style={[styles.buttonContainer, hideCamara && styles.hideCamera]}>
                  <TouchableOpacity style={styles.button} onPress={() => snap()}>
                    <Text style={styles.text}> Sacar Foto </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {spinner && (
                <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                  <ActivityIndicator size={180} color={theme.colores.details} />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size={180} color={theme.colores.details} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  camera: {
    width: Dimensions.get("screen").width,
    height: 550,
  },
  hideCamera: {
    display: "none",
    width: 0,
    height: 0,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
