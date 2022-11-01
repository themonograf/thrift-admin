import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SidebarContext } from "@/contexts/SidebarContext";

function HeaderMenu() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  return (
    <>
      <Tooltip arrow title={sidebarToggle ? "Light Mode" : "Dark Mode"}>
        <IconButton color="primary" onClick={toggleSidebar}>
          {sidebarToggle ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default HeaderMenu;
