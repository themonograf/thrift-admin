import { Box } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import ThemeToggle from "./Theme";

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <ThemeToggle />
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
