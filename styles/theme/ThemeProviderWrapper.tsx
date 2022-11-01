import React, {
  FC,
  useState,
  createContext,
  useEffect,
  ReactNode,
} from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";

type ThemeContext = {
  themeName: any;
  setThemeName: () => void;
};

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

interface ThemeProviderWrapper {
  children: ReactNode;
}

const ThemeProviderWrapper: FC<ThemeProviderWrapper> = (props) => {
  const [themeName, _setThemeName] = useState("AnakSetangTheme");

  useEffect(() => {
    const curThemeName = localStorage.getItem("appTheme") || "AnakSetangTheme";
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);

  const setThemeName = () => {
    const newTheme =
      themeName === "AnakSetangTheme" ? "AnakMalekatTheme" : "AnakSetangTheme";
    window.localStorage.setItem("appTheme", newTheme);
    _setThemeName(newTheme);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ themeName, setThemeName }}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
