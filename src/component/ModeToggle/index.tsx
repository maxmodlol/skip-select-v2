import { IconButton, useTheme } from "@mui/material";
import LightIcon from "@mui/icons-material/LightModeRounded";
import DarkIcon from "@mui/icons-material/Brightness4Rounded";
import { useContext } from "react";
import { ColorModeContext } from "@/theme/ColorModeContext";

export default function ModeToggle() {
  const { toggle } = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <IconButton onClick={toggle} size="small" sx={{ ml: 1 }}>
      {theme.palette.mode === "light" ? <DarkIcon /> : <LightIcon />}
    </IconButton>
  );
}
