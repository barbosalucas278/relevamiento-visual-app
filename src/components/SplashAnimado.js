import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { React, useState, useEffect } from "react";

export default function SplashAnimado() {
  const [showSpinner, setShowSpinenr] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinenr(true);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
        }}
      >
        <ImageBackground
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
          }}
          source={require("../../assets/splash.png")}
          resizeMode="cover"
        ></ImageBackground>
      </View>
      {showSpinner && (
        <View style={{ position: "absolute" }}>
          <Image
            resizeMode="contain"
            source={require("../../assets/spinner.gif")}
          ></Image>
        </View>
      )}
      <View style={{ position: "relative" }}>
        <Image
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
          source={require("../../assets/icono.png")}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
