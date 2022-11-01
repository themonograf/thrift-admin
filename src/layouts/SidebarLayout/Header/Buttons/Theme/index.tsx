import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import { IconButton, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "styles/theme/ThemeProviderWrapper";

function Theme() {
  const { themeName, setThemeName } = useContext(ThemeContext);
  return (
    <>
      <Tooltip
        arrow
        title={themeName === "AnakSetangTheme" ? "Light Mode" : "Dark Mode"}
      >
        <IconButton color="primary" onClick={setThemeName}>
          {themeName === "AnakSetangTheme" ? (
            <LightModeTwoToneIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Theme;
