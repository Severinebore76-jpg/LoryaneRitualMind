// index.js — registration béton
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import App from "./App";

// Double enregistrement : Expo + RN (redondant mais inoffensif et robuste)
registerRootComponent(App);
AppRegistry.registerComponent("main", () => App);
