import React, { createContext, useContext } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/src/constants/colors";

export function ThemeProvider({ children }) {
  const theme = extendTheme({
    colors: colors,
    config: {
      initialColorMode: "light",
    },
  });

  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        return "light";
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem("@color-mode", value);
      } catch (e) {}
    },
  };

  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </NativeBaseProvider>
  );
}
