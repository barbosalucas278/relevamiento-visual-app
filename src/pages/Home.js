import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
} from "react-native";
import { React, useContext } from "react";
import { logout } from "../../firebase";
import theme from "../theme";
import StyledTouchableHighlight from "../components/StyledTouchableHighlight";
import AuthContext from "../context/firebaseContext/AuthContext";

export default function Home({ navigation }) {
  const { logOut, setIsLogin } = useContext(AuthContext);
  const handlelogout = () => {
    logOut().then(() => {
      setIsLogin(false);
      navigation.navigate("Login");
    });
  };
  return (
    <View>
      <StyledTouchableHighlight
        onPress={() => navigation.navigate("CosasLindas")}
        color="secondary"
        style={styles.btn}
      >
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/lindas-background.jpg")}
        >
          <Text style={styles.titulo}>Cosas Lindas</Text>
        </ImageBackground>
      </StyledTouchableHighlight>
      <StyledTouchableHighlight
        onPress={() => navigation.navigate("CosasFeas")}
        color="primary"
        style={styles.btn}
      >
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require("../../assets/feas-background.jpg")}
        >
          <Text style={styles.titulo}>Cosas Feas</Text>
        </ImageBackground>
      </StyledTouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 2.1,
  },
  titulo: {
    backgroundColor: theme.colores.primary,
    fontSize: theme.fontSizes.heading,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  image: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 2.1,
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
