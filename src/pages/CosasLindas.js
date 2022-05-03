import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import ListaPublica from "./tabsCosasLindas/ListaPublica";
import ListaPropia from "./tabsCosasLindas/ListaPropia";
import theme from "../theme";
import CamaraView from "./tabsCosasLindas/CamaraView";
const Tab = createBottomTabNavigator();
export default function CosasLindas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Lista Publica":
              iconName = "list";
              break;
            case "Sacar Foto":
              iconName = "camera";
              break;
            case "Lista Propia":
              iconName = "user";
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colores.secondary,
        tabBarInactiveTintColor: theme.colores.detaile2,
      })}
    >
      <Tab.Screen name="Lista Publica" component={ListaPublica} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Sacar Foto"
        component={CamaraView}
      />
      <Tab.Screen name="Lista Propia" component={ListaPropia} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
