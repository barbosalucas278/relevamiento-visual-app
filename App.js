import { StyleSheet, LogBox } from "react-native";
import { React } from "react";
import Main from "./src/components/Main";
import AnimatedSplash from "react-native-animated-splash-screen";
import SplashAnimado from "./src/components/SplashAnimado";
import useSplashIsLoaded from "./src/hooks/useSplashIsLoaded";
import AuthProvider from "./src/context/firebaseContext/AuthProvider";
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const { isLoaded } = useSplashIsLoaded();
  return (
    <AuthProvider>
      <AnimatedSplash
        translucent={true}
        isLoaded={isLoaded}
        backgroundColor="#ffffff"
        customComponent={<SplashAnimado />}
      >
        <Main></Main>
      </AnimatedSplash>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
