import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import AuthContext from "../../context/firebaseContext/AuthContext";

export default function CamaraView() {
  const { guardarFoto } = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const handlePick = () => {};
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
    return <Text>No access to camera</Text>;
  }
  const snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      guardarFoto(photo);
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.camera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => snap()}>
            <Text style={styles.text}> Sacar Foto </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    flex: 0.3,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
